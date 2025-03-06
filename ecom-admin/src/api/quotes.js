import axios from "axios";

const API_URL = "https://dummyjson.com/quotes";

export const getQuotes = async () => {
  const response = await axios.get(API_URL);
  return response.data.quotes;
};
