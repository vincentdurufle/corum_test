import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <div className="min-h-screen min-w-full">
      <Outlet />
    </div>
  );
};

export default AppLayout;
