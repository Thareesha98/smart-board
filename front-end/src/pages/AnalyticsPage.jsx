import React from 'react';
import AdminLayout from '../components/Layout/AdminLayout';
import AnalyticsDashboard from '../components/Analytics/AnalyticsDashboard';

const AnalyticsPage = () => {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-dark mb-2">Analytics Dashboard</h1>
            <p className="text-text-muted">Track platform performance and user insights</p>
          </div>
          <AnalyticsDashboard />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;