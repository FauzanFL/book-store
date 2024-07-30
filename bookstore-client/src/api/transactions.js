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

export const processTransaction = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/transactions/process`,
    {
      withCredentials: true,
    }
  );
  return result;
};
