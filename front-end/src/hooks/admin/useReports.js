import { useState, useMemo, useEffect, useCallback } from 'react';
import AdminService from '../../api/admin/AdminService';

export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [currentTab, setCurrentTab] = useState('PENDING'); // PENDING, RESOLVED, DISMISSED
  const [category, setCategory] = useState('all'); 
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize as true for initial load state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await AdminService.getReports(currentTab);
      // Map Backend DTO to Frontend UI structure
      const mapped = (Array.isArray(data) ? data : []).map(r => ({
        ...r,
        id: r.id,
        title: r.title,
        priority: r.severity, // High, Medium, Low
        date: new Date(r.submissionDate).toLocaleDateString(),
        reporter: {
          name: r.senderName || 'Unknown',
          role: "USER", // You can refine this logic
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.senderName || 'User')}&background=random`
        }
      }));
      setReports(mapped);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]); // Set empty array on error
      showToast("Could not load reports: " + (error.message || 'Unknown error'), "error");
    } finally {
      setLoading(false);
    }
  }, [currentTab]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]); // Include fetchReports in dependency array

  const filteredReports = useMemo(() => {
    if (category === 'all') return reports;
    return reports.filter(r => r.reporter.role.toLowerCase() === category.slice(0, -1));
  }, [reports, category]);

  const handleResolve = async (id, solutionData) => {
    try {
      await AdminService.resolveReport(id, solutionData);
      showToast(`Report #${id} resolved successfully`, 'success');
      setSelectedReport(null);
      fetchReports();
    } catch (error) {
      showToast("Failed to resolve report", "error");
    }
  };

  const handleDismiss = async (id, reason) => {
    try {
      await AdminService.dismissReport(id, reason);
      showToast(`Report #${id} dismissed`, 'warning');
      setSelectedReport(null);
      fetchReports();
    } catch (error) {
      showToast("Failed to dismiss report", "error");
    }
  };

  return {
    filteredReports, currentTab, setCurrentTab, category, setCategory,
    selectedReport, setSelectedReport, toast, loading,
    handleDismiss, handleResolve, refresh: fetchReports
  };
};