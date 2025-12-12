// src/hooks/useAdsData.js
import { useState, useEffect, useCallback } from 'react';
import { fetchAds, approveAd, rejectAd, getAdStats, deleteAd } from '../api/ads.js';

const useAdsData = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentTab, setCurrentTab] = useState('pending'); // 'pending', 'approved', 'rejected'
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({});

  const loadAds = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAds(currentTab, currentPage, search);
      setAds(data.ads);
      setTotalPages(data.totalPages);
      
      // Update stats on every load (since data changes after actions)
      setStats(getAdStats());
      
    } catch (error) {
      console.error('Failed to fetch ads:', error);
      // Show notification toast
    } finally {
      setLoading(false);
    }
  }, [currentTab, currentPage, search]);

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  const changeTab = (tab) => {
    setCurrentTab(tab);
    setCurrentPage(1); // Reset page on tab change
    setSearch(''); // Optionally reset search on tab change
  };

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleSearch = (newSearch) => {
      setSearch(newSearch);
      setCurrentPage(1); // Reset page on new search
  }

  // Action handlers
  const handleApprove = async (adId) => {
    const result = await approveAd(adId);
    if (result.success) {
        // Show success notification (e.g., using a toast utility)
        loadAds(); // Reload data
    } else {
        // Show error notification
    }
  };

  const handleReject = async (adId, reason) => {
    const result = await rejectAd(adId, reason);
    if (result.success) {
        // Show success notification
        loadAds(); // Reload data
    } else {
        // Show error notification
    }
  };
  
  const handleDelete = async (adId) => {
    const result = await deleteAd(adId);
    if (result.success) {
        // Show success notification
        loadAds(); // Reload data
    } else {
        // Show error notification
    }
  }

  return { 
    ads, 
    loading, 
    currentPage, 
    totalPages, 
    currentTab, 
    search,
    stats,
    changeTab, 
    changePage, 
    handleApprove, 
    handleReject,
    handleSearch,
    handleDelete
  };
};

export default useAdsData;