import axios from 'axios';

export const getAllBooks = async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/books`, {
    withCredentials: true,
  });
  return result;
};

export const orderBook = async (data) => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/books/order`,
    data,
    {
      withCredentials: true,
    }
  );
  return result;
};
