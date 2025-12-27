import api from "../api";

// ... (Maintenance services remain unchanged)

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