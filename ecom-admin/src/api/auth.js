import axios from "axios";

export const login = async (credentials) => {
  return await axios.post("https://dummyjson.com/auth/login", credentials);
};
