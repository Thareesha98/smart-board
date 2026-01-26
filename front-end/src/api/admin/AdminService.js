import api from '../api';

const AdminService = {
  // Users
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data; 
  },

  verifyOwner: async (userId, isApproved, reason = "") => {
    const response = await api.put(`/admin/users/${userId}/verify-owner`, {
      approved: isApproved,
      reason: reason
    });
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // 🔹 NEW: Report Management
  getReports: async (status = null) => {
    // Backend expects uppercase: PENDING, RESOLVED, DISMISSED
    const url = status ? `/admin/reports?status=${status.toUpperCase()}` : '/admin/reports';
    const response = await api.get(url);
    return response.data;
  },

  resolveReport: async (reportId, decision) => {
    // Maps to ReportDecisionDTO.java
    const response = await api.put(`/admin/reports/${reportId}/resolve`, {
      resolutionDetails: decision.details,
      actionTaken: decision.action,
      actionDuration: decision.duration
    });
    return response.data;
  },

  dismissReport: async (reportId, reason) => {
    const response = await api.put(`/admin/reports/${reportId}/dismiss`, {
      dismissalReason: reason
    });
    return response.data;
  }
};

export default AdminService;