import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import StatsGrid from '../components/dashboard/StatsGrid';
import PendingApprovals from '../components/dashboard/PendingApprovals';
import RecentReports from '../components/dashboard/RecentReports';
import QuickActions from '../components/dashboard/QuickActions';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import Toast from '../components/common/Toast';
import { useDashboard } from '../hooks/useDashboard';

const AdminDashboard = ({ onNavigate }) => {
  const { 
    stats, approvals, recentReports, activities, loading, toast,
    handleApproveAd, handleRejectAd 
  } = useDashboard();

  return (
    <AdminLayout onNavigate={onNavigate} activePage="dashboard">
      {toast && <Toast message={toast.message} type={toast.type} />}
      
      {loading ? (
        <div className="flex justify-center p-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <StatsGrid stats={stats} />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-6">
              <PendingApprovals 
                approvals={approvals} 
                onApprove={handleApproveAd} 
                onReject={handleRejectAd}
                onNavigate={onNavigate} 
              />
              <RecentReports 
                reports={recentReports} 
                onNavigate={onNavigate} 
              />
            </div>
            <div className="flex flex-col gap-6">
              <QuickActions onNavigate={onNavigate} />
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;