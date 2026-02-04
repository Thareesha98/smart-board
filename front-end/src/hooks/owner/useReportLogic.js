// import { useState, useEffect, useMemo, useCallback } from "react";
// import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
// import { getOwnerReports, createReport } from "../../api/owner/service";

// const useReportLogic = () => {
//   const { currentOwner } = useOwnerAuth();

//   // Data State
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // UI State
//   const [filter, setFilter] = useState("New");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // 1. Fetch Reports
//   const fetchReports = useCallback(async () => {
//     if (!currentOwner?.id) return;

//     try {
//       setLoading(true);
//       const data = await getOwnerReports(currentOwner.id);
//       setReports(data);
//       setError(null);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to load reports.");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentOwner]);

//   // Initial Load
//   useEffect(() => {
//     fetchReports();
//   }, [fetchReports]);

//   // 2. Submit Report Wrapper
//   const submitNewReport = async (formData, files) => {
//     if (!currentOwner?.id)
//       return { success: false, message: "User not identified" };

//     setIsSubmitting(true);
//     try {
//       // Pass the entire formData object (AddReportPage now handles the structure)
//       // We just inject the ownerId here
//       const dataToSend = {
//         ...formData,
//         ownerId: currentOwner.id,
//       };

//       await createReport(dataToSend, files);

//       await fetchReports();
//       return { success: true };
//     } catch (err) {
//       console.error("Submit error:", err);
//       return {
//         success: false,
//         message: err.response?.data?.message || "Failed to submit report",
//       };
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // 3. Computed Values (Tabs & Filtering)
//   const counts = useMemo(() => {
//     return reports.reduce(
//       (acc, report) => {
//         // Ensure key matches Backend status exactly (Case Sensitive)
//         const status = report.status || "New";
//         acc[status] = (acc[status] || 0) + 1;
//         return acc;
//       },
//       { New: 0, "In Progress": 0, Resolved: 0 }
//     );
//   }, [reports]);

//   const filteredReports = useMemo(() => {
//     return reports.filter((rep) => rep.status === filter);
//   }, [reports, filter]);

//   return {
//     reports,
//     filteredReports,
//     counts,
//     loading,
//     error,
//     isSubmitting,
//     filter,
//     setFilter,
//     submitNewReport,
//   };
// };

// export default useReportLogic;

import { useState, useEffect, useMemo } from "react";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import { getOwnerReports, createOwnerReport } from "../../api/owner/service";

const useReportLogic = () => {
  const { currentOwner } = useOwnerAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("New"); // Default filter: New, In Progress, Resolved

  // 1. Fetch Reports
  const fetchReports = async () => {
    if (!currentOwner?.id) return;
    setLoading(true);
    try {
      const data = await getOwnerReports(currentOwner.id);

      // Map Backend DTO to Frontend UI Structure
      const mappedData = data.map((r) => ({
        id: r.id,
        title: r.reportTitle,
        description: r.reportDescription,
        status: r.status || "New", // Default to New if null
        date: r.incidentDate,
        type: r.type,
        severity: r.severity,
        student: r.reportedUserName || "Unknown User", // Works for Student or Tech
        studentId: r.reportedUserId,
        property: r.boardingTitle || "General",
        evidenceCount: 0, // You can update this if backend sends file count
      }));

      setReports(mappedData);
    } catch (error) {
      console.error("Failed to load reports", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [currentOwner]);

  // 2. Filter Reports
  const filteredReports = useMemo(() => {
    if (filter === "All") return reports;
    // Simple status matching
    return reports.filter(
      (r) =>
        r.status === filter || (filter === "New" && r.status === "PENDING"),
    );
  }, [reports, filter]);

  // 3. Submit Logic (Wraps the API)
  const submitNewReport = async (reportData, files) => {
    try {
      // Ensure Owner ID is attached
      const payload = { ...reportData, ownerId: currentOwner.id };
      await createOwnerReport(payload, files);
      await fetchReports(); // Refresh list after submit
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return {
    reports,
    filteredReports,
    setFilter,
    submitNewReport,
    loading,
  };
};

export default useReportLogic;
