import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // backend URL
});

// Attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("zomo_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
