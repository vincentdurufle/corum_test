import { User } from '@/types';
import { useForm } from 'react-hook-form';
import { date, object, string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '@/lib';
import { cn } from '@/lib/utils.ts';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast.ts';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

type UserFormProps = {
  user?: User;
};

const userFormSchema = object({
  email: string().email(),
  firstName: string().min(3).max(255),
  lastName: string().min(3).max(255),
  birthdate: date().max(new Date()),
  password: string().min(6).max(255),
});

const UserForm = ({ user }: UserFormProps) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(
      user ? userFormSchema.partial({ password: true }) : userFormSchema,
    ),
    defaultValues: {
      email: user?.email ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      birthdate: user?.birthdate ? new Date(user.birthdate) : new Date(),
      password: undefined,
    },
  });

  const formMutation = useMutation({
    mutationFn: (values: z.infer<typeof userFormSchema>) => {
      if (user) {
        return httpClient.patch<User>(`/users/${user.id}`, values);
      }

      return httpClient.post<User>('/users', values);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: `User ${user ? 'updated' : 'created'} successfully`,
      });
      navigate('/');
    },
    onError: (error) =>
      toast({
        title: 'Error',
        description: isAxiosError(error)
          ? error.response?.data?.message
          : error.message,
      }),
  });

  const onSubmit = (values: z.infer<typeof userFormSchema>) =>
    formMutation.mutate(values);

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 shadow border-2 border-primary rounded p-14 hover:shadow-md transition w-1/3"
        >
          <h1 className="font-medium">
            {user ? 'Edit user' : 'Create new user'}
          </h1>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      captionLayout="dropdown-buttons"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter a password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={formMutation.isPending} type="submit">
            {formMutation.isPending && <Loader2 className="animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
