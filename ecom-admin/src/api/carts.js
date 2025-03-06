import axios from "axios";

const API_URL = "https://dummyjson.com/carts";

export const getCarts = async () => {
  const response = await axios.get(API_URL);
  return response.data.carts;
};

export const addToCart = async (cartData) => {
  const response = await axios.post(`${API_URL}/add`, cartData);
  return response.data;
};

export const removeFromCart = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
