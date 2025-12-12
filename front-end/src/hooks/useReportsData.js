// src/hooks/useReportsData.js
import { useState, useEffect, useCallback } from 'react';
import { fetchReports, getReportStats, dismissReport, suspendUser } from '../api/reports.js';

const useReportsData = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentTab, setCurrentTab] = useState('pending'); // 'pending', 'investigating', 'resolved'
  const [currentCategory, setCurrentCategory] = useState('all'); // 'all', 'students', 'owners'
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({});

  const loadReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchReports(currentTab, currentPage, currentCategory, search);
      setReports(data.reports);
      setTotalPages(data.totalPages);
      setStats(getReportStats());
      
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      // Show error toast
    } finally {
      setLoading(false);
    }
  }, [currentTab, currentPage, currentCategory, search]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const changeTab = (tab) => {
    setCurrentTab(tab);
    setCurrentPage(1); 
  };
  
  const changeCategory = (category) => {
      setCurrentCategory(category);
      setCurrentPage(1); // Reset page on category change
  }

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleDismiss = async (reportId, reason) => {
    const result = await dismissReport(reportId, reason);
    if (result.success) {
        // Show success notification
        loadReports(); // Reload data
    } else {
        // Show error notification
    }
    return result;
  };

  const handleSuspend = async (userEmail, duration, reason) => {
    const result = await suspendUser(userEmail, duration, reason);
    if (result.success) {
        // Show success notification
        loadReports(); // Reload data, as suspension might be an immediate resolution
    } else {
        // Show error notification
    }
    return result;
  };

  return { 
    reports, 
    loading, 
    currentPage, 
    totalPages, 
    currentTab, 
    currentCategory,
    search,
    stats,
    changeTab, 
    changePage, 
    changeCategory,
    setSearch,
    loadReports, // For search/filter
    handleDismiss, 
    handleSuspend,
  };
};

export default useReportsData;