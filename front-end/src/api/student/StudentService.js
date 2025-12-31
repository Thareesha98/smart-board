import api from '../api'; 

// --- HELPER FUNCTIONS ---
// Combine Date and Time for backend 
const formatDateTime = (date, time) => {
  const cleanTime = time.length === 5 ? `${time}:00` : time;
  return `${date}T${cleanTime}`;
};

// Calculate End Time (Start Time + 1 Hour)
const calculateEndTime = (date, time) => {
  const start = new Date(`${date}T${time}`);
  start.setHours(start.getHours() + 1);
  return start.toISOString().split('.')[0]; // Removes milliseconds
};

const StudentService = {

  // ==========================================
  // 1. AUTHENTICATION (Called by Context)
  // ==========================================
  
  // Matches UserController: @PostMapping("/api/users/login")
  loginUser: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data; // Returns UserResponseDTO
  },

  // Matches UserController: @PostMapping("/api/users/register")
  registerUser: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data; // Returns UserResponseDTO
  },

  // ==========================================
  // 2. PROFILE DATA 
  // ==========================================

  // Matches UserController: @GetMapping("/api/users/{id}")
  getProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Matches UserController: @PutMapping("/api/users/{id}")
  updateProfile: async (userId, updateData) => {
    const response = await api.put(`/users/${userId}`, updateData);
    return response.data;
  },

  // ==========================================
  // 3. REPORTS (Your Existing Code)
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
  // 4. BOARDINGS (Search & Details)
  // ==========================================

  // Matches BoardingController: @GetMapping("/api/boardings/search")
  searchBoardings: async (filters) => {
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
  // 5. APPOINTMENTS (Visits)
  // ==========================================

  // Matches AppointmentController: @PostMapping("/api/appointments/student/{id}")
  createAppointment: async (studentId, appointmentData) => {
    const payload = {
      boardingId: appointmentData.boardingId,
      numberOfStudents: 1, 
      requestedStartTime: formatDateTime(appointmentData.visitDate, appointmentData.visitTime),
      requestedEndTime: calculateEndTime(appointmentData.visitDate, appointmentData.visitTime),
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

  // ==========================================
  // 6. REVIEWS (Ratings)
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