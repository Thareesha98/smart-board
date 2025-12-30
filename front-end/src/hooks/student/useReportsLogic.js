import { useState, useEffect, useMemo, useContext } from 'react';
import StudentService from '../../services/student/StudentService'; // Import the Service
import { StudentAuthContext } from '../../context/student/AuthContext';

const useReportsLogic = () => {
  const { user } = useContext(StudentAuthContext);
  const [userReports, setUserReports] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH REPORTS ---
  const fetchReports = async () => {
    if (!user || !user.id) return;
    setLoading(true);
    try {
      // Cleaner: Calls the service
      const data = await StudentService.getSentReports(user.id);
      
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
  };

  useEffect(() => { fetchReports(); }, [user]);

  // --- 2. FILTER ---
  const filteredReports = useMemo(() => {
    if (filter === 'all') return userReports;
    return userReports.filter(report => report.status === filter);
  }, [userReports, filter]);

  // --- 3. SUBMIT ---
  const submitReport = async (reportData) => {
    if (!user?.id) return alert("Please log in.");

    try {
      const formData = new FormData();
      formData.append('senderId', user.id);
      formData.append('reportTitle', reportData.reportTitle);
      formData.append('reportDescription', reportData.reportDescription);
      formData.append('type', reportData.type);
      formData.append('severity', reportData.severity);
      formData.append('incidentDate', reportData.incidentDate);
      formData.append('allowContact', reportData.allowContact);

      // Optional Text Fields
      if (reportData.boarding) formData.append('boarding', reportData.boarding);
      if (reportData.reportedPerson) formData.append('reportedPersonName', reportData.reportedPerson);

      // Files
      if (reportData.evidence && reportData.evidence.length > 0) {
        reportData.evidence.forEach(file => formData.append('evidence', file));
      }

      // Cleaner: Calls the service
      await StudentService.createReport(formData);

      await fetchReports(); 
      return true;
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit report.");
    }
  };

  return { userReports, filteredReports, submitReport, setFilter, loading };
};

// Helper
const mapBackendStatus = (status) => {
    if(status === 'New') return 'pending';
    if(status === 'In Progress' || status === 'Investigating') return 'under-review';
    if(status === 'Resolved') return 'resolved';
    if(status === 'Dismissed') return 'dismissed';
    return 'pending';
};

export default useReportsLogic;