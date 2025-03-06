import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data.users;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};
