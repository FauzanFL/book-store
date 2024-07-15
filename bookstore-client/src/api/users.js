import axios from 'axios';

export const login = async (data) => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/login`,
    data
  );
  return result;
};

export const logout = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/logout`
  );
  return result;
};

export const isLogin = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/isLogin`
  );
  return result;
};
