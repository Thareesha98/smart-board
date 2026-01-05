import api from "../api";

// =================================================================
// 🚩 REPORT SERVICES
// =================================================================

export const getOwnerReports = async (ownerId) => {
  try {
    const response = await api.get(`/reports/sent/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const createReport = async (reportData, files) => {
  try {
    const formData = new FormData();

    // ✅ FIX: Map keys exactly to Java 'ReportCreateDTO'
    formData.append("reportTitle", reportData.title);
    formData.append("reportDescription", reportData.description);
    formData.append("type", reportData.reportType); // e.g., "boarding", "safety"
    formData.append("severity", reportData.severity); // e.g., "HIGH", "LOW"

    // Backend wants Boarding NAME, not ID
    formData.append("boarding", reportData.boardingName);

    // ID Mapping
    formData.append("senderId", reportData.ownerId);
    formData.append("reportedUserId", reportData.studentId);

    // Date & Boolean
    formData.append("incidentDate", reportData.incidentDate); // YYYY-MM-DD
    formData.append("allowContact", reportData.allowContact); // true/false

    // Files
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("evidence", file);
      });
    }

    const response = await api.post("/reports", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

// =================================================================
// 🛠️ BOARDING SERVICES (Updated)
// =================================================================

// 1. Get all boardings owned by this user
export const getOwnerBoardings = async () => {
  try {
    // Matches @RequestMapping("/api/boardings/owner")
    const response = await api.get("/boardings/owner");
    return response.data;
  } catch (error) {
    console.error("Error fetching boardings:", error);
    throw error;
  }
};

// 2. Get Single Boarding (For Edit Page)
export const getBoardingById = async (boardingId) => {
  try {
    // ✅ CHANGED: We now use the PUBLIC endpoint found in BoardingController.java
    // Path is "/boardings/{id}" instead of "/boardings/owner/{id}"
    const response = await api.get(`/boardings/${boardingId}`);
    
    // Quick Fix: Map the typo 'bosted' from backend to 'isBoosted' for frontend
    const data = response.data;
    if (data.bosted !== undefined) {
        data.isBoosted = data.bosted;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching single boarding:", error);
    throw error;
  }
};

// 3. Create Boarding
export const createBoarding = async (boardingData) => {
  try {
    // Matches @PostMapping at /api/boardings/owner
    const response = await api.post("/boardings/owner", boardingData);
    return response.data;
  } catch (error) {
    console.error("Error creating boarding:", error);
    throw error;
  }
};

// 4. Update Boarding
export const updateBoarding = async (boardingId, updatedData) => {
  try {
    // Matches @PutMapping("/{boardingId}") at /api/boardings/owner
    const response = await api.put(`/boardings/owner/${boardingId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating boarding:", error);
    throw error;
  }
};

// 5. Delete Boarding
export const deleteBoarding = async (boardingId) => {
  try {
    // Matches @DeleteMapping("/{boardingId}") at /api/boardings/owner
    const response = await api.delete(`/boardings/owner/${boardingId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting boarding:", error);
    throw error;
  }
};

// 6. Boost Boarding
export const boostBoarding = async (boardingId, days) => {
  try {
    // Matches @PostMapping("/{boardingId}/boost")
    const response = await api.post(`/boardings/owner/${boardingId}/boost`, null, {
      params: { days }
    });
    return response.data;
  } catch (error) {
    console.error("Error boosting boarding:", error);
    throw error;
  }
};

// 7. Upload Images (Connects to FileController)
export const uploadBoardingImages = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    // Matches @PostMapping("/upload-multiple/{folder}") in FileController
    const response = await api.post("/files/upload-multiple/boarding-ads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Returns List<String> URLs
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

// 8. Get Tenants (unchanged, assuming separate controller)
export const getBoardingTenants = async (boardingId) => {
  try {
    const response = await api.get(`/boardings/${boardingId}/tenants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return [];
  }
};

// =================================================================
// 🛠️ MAINTENANCE SERVICES
// =================================================================

// 1. Get all maintenance requests for the logged-in Owner
// Matches Java: @GetMapping("/owner") inside MaintenanceController
// Note: No ownerId needed param; backend takes it from the token/auth
export const getOwnerMaintenanceRequests = async () => {
  try {
    const response = await api.get(`/maintenance/owner`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching maintenance requests:", error);
    throw error;
  }
};

// 2. Update the status of a request (Decide)
// Matches Java: @PutMapping("/owner/{maintenanceId}")
// Expects MaintenanceDecisionDTO body
export const updateMaintenanceStatus = async (requestId, newStatus, ownerNote = "") => {
  try {
    const response = await api.put(`/maintenance/owner/${requestId}`, {
      status: newStatus,
      ownerNote: ownerNote 
    });
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

// =================================================================
// 🗓️ APPOINTMENT SERVICES
// =================================================================

// 1. Get all appointments for a specific owner
// Matches Java: @GetMapping("/owner/{ownerId}")
export const getOwnerAppointments = async (ownerId) => {
  try {
    const response = await api.get(`/appointments/owner/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

// 2. Respond to an appointment (Accept/Decline)
// Matches Java: @PutMapping("/owner/{ownerId}/{appointmentId}")
// Expects AppointmentOwnerDecisionDTO body
export const updateAppointmentStatus = async (ownerId, appointmentId, decisionData) => {
  try {
    const response = await api.put(`/appointments/owner/${ownerId}/${appointmentId}`, decisionData);
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};
