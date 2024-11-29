import { Link } from 'react-router';
import { Button } from '@/components/ui';
import { useResetRecoilState } from 'recoil';
import { currentUserStore } from '@/stores/User.store.ts';
import { deleteCookie } from '@/utils';
import corumLogo from '@/assets/corum_logo.png';
import { LogOut } from 'lucide-react';

const NavBar = () => {
  const resetUser = useResetRecoilState(currentUserStore);

  const logout = () => {
    resetUser();
    deleteCookie('access_token');
  };

  return (
    <div className="flex items-center p-4">
      <div className="flex-1">
        <img src={corumLogo} alt="Corum Logo" className="h-10" />
      </div>
      <Link
        to="/"
        className="font-bold uppercase text-center text-lg flex-auto"
      >
        Home
      </Link>
      <div className="flex-1 flex justify-end">
        <Button variant="link" onClick={logout}>
          Logout <LogOut></LogOut>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
