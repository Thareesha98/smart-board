import { useState, useEffect } from 'react';
import { analyticsMockData } from '../data/mockData';

export const useAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [data, setData] = useState(analyticsMockData['30d']);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate API fetch when timeRange changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(analyticsMockData[timeRange]);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [timeRange]);

  return { timeRange, setTimeRange, data, isLoading };
};