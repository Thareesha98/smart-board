import { useState, useMemo, useEffect } from 'react';
import api from '../api'; // Import your configured axios instance

export const useAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('pending');
  const [selectedAd, setSelectedAd] = useState(null);
  const [toast, setToast] = useState(null);

  // Fetch ads from backend
  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/boardings');
      setAds(response.data); // Mapping matches AdminBoardingResponseDTO
    } catch (error) {
      showToast("Failed to load ads", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Filter ads based on status (pending, approved, rejected)
  const filteredAds = useMemo(() => 
    ads.filter(ad => ad.status.toLowerCase() === currentTab), 
  [ads, currentTab]);

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/boardings/${id}/approve`);
      setAds(prev => prev.map(ad => ad.id === id ? { ...ad, status: 'approved' } : ad));
      showToast("Ad approved successfully!", "success");
    } catch (error) {
      showToast("Approval failed", "error");
    }
  };

  const handleReject = async (id, reason) => {
    try {
      // Backend expects reason as a request parameter
      await api.put(`/admin/boardings/${id}/reject`, null, { params: { reason } });
      setAds(prev => prev.map(ad => ad.id === id ? { ...ad, status: 'rejected' } : ad));
      showToast("Ad rejected", "error");
    } catch (error) {
      showToast("Rejection failed", "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return {
    ads: filteredAds,
    loading,
    currentTab,
    setCurrentTab,
    selectedAd,
    setSelectedAd,
    toast,
    handleApprove,
    handleReject,
    stats: {
        total: ads.length,
        pending: ads.filter(a => a.status.toLowerCase() === 'pending').length,
        approved: ads.filter(a => a.status.toLowerCase() === 'approved').length,
        rejected: ads.filter(a => a.status.toLowerCase() === 'rejected').length
    }
  };
};