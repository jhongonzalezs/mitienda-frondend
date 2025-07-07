import axios from "axios";

const API_URL = "http://localhost:8003/categories";

// Obtener categoría por ID
export const getCategoryById = async (categoryId) => {
  const response = await axios.get(`${API_URL}/${categoryId}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
