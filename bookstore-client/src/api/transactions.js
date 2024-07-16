import axios from 'axios';

export const getTransactions = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/transactions`,
    {
      withCredentials: true,
    }
  );
  return result;
};

export const addTransactions = async (data) => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/transactions/add`,
    data,
    {
      withCredentials: true,
    }
  );
  return result;
};
