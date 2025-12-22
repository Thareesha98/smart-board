import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import AnalyticsStats from '../components/analytics/AnalyticsStats';
import PerformanceChart from '../components/analytics/PerformanceChart';
import CategoryDistribution from '../components/analytics/CategoryDistribution';
import { useAnalytics } from '../hooks/useAnalytics';

const AdminAnalytics = ({ onNavigate }) => {
  const { timeRange, setTimeRange, data, isLoading } = useAnalytics();

  // Handle the case where data might not be loaded yet to prevent blank page
  if (isLoading || !data) {
    return (
      <AdminLayout onNavigate={onNavigate} activePage="analytics">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-accent animate-pulse font-bold text-xl">Loading Boarding Analytics...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      onNavigate={onNavigate} 
      activePage="analytics"
      title="Boarding Insights"
      subtitle="Overview of boarders, owners, and property performance"
    >
      {/* 1. Statistics Row */}
      <AnalyticsStats stats={data.stats} />

      {/* 2. Growth Trends */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        <PerformanceChart 
          title="Boarder Enrollment Growth" 
          chartData={data.studentTrend} 
        />
        <PerformanceChart 
          title="Active Property Bookings" 
          chartData={data.listingTrend} 
        />
      </div>

      {/* 3. Distribution & Financials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CategoryDistribution 
            title="Property Type Distribution" 
            chartData={data.categoryData} 
          />
        </div>
        <div className="lg:col-span-2">
          <PerformanceChart 
            title="Revenue Collection (LKR '000)" 
            chartData={data.revenueTrend} 
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;