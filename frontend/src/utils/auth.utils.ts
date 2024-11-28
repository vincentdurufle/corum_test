import { httpClient } from '@/lib';
import { User } from '@/types';

const getUserByAccessToken = async () => {
  const response = await httpClient.get<User>('auth/profile');

  return response.data;
};

export { getUserByAccessToken };
