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
      // 🚀 CRITICAL: Delete the header to force a clean public request
      delete config.headers.Authorization; 
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor (Handles Token Expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the Backend says "401 Unauthorized" (Token Expired), log them out
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Clearing storage and redirecting...");
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;