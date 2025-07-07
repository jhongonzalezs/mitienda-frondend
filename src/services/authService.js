// src/services/authService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8001/users";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        throw new Error("Credenciales inválidas");
      } else if (status === 500) {
        throw new Error("Error del servidor. Intenta más tarde.");
      } else {
        throw new Error(`Error: ${status} - ${error.response.data?.message || "Desconocido"}`);
      }
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error al realizar la solicitud");
    }
  }
};