import api from '../api';

const StudentService = {
  
  // Get reports submitted by the student
  getSentReports: async (studentId) => {
    const response = await api.get(`/reports/sent/${studentId}`);
    return response.data;
  },

  // Submit a new report (Requires FormData)
  createReport: async (formData) => {
    const response = await api.post('/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // (Optional) If you have other student features, add them here
  // getProfile: async (id) => { ... }
};

export default StudentService;