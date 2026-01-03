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
// 🛠️ BOARDING SERVICES
// =================================================================

// 1. Get all boardings owned by this user
export const getOwnerBoardings = async () => {
  try {
    // Endpoint: GET /api/boardings/owner/{id}
    const response = await api.get("/boardings/owner");
    return response.data;
  } catch (error) {
    console.error("Error fetching boardings:", error);
    throw error;
  }
};

// 2. Get all tenants (students) for a specific boarding
export const getBoardingTenants = async (boardingId) => {
  try {
    // Endpoint: GET /api/boardings/{id}/tenants
    const response = await api.get(`/boardings/${boardingId}/tenants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return []; // Return empty array on error to prevent crash
  }
};

export const createBoarding = async (boardingData) => {
  try {
    // Endpoint: POST /api/owner/boardings
    const response = await api.post("/boardings", boardingData);
    return response.data;
  } catch (error) {
    console.error("Error creating boarding:", error);
    throw error;
  }
};

export const updateBoarding = async (boardingId, updatedData) => {
  try {
    // Endpoint: PUT /api/owner/boardings/{id}
    const response = await api.put(`/boardings/${boardingId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating boarding:", error);
    throw error;
  }
};

export const deleteBoarding = async (boardingId) => {
  try {
    // Endpoint: DELETE /api/owner/boardings/{id}
    const response = await api.delete(`/owner/boardings/${boardingId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting boarding:", error);
    throw error;
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