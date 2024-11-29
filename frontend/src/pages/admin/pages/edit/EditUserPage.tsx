import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/lib';
import { Loader2 } from 'lucide-react';
import NotFound from '@/pages/common/NotFound.tsx';
import UserForm from '@/pages/admin/pages/components/UserForm.tsx';
import { User } from '@/types';

const EditUserPage = () => {
  const { userId } = useParams();

  const userQuery = useQuery({
    queryKey: ['editUserPage', userId],
    queryFn: () => httpClient.get<User>(`users/${userId}`),
    enabled: !!userId,
  });

  if (userQuery.isPending) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!userQuery.data) {
    return <NotFound />;
  }

  return <UserForm user={userQuery.data.data} />;
};

export default EditUserPage;
