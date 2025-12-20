import { useState, useEffect } from 'react';

const useAnalyticsData = () => {
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const loadAnalyticsData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in real app, fetch from API
        setMetrics({
          totalUsers: '2,847',
          activeListings: '428',
          platformRevenue: '287,500',
          onlineUsers: '247',
          studentGrowth: [1200, 1350, 1450, 1550, 1650, 1750, 1850, 1950, 2050, 2100, 2120, 2154],
          ownerGrowth: [400, 420, 450, 480, 520, 560, 590, 610, 630, 650, 670, 693],
          listingPerformance: {
            approved: [32, 38, 42, 48, 52, 58, 62, 68, 72, 78, 82, 88],
            pending: [8, 10, 12, 14, 15, 16, 18, 20, 22, 24, 26, 28],
            rejected: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
          },
          reportsCategory: [35, 28, 18, 12, 5, 2],
          revenueData: [150000, 165000, 180000, 195000, 210000, 225000, 240000, 255000, 270000, 280000, 285000, 287500],
          growthData: [0, 10, 9.1, 8.3, 7.7, 7.1, 6.7, 6.3, 5.9, 3.7, 1.8, 0.9]
        });
        setError(null);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('Error loading analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
    
    // Real-time updates simulation
    const interval = setInterval(() => {
      // In real app, you might fetch new data here
      console.log('Simulating real-time data update...');
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Refresh logic here
      setLoading(false);
    } catch (err) {
      setError('Failed to refresh data');
      setLoading(false);
    }
  };

  return { metrics, loading, error, refreshData };
};

export default useAnalyticsData;