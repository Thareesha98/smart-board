import { useState, useMemo } from 'react';
import { initialReportsData } from '../data/mockData';

export const useReports = () => {
  const [reports, setReports] = useState(initialReportsData);
  const [currentTab, setCurrentTab] = useState('pending'); 
  const [category, setCategory] = useState('all'); 
  const [selectedReport, setSelectedReport] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredReports = useMemo(() => {
    const data = reports[currentTab] || [];
    if (category !== 'all') {
      return data.filter(r => r.reporter.role.toLowerCase() === category.slice(0, -1));
    }
    return data;
  }, [reports, currentTab, category]);

  const stats = useMemo(() => ({
    total: Object.values(reports).flat().length,
    pending: reports.pending?.length || 0,
    investigating: reports.investigating?.length || 0,
    resolved: reports.resolved?.length || 0,
    dismissed: reports.dismissed?.length || 0,
    urgent: (reports.pending || []).filter(r => r.priority === 'High').length
  }), [reports]);

  const moveReport = (id, targetTab, updateFields = {}) => {
    setReports(prev => {
      let reportToMove = null;
      const newReports = { ...prev };

      Object.keys(newReports).forEach(tab => {
        const index = (newReports[tab] || []).findIndex(r => r.id === id);
        if (index !== -1) {
          [reportToMove] = newReports[tab].splice(index, 1);
        }
      });

      if (reportToMove) {
        newReports[targetTab] = [
          { ...reportToMove, ...updateFields, status: targetTab },
          ...(newReports[targetTab] || [])
        ];
      }
      return newReports;
    });
  };

  const handleStartInvestigation = (id) => {
    moveReport(id, 'investigating');
    showToast(`Investigation started for #${id}`, 'info');
    setSelectedReport(null);
  };

  const handleDismiss = (id, reason) => {
    moveReport(id, 'dismissed', { dismissalReason: reason });
    showToast(`Report #${id} dismissed`, 'warning');
    setSelectedReport(null);
  };

  const handleResolve = (id, solution) => {
    moveReport(id, 'resolved', { solution });
    showToast(`Report #${id} marked as resolved`, 'success');
    setSelectedReport(null);
  };

  const handleSuspend = (userId, duration) => {
    showToast(`User ${userId} suspended for ${duration}`, 'error');
    setSelectedReport(null);
  };

  return {
    filteredReports, stats, currentTab, setCurrentTab, category, setCategory,
    selectedReport, setSelectedReport, toast, handleDismiss, 
    handleStartInvestigation, handleResolve, handleSuspend
  };
};