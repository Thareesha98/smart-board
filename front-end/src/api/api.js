import axios from 'axios';

// 1. Robust Base URL (Falls back to localhost:8086 if env var fails)
const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:8086/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor (Attaches Token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // 🔒 STRICT CHECK: Ensure token is real string and valid
    if (token && token !== "null" && token !== "undefined" && token.length > 10) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; 
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor (RELAXED - No Auto Logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ⚠️ I commented out the auto-logout so you can debug without losing data
    if (error.response && error.response.status === 401) {
      console.warn("Session token might be expired, but keeping data for debugging.");
      // localStorage.clear();  <-- DISABLED FOR NOW
      // window.location.href = "/login"; <-- DISABLED FOR NOW
    }
    return Promise.reject(error);
  }
);

export default api;