import { useState, useMemo } from 'react';
import { initialAds } from '../data/mockData';

export const useAds = () => {
  const [ads, setAds] = useState(initialAds || []);
  const [currentTab, setCurrentTab] = useState('pending');
  const [selectedAd, setSelectedAd] = useState(null);
  const [toast, setToast] = useState(null);

  const stats = useMemo(() => ({
    total: ads.length,
    pending: ads.filter(a => a.status === 'pending').length,
    approved: ads.filter(a => a.status === 'approved').length,
    rejected: ads.filter(a => a.status === 'rejected').length
  }), [ads]);

  const filteredAds = useMemo(() => 
    ads.filter(ad => ad.status === currentTab), 
  [ads, currentTab]);

  const handleApprove = (id) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, status: 'approved' } : ad));
    setToast({ message: "Ad approved successfully!", type: "success" });
    setSelectedAd(null);
    setTimeout(() => setToast(null), 3000);
  };

  const handleReject = (id, reason) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, status: 'rejected' } : ad));
    setToast({ message: `Ad rejected: ${reason}`, type: "error" });
    setSelectedAd(null);
    setTimeout(() => setToast(null), 3000);
  };

  return { 
    ads: filteredAds, stats, currentTab, setCurrentTab, 
    selectedAd, setSelectedAd, toast, handleApprove, handleReject 
  };
};