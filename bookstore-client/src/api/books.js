import axios from 'axios';

export const getAllBooks = async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
  return result;
};
