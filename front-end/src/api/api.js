import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8086/api',
  baseURL: 'http://13.233.34.226:8086/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // 🔒 STRICT CHECK: Ensure token is real string and not "null"/"undefined" text
    if (token && token !== "null" && token !== "undefined" && token.length > 10) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // 🚀 CRITICAL: Delete the header to force a clean public request
      delete config.headers.Authorization;
      config.headers.Authorization = undefined; 
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
