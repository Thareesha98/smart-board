import { useState, useEffect, useMemo, useCallback } from "react";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import { getOwnerReports, createReport } from "../../api/owner/service";

const useReportLogic = () => {
  const { currentOwner } = useOwnerAuth();

  // Data State
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI State
  const [filter, setFilter] = useState("New");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Reports
  const fetchReports = useCallback(async () => {
    if (!currentOwner?.id) return;

    try {
      setLoading(true);
      const data = await getOwnerReports(currentOwner.id);
      setReports(data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }, [currentOwner]);

  // Initial Load
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // 2. Submit Report Wrapper
  const submitNewReport = async (formData, files) => {
    if (!currentOwner?.id)
      return { success: false, message: "User not identified" };

    setIsSubmitting(true);
    try {
      // Pass the entire formData object (AddReportPage now handles the structure)
      // We just inject the ownerId here
      const dataToSend = {
        ...formData,
        ownerId: currentOwner.id,
      };

      await createReport(dataToSend, files);

      await fetchReports();
      return { success: true };
    } catch (err) {
      console.error("Submit error:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to submit report",
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Computed Values (Tabs & Filtering)
  const counts = useMemo(() => {
    return reports.reduce(
      (acc, report) => {
        // Ensure key matches Backend status exactly (Case Sensitive)
        const status = report.status || "New";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      { New: 0, "In Progress": 0, Resolved: 0 }
    );
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((rep) => rep.status === filter);
  }, [reports, filter]);

  return {
    reports,
    filteredReports,
    counts,
    loading,
    error,
    isSubmitting,
    filter,
    setFilter,
    submitNewReport,
  };
};

export default useReportLogic;
