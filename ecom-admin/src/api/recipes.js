import axios from "axios";

const API_URL = "https://dummyjson.com/recipes";

export const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data.recipes;
};
