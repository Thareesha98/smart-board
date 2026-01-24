import api from '../api'; // Path to your central axios instance in src/api/api.js

const AdminService = {
  // 1. Fetch Users (Maps to @GetMapping("/users") in AdminController)
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data; 
  },

  // 2. Verify Owner (Maps to @PutMapping("/users/{userId}/verify-owner"))
  // Expects { approved: boolean, reason: string } as per UserVerificationDTO.java
  verifyOwner: async (userId, isApproved, reason = "") => {
    const response = await api.put(`/admin/users/${userId}/verify-owner`, {
      approved: isApproved,
      reason: reason
    });
    return response.data;
  },

  // 3. Get Stats (Maps to @GetMapping("/dashboard"))
  // Returns totalUsers, totalStudents, totalOwners, etc., from AdminDashboardDTO.java
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  }
};

export default AdminService;