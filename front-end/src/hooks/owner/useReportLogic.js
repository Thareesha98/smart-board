import { useState, useEffect, useMemo, useCallback } from "react";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import api from "../../api/api";

const useReportLogic = () => {
  const { currentOwner } = useOwnerAuth();
  
  // --- STATE ---
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI State
  const [filter, setFilter] = useState("New");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FETCH REPORTS ---
  const fetchReports = useCallback(async () => {
    if (!currentOwner?.id) return;

    try {
      setLoading(true);
      // Endpoint: GET /api/reports/owner/{ownerId}
      const response = await api.get(`/reports/owner/${currentOwner.id}`);
      setReports(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentOwner]);

  // Initial Load
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // --- SUBMIT NEW REPORT ---
  const submitReport = async (reportData, files = []) => {
    setIsSubmitting(true);
    try {
      // Create FormData to handle text + files
      const formData = new FormData();
      
      // Append text fields
      formData.append("ownerId", currentOwner.id);
      formData.append("propertyId", reportData.propertyId);
      formData.append("studentId", reportData.studentId);
      formData.append("type", reportData.reportType);
      formData.append("description", reportData.description);
      formData.append("status", "New"); // Default status

      // Append files (if any)
      files.forEach((file) => {
        formData.append("evidence", file);
      });

      // Endpoint: POST /api/reports
      // Note: Axios automatically sets 'Content-Type': 'multipart/form-data'
      await api.post("/reports", formData);
      
      // Refresh list after add
      await fetchReports(); 
      return { success: true };

    } catch (err) {
      console.error("Submission error:", err);
      return { 
        success: false, 
        message: err.response?.data?.message || "Failed to submit report." 
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- COMPUTED DATA (Memoized) ---
  
  // 1. Calculate Counts for Tabs
  const counts = useMemo(() => {
    return reports.reduce((acc, report) => {
      // Ensure backend status matches these keys (case-sensitive)
      const status = report.status || "New"; 
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, { New: 0, "In Progress": 0, Resolved: 0 });
  }, [reports]);

  // 2. Filter Reports for Display
  const filteredReports = useMemo(() => {
    return reports.filter((rep) => rep.status === filter);
  }, [reports, filter]);

  return {
    // Data
    reports,
    filteredReports,
    counts,
    
    // UI State
    loading,
    error,
    isSubmitting,
    filter,
    setFilter,
    
    // Actions
    fetchReports,
    submitReport
  };
};

export default useReportLogic;