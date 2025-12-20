import { mockAnalyticsData, getAnalyticsDataByRange } from '../data/mockAnalyticsData';

// Simulates fetching analytics data with time range filtering
export const fetchAnalyticsData = async (timeRange = 'monthly') => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API latency
  
  const data = getAnalyticsDataByRange(timeRange);
  
  return {
    success: true,
    data: data,
    timeRange: timeRange,
    lastUpdated: new Date().toISOString()
  };
};

// Simulates fetching specific metrics
export const fetchAnalyticsMetrics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    success: true,
    data: mockAnalyticsData.currentMetrics,
    lastUpdated: new Date().toISOString()
  };
};

// Simulates fetching time series data
export const fetchTimeSeriesData = async (metric, range = 'monthly') => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const data = getAnalyticsDataByRange(range);
  let timeSeriesData = [];
  
  switch(metric) {
    case 'studentGrowth':
      timeSeriesData = data.timeSeriesData.studentGrowth;
      break;
    case 'ownerGrowth':
      timeSeriesData = data.timeSeriesData.ownerGrowth;
      break;
    case 'listingPerformance':
      timeSeriesData = data.timeSeriesData.listingPerformance;
      break;
    case 'revenueGrowth':
      timeSeriesData = data.timeSeriesData.revenueGrowth;
      break;
    default:
      timeSeriesData = [];
  }
  
  return {
    success: true,
    data: timeSeriesData,
    metric: metric,
    range: range
  };
};

// Simulates fetching categorical data
export const fetchCategoricalData = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let categoricalData = [];
  
  switch(category) {
    case 'reports':
      categoricalData = mockAnalyticsData.categoricalData.reportsByCategory;
      break;
    case 'users':
      categoricalData = mockAnalyticsData.categoricalData.userDistribution;
      break;
    case 'listings':
      categoricalData = mockAnalyticsData.categoricalData.listingTypes;
      break;
    case 'regions':
      categoricalData = mockAnalyticsData.categoricalData.regionalDistribution;
      break;
    default:
      categoricalData = [];
  }
  
  return {
    success: true,
    data: categoricalData,
    category: category
  };
};

// Simulates fetching top performers
export const fetchTopPerformers = async (type) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  let performers = [];
  
  switch(type) {
    case 'boardings':
      performers = mockAnalyticsData.topPerformers.topBoardings;
      break;
    case 'owners':
      performers = mockAnalyticsData.topPerformers.topOwners;
      break;
    case 'students':
      performers = mockAnalyticsData.topPerformers.activeStudents;
      break;
    default:
      performers = [];
  }
  
  return {
    success: true,
    data: performers,
    type: type
  };
};

// Simulates exporting analytics data
export const exportAnalyticsData = async (format = 'csv') => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log(`Exporting analytics data as ${format.toUpperCase()}`);
  return { 
    success: true, 
    message: `Analytics data exported as ${format.toUpperCase()}`,
    downloadUrl: `/api/export/analytics.${format}`,
    timestamp: new Date().toISOString()
  };
};

// Simulates system performance check
export const fetchSystemPerformance = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    success: true,
    data: mockAnalyticsData.systemPerformance,
    checkedAt: new Date().toISOString()
  };
};