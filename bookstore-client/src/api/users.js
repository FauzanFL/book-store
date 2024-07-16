import axios from 'axios';

export const login = async (data) => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/login`,
    data,
    {
      withCredentials: true,
    }
  );
  return result;
};

export const logout = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/logout`,
    {
      withCredentials: true,
    }
  );
  return result;
};

export const isLogin = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/isLogin`,
    {
      withCredentials: true,
    }
  );
  return result;
};
