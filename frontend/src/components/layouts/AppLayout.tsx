import { Outlet } from 'react-router';
import NavBar from '@/components/NavBar.tsx';

const AppLayout = () => {
  return (
    <div className="min-h-screen min-w-full">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
