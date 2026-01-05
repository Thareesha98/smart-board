import api from '../api'; 

const StudentService = {

  // ==========================================
  // 1. AUTHENTICATION (Called by Context)
  // ==========================================
  
 // Matches UserController: @PutMapping("/api/users/{id}")
  updateProfile: async (userId, data) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
  },

  // // Upload Avatar
  // updateAvatar: async (studentId, file) => {
  //   const formData = new FormData();
  //   formData.append('file', file); // Ensure backend expects 'file'
    
  //   // Assuming backend endpoint: POST /api/students/{id}/avatar
  //   const response = await api.post(`/students/${studentId}/avatar`, formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  //   return response.data; // Should return the new avatar URL
  // },

  // ==========================================
  // 2. REPORTS (Your Existing Code)
  // ==========================================
  
  getSentReports: async (studentId) => {
    const response = await api.get(`/reports/sent/${studentId}`);
    return response.data;
  },

  createReport: async (formData) => {
    const response = await api.post('/reports', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // ==========================================
  // 3. BOARDINGS (Search & Details)
  // ==========================================

  // Matches BoardingController: @GetMapping("/api/boardings/search")
  searchBoardings: async (filters) => {

    // ✅ FIX: Map 'roomTypes' array (Frontend) to 'boardingType' string (Backend)
    let backendBoardingType = null;
    if (filters.roomTypes && filters.roomTypes.length > 0) {
        const selected = filters.roomTypes[0].toLowerCase();
        
        if (selected === 'apartment') {
            backendBoardingType = 'ANEX'; // Map 'apartment' -> 'ANEX'
        } else if (selected === 'single' || selected === 'shared') {
            backendBoardingType = 'ROOM'; // Map 'single/shared' -> 'ROOM'
        }
        // If neither, send null or handle accordingly
    }

    // ✅ FIX: Map 'gender' correctly
    let backendGender = null;
    if (filters.gender && filters.gender !== 'any') {
        backendGender = filters.gender.toUpperCase(); // "male" -> "MALE"
    }

    const params = {
      addressKeyword: filters.searchQuery || null,
      minPrice: filters.minPrice > 0 ? filters.minPrice : null,
      maxPrice: filters.maxPrice < 50000 ? filters.maxPrice : null,
      genderType: filters.gender !== 'any' ? filters.gender.toUpperCase() : null,
      boardingType: filters.boardingType || null,
      page: 0,
      size: 50
    };

    // Remove empty keys
    Object.keys(params).forEach(key => params[key] == null && delete params[key]);

    const response = await api.get('/boardings/search', { params });
    return response.data; 
  },

  // Matches BoardingController: @GetMapping("/api/boardings/{id}")
  getBoardingDetails: async (id) => {
    const response = await api.get(`/boardings/${id}`);
    return response.data;
  },

  // ==========================================
  // 4. APPOINTMENTS (Visits)
  // ==========================================

  // Matches AppointmentController: @PostMapping("/api/appointments/student/{id}")
  createAppointment: async (studentId, appointmentData) => {
    
    // 1. Construct Start Date object safely
    // appointmentData.visitDate is "2025-05-20"
    // appointmentData.visitTime is "09:00" or "14:30"
    const start = new Date(`${appointmentData.visitDate}T${appointmentData.visitTime}`);
    
    // 2. Calculate End Date (Start + 1 Hour)
    const end = new Date(start.getTime() + 60 * 60 * 1000); 

    // 3. Helper to format to ISO string "yyyy-MM-ddTHH:mm:ss" without timezone issues
    const toIsoString = (date) => {
        const pad = (num) => String(num).padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = '00';
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const payload = {
      boardingId: appointmentData.boardingId,
      numberOfStudents: 1, 
      requestedStartTime: toIsoString(start), 
      requestedEndTime: toIsoString(end),     
      studentNote: appointmentData.visitNotes
    };

    const response = await api.post(`/appointments/student/${studentId}`, payload);
    return response.data;
  },

  // Matches AppointmentController: @GetMapping("/api/appointments/student/{id}")
  getMyAppointments: async (studentId) => {
    const response = await api.get(`/appointments/student/${studentId}`);
    return response.data;
  },

  // Matches AppointmentController: @PutMapping("/api/appointments/.../cancel")
  cancelAppointment: async (studentId, appointmentId) => {
    const response = await api.put(`/appointments/student/${studentId}/${appointmentId}/cancel`);
    return response.data;
  },

  markAsVisited: async (studentId, appointmentId) => {
    const response = await api.put(`/appointments/student/${studentId}/${appointmentId}/visit`);
    return response.data;
  },

  selectBoarding: async (studentId, appointmentId) => {
    const response = await api.put(`/appointments/student/${studentId}/${appointmentId}/select`);
    return response.data;
  },

  
  rejectBoarding: async (studentId, appointmentId) => {
    const response = await api.put(`/appointments/student/${studentId}/${appointmentId}/reject`);
    return response.data;
  },

  // ==========================================
  // 5. REVIEWS (Ratings)
  // ==========================================

  // Matches ReviewController: @PostMapping("/api/reviews")
  submitReview: async (reviewData) => {
    const payload = {
      studentId: reviewData.userId,
      boardingId: reviewData.boardingId,
      rating: reviewData.rating,
      comment: reviewData.review
    };
    const response = await api.post('/reviews', payload);
    return response.data;
  },

  // Matches ReviewController: @GetMapping("/api/reviews/boarding/{id}")
  getBoardingReviews: async (boardingId) => {
    const response = await api.get(`/reviews/boarding/${boardingId}`);
    return response.data;
  }
};

export default StudentService;