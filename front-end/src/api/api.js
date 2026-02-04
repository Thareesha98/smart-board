import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE;

const api = axios.create({

  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const rawUser = localStorage.getItem("user_data");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ ALWAYS attach numeric student ID
  if (rawUser) {
    const user = JSON.parse(rawUser);
    if (user?.id) {
      config.headers["X-User-Id"] = user.id;
    }
  }

  return config;
});

export default api;
