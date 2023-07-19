import axios from '../../libraries/axios';

export const login = async (email, password) => {
  const { data } = await axios(false).post('/auth/signin', { email, password });
  return data;
};

export const refreshToken = async (refresh_token) => {
  const { data } = await axios(false).post('/auth/refresh-token', { refresh_token });
  return data;
};

export const logout = async () => {
  const { data } = await axios(true).post('/auth/signout');
  return data;
};
