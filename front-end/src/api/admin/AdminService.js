import api from '../api'; // Path to your central axios instance

const AdminService = {
  // ==========================================
  // 1. DASHBOARD & USERS
  // ==========================================
  
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

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

  // ==========================================
  // 2. REPORTS MANAGEMENT
  // ==========================================

  getReports: async (status) => {
    // status should be 'PENDING', 'RESOLVED', etc. (Uppercase to match Java Enum)
    const response = await api.get('/admin/reports', { params: { status } });
    return response.data;
  },

  resolveReport: async (reportId, decisionData) => {
    const response = await api.put(`/admin/reports/${reportId}/resolve`, decisionData);
    return response.data;
  },

  dismissReport: async (reportId, decisionData) => {
    const response = await api.put(`/admin/reports/${reportId}/dismiss`, decisionData);
    return response.data;
  },

  // ==========================================
  // 3. THIRD-PARTY ADS (RUPEE PRICING)
  // ==========================================

  // --- Submission Phase ---
  getSubmissions: async () => {
    const response = await api.get('/ads/submissions');
    return response.data;
  },

  approveAd: async (id) => {
    const response = await api.patch(`/ads/${id}/approve`);
    return response.data;
  },

  rejectAd: async (id) => {
    const response = await api.patch(`/ads/${id}/reject`);
    return response.data;
  },

  // --- Campaign Phase ---
  getCampaigns: async () => {
    const response = await api.get('/ads/campaigns');
    return response.data;
  },

  publishAd: async (adData) => {
    // adData structure: { title, companyName, redirectUrl, bannerImageUrl, expiryDate, planName, planPrice, targetPanels }
    // Ensure price is sent as a Double/Number
    const response = await api.post('/ads/publish', adData);
    return response.data;
  },

  toggleCampaignStatus: async (id) => {
    // Switches between ACTIVE and PAUSED in backend
    const response = await api.patch(`/ads/${id}/toggle-status`);
    return response.data;
  },

  updateCampaign: async (id, adData) => {
    const response = await api.put(`/ads/${id}`, adData);
    return response.data;
  },

  deleteAd: async (id) => {
    await api.delete(`/ads/${id}`);
  }
};

export default AdminService;