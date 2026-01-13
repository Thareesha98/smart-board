import { useState, useEffect, useMemo, useCallback } from 'react';
import StudentService from '../../api/student/StudentService'; // Import the Service
import { useAuth } from '../../context/student/StudentAuthContext';

const useReportsLogic = () => {
  const authContext = useAuth();
  const currentUser = authContext.currentUser || authContext.user;
  
  const [userReports, setUserReports] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH REPORTS ---
  const fetchReports = useCallback(async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    try {
      const data = await StudentService.getSentReports(currentUser.id);
      
      // Map Backend Status strings to Frontend keys
      const normalizedData = data.map(report => ({
        ...report,
        status: mapBackendStatus(report.status)
      }));
      setUserReports(normalizedData);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  // --- 2. FILTER ---
  const filteredReports = useMemo(() => {
    if (filter === 'all') return userReports;
    return userReports.filter(report => report.status === filter);
  }, [userReports, filter]);

  // --- 3. SUBMIT ---
  const submitReport = async (reportData) => {
    if (!currentUser?.id) return alert("Please log in.");

    try {
      const formData = new FormData();
      formData.append('senderId', currentUser.id);
      formData.append('reportTitle', reportData.reportTitle);
      formData.append('reportDescription', reportData.reportDescription);
      formData.append('type', reportData.type?.toUpperCase() || 'OTHER');
      formData.append('severity', reportData.severity?.toUpperCase() || 'LOW');
      formData.append('incidentDate', reportData.incidentDate || new Date().toISOString().split('T')[0]);
      formData.append('allowContact', reportData.allowContact || true);

      // Optional Text Fields
      if (reportData.boarding) formData.append('boarding', reportData.boarding);
      if (reportData.reportedPerson) formData.append('reportedPersonName', reportData.reportedPerson);
      if (reportData.reportedUserId) formData.append('reportedUserId', reportData.reportedUserId);

      // Files
      if (reportData.evidence && reportData.evidence.length > 0) {
        reportData.evidence.forEach((file) => formData.append('evidence', file));
      }

      // Cleaner: Calls the service
      await StudentService.createReport(formData);

      await fetchReports(); 
      return true;
    } catch (err) {
      console.error("Submit error:", err);
      throw err;
    }
  };

  return { userReports, filteredReports, submitReport, setFilter, loading };
};

// Helper
const mapBackendStatus = (status) => {
    if (!status) return 'pending';
    const lower = status.toLowerCase();
    if (lower === 'new' || lower === 'pending') return 'pending';
    if (lower.includes('progress') || lower.includes('investigating')) return 'under-review';
    if (lower === 'resolved') return 'resolved';
    if (lower === 'dismissed') return 'dismissed';
    return 'pending';
};

export default useReportsLogic;