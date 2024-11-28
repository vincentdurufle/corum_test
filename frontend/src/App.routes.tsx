import { Route, Routes } from 'react-router';
import AuthPage from '@/pages/auth/AuthPage.tsx';
import { useRecoilState } from 'recoil';
import { currentUserStore } from '@/stores/User.store.ts';
import { useEffect, useState } from 'react';
import AdminPage from '@/pages/admin/AdminPage.tsx';
import { Loader2 } from 'lucide-react';
import { getCookie, getUserByAccessToken } from '@/utils';
import AppLayout from '@/components/layouts/AppLayout.tsx';

const AppRoutes = () => {
  const [user, setUser] = useRecoilState(currentUserStore);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookie = getCookie('access_token');
    if (cookie && !user) {
      setIsLoading(true);
      getUserByAccessToken()
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          setUser(undefined);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [setUser, user]);

  useEffect(() => {
    const logoutUser = () => setUser(undefined);

    window.addEventListener('user:expired', logoutUser);

    return () => window.removeEventListener('user:expired', logoutUser);
  }, [setUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
