import client from './axiosClient';

export const register = async (data: any) => {
  const res = await client.post('/Auth/register', data);
  return res.data;
};

export const login = async (data: any) => {
  const res = await client.post('/Auth/login', data);
  return res.data;
};
