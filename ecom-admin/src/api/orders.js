import axios from "axios";

const API_URL = "https://dummyjson.com/carts";

export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data.carts;
};

export const updateOrder = async (id, order) => {
  const response = await axios.put(`${API_URL}/${id}`, order);
  return response.data;
};
