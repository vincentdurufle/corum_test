import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/lib';
import { Loader2 } from 'lucide-react';
import { User } from '@/types';
import { Link } from 'react-router';

const UsersList = () => {
  const { data: users, isPending } = useQuery({
    queryKey: ['userList'],
    queryFn: () => {
      return httpClient.get<User[]>('/users');
    },
    select: (response) => {
      return response.data.map((user) => ({
        ...user,
        birthdate: new Date(user.birthdate).toLocaleDateString(),
      }));
    },
  });

  return (
    <div className="flex justify-center items-center flex-col p-4">
      <div className="w-2/3 flex justify-end">
        <Button size="lg" asChild>
          <Link to="/users/new">New user</Link>
        </Button>
      </div>
      <div className="w-2/3 p-4 m-4 border shadow border-secondary rounded relative">
        {isPending && (
          <div className="absolute top-0 left-0 z-40 h-full w-full flex justify-center items-center bg-primary/10">
            <Loader2 className="animate-spin" />
          </div>
        )}
        <Table>
          <TableCaption>A list of all users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date of birth</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.length &&
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.firstName}
                  </TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.birthdate}</TableCell>
                  <TableCell className="flex gap-2 justify-end items-center">
                    <Button variant="link" asChild>
                      <Link to={`/users/${user.id}`}>Edit</Link>
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersList;
