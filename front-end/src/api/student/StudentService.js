import api from '../api';

// --- HELPER FUNCTIONS ---

// 1. Combine Date and Time for Backend (e.g., "2024-01-01" + "14:00" -> "2024-01-01T14:00:00")
const formatDateTime = (date, time) => {
  if (!date || !time) return null;
  const cleanTime = time.length === 5 ? `${time}:00` : time;
  return `${date}T${cleanTime}`;
};

// 2. Calculate End Time (Start Time + 1 Hour) required by backend
const calculateEndTime = (date, time) => {
  if (!date || !time) return null;
  const start = new Date(`${date}T${time}`);
  start.setHours(start.getHours() + 1);
  return start.toISOString().split('.')[0]; // Removes milliseconds
};

const StudentService = {

  // ==========================================
  // 1. REPORTS (Existing Features)
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
  // 2. BOARDINGS (Search & Details)
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

    // Remove null keys to keep URL clean
    Object.keys(params).forEach(key => params[key] == null && delete params[key]);

    const response = await api.get('/boardings/search', { params });
    
    // Transform Search Results for UI Card
    const content = response.data.content.map(b => ({
        id: b.id,
        name: b.title,           // Backend 'title' -> UI 'name'
        location: b.address,     // Backend 'address' -> UI 'location'
        price: b.pricePerMonth,
        image: b.imageUrls?.[0] || 'https://via.placeholder.com/300', // First image or fallback
        rating: 0,               // Rating not in summary DTO yet
        reviewCount: 0,
        amenities: [],           // Not in summary DTO
        badge: b.status === 'APPROVED' ? 'Verified' : 'New'
    }));

    return { ...response.data, content }; 
  },

  // Matches BoardingController: @GetMapping("/api/boardings/{id}")
  getBoardingDetails: async (id) => {
    const response = await api.get(`/boardings/${id}`);
    const data = response.data;

    // TRANSFORM DATA: Map Backend fields to Frontend UI expectations
    return {
      ...data,
      name: data.title,             // Backend 'title' -> Frontend 'name'
      location: {                   // Frontend expects object or string, adapting...
         address: data.address,
         distance: "1.2 km from University" // Placeholder or calculation
      },
      images: data.imageUrls || [], // ✅ FIX: Map 'imageUrls' to 'images' for useImageGallery hook
      price: data.pricePerMonth,
      owner: {
         // Backend Owner DTO might be missing in DetailDTO, mocking safe defaults
         name: "Landlord", 
         contact: "Contact via App",
         rating: 4.5,
         email: "owner@example.com",
         avatar: "https://via.placeholder.com/150"
      },
      reviewsSummary: {             // Mocking until Review API connected to Boarding Details
         overall: 4.5,
         breakdown: []
      }
    };
  },

  // ==========================================
  // 3. APPOINTMENTS (Visits)
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
  // 4. REVIEWS (Ratings)
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