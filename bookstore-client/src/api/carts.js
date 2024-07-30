import axios from 'axios';

export const getCart = async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/carts`, {
    withCredentials: true,
  });
  return result;
};

export const cartPaid = async (data) => {
  const result = await axios.post(`${import.meta.env.VITE_API_URL}/carts/paid`, data, {
    withCredentials: true,
  });
  return result;
};

export const addItemToCart = async (data) => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/carts/add-item`,
    data,
    {
      withCredentials: true,
    }
  );
  return result;
};

export const removeItemFromCart = async (itemId) => {
  const result = await axios.delete(
    `${import.meta.env.VITE_API_URL}/carts/remove-item/${itemId}`,
    {
      withCredentials: true,
    }
  );
  return result;
};
