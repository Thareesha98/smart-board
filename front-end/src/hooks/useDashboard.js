// src/hooks/useDashboard.js
import { useState } from 'react';
import { initialApprovals, recentReports, initialActivities } from '../data/mockData';

export const useDashboard = () => {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [activities, setActivities] = useState(initialActivities);
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApproveAd = (id) => {
    setApprovals((prev) => prev.filter((ad) => ad.id !== id));
    showToast(`Ad #${id} approved successfully!`, 'success');
    // In real app, you would add a new "Approved" activity here
  };

  const handleRejectAd = (id) => {
    if (window.confirm('Are you sure you want to reject this ad?')) {
      setApprovals((prev) => prev.filter((ad) => ad.id !== id));
      showToast(`Ad #${id} rejected.`, 'error');
    }
  };

  const handleBackup = () => {
    if (window.confirm('Start system backup?')) {
      showToast('System backup initiated...', 'info');
      setTimeout(() => showToast('Backup completed!', 'success'), 2000);
    }
  };

  return {
    approvals,
    recentReports, // Static for now, can be state if needed
    activities,
    toast,
    handleApproveAd,
    handleRejectAd,
    handleBackup,
    showToast
  };
};