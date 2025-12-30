import api from '../api';

export const userService = {
  // Fetch public profile by ID
  getPublicProfile: async (id) => {
    try {
      const response = await api.get(`/users/public/${id}`);
      return response.data;
    } catch (error) {
      throw error; // Let the component handle the error state
    }
  },

  // You can add other user-related calls here later, like:
  // updateProfile: (data) => api.put('/users/profile', data),
};