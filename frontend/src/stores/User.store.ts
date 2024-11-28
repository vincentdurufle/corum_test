import { atom } from 'recoil';
import { User } from '@/types';

export const currentUserStore = atom<User | undefined>({
  key: 'currentUser',
  default: undefined,
});
