import axios from 'axios';
import { deleteCookie, getCookie } from '@/utils';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 1000,
});

httpClient.interceptors.request.use(function (config) {
  const accessToken = getCookie('access_token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      deleteCookie('access_token');
      const event = new Event('user:expired');
      window.dispatchEvent(event);
    }

    return Promise.reject(error);
  },
);

export default httpClient;
