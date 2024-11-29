import { useForm } from 'react-hook-form';
import { formSchema } from './utils/form.utils.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast.ts';
import { httpClient } from '@/lib';
import { useSetRecoilState } from 'recoil';
import { currentUserStore } from '@/stores/User.store.ts';
import { getUserByAccessToken, setCookie } from '@/utils';
import corumLogo from '@/assets/corum_logo.png';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetRecoilState(currentUserStore);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.post<{ access_token: string }>(
        'auth/login',
        values,
      );

      setCookie('access_token', data.access_token);
      const user = await getUserByAccessToken();
      setUser(user);
      toast({
        description: 'User successfully logged in !',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        description: 'An error occurred please try again',
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="flex items-center justify-center">
        <img src={corumLogo} alt="Corum logo" className="w-1/2" />
      </div>
      <div className="bg-primary flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 shadow border border-primary rounded p-4 w-1/2 hover:shadow-md bg-secondary transition"
          >
            <h1 className="font-medium">Login</h1>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthPage;
