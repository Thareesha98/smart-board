import axios from 'axios';

// 1. Create Axios Instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Make sure this matches your Spring Boot port
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Handle 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: Auto-logout if token expires
      // localStorage.clear();
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;