import React, { useState, useEffect } from 'react';
import './../../styles/AdminDashboard.css';
import Sidebar from '../../components/admin/Sidebar';
import ContentHeader from '../../components/admin/ContentHeader';
import StatWidget from '../../components/admin/StatWidget';
import DashboardCard from '../../components/admin/DashboardCard';
import ApprovalItem from '../../components/admin/ApprovalItem';
import ReportItem from '../../components/admin/ReportItem';
import QuickAction from '../../components/admin/QuickAction';
import HealthItem from '../../components/admin/HealthItem';
import ActivityItem from '../../components/admin/ActivityItem';
import NotificationToast from '../../components/admin/NotificationToast';

const AdminDashboard = () => {
  const [pendingAds, setPendingAds] = useState(12);
  const [pendingReports, setPendingReports] = useState(8);
  const [notifications, setNotifications] = useState(5);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - In real app, fetch from API
  const [statsData, setStatsData] = useState([
    { id: 1, icon: 'users', title: 'Total Users', value: '2,847', trend: '12% this month', positive: true },
    { id: 2, icon: 'home', title: 'Active Boardings', value: '156', trend: '8% this month', positive: true },
    { id: 3, icon: 'hand-holding-usd', title: 'Revenue', value: '$24,580', trend: '15% this month', positive: true },
    { id: 4, icon: 'flag', title: 'Pending Actions', value: '20', trend: 'Requires attention', positive: false }
  ]);

  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, title: 'Sunset Hostel', submittedBy: 'Kamal Perera', time: '2 days ago' },
    { id: 2, title: 'City View Apartments', submittedBy: 'Maria Silva', time: '1 day ago' },
    { id: 3, title: 'Green Valley Rooms', submittedBy: 'Rajitha Fernando', time: '3 hours ago' }
  ]);

  const [recentReports, setRecentReports] = useState([
    { id: 1, type: 'urgent', icon: 'exclamation-triangle', title: 'Safety Concern', description: 'Student reported unsafe conditions', priority: 'High', time: '1 hour ago' },
    { id: 2, type: 'warning', icon: 'flag', title: 'Payment Dispute', description: 'Owner reported unpaid rent', priority: 'Medium', time: '3 hours ago' },
    { id: 3, type: 'info', icon: 'info-circle', title: 'Misinformation', description: 'False advertisement complaint', priority: 'Low', time: '5 hours ago' }
  ]);

  const [quickActions, setQuickActions] = useState([
    { id: 1, icon: 'user-cog', label: 'Manage Users', action: 'manageUsers' },
    { id: 2, icon: 'home', label: 'Ad Management', action: 'manageAds' },
    { id: 3, icon: 'chart-line', label: 'View Analytics', action: 'viewAnalytics' },
    { id: 4, icon: 'cogs', label: 'System Settings', action: 'systemSettings' },
    { id: 5, icon: 'ad', label: 'Create Ad', action: 'createThirdPartyAd' },
    { id: 6, icon: 'database', label: 'Backup System', action: 'backupSystem' }
  ]);

  const [systemHealth, setSystemHealth] = useState([
    { id: 1, label: 'Server Uptime', value: '99.8%', percentage: 99.8, status: 'excellent' },
    { id: 2, label: 'Database Performance', value: '98%', percentage: 98, status: 'good' },
    { id: 3, label: 'API Response Time', value: '120ms', percentage: 95, status: 'good' },
    { id: 4, label: 'Storage Usage', value: '65%', percentage: 65, status: 'warning' }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'success', icon: 'check', description: 'Admin User approved "Sunrise Hostel"', time: '2 minutes ago' },
    { id: 2, type: 'warning', icon: 'ban', description: 'System suspended user "john_doe"', time: '15 minutes ago' },
    { id: 3, type: 'info', icon: 'user-plus', description: 'New registration: Sarah Johnson (Student)', time: '1 hour ago' },
    { id: 4, type: 'primary', icon: 'home', description: 'New boarding listed: Ocean View Apartments', time: '2 hours ago' }
  ]);

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleApprove = (id) => {
    setPendingAds(prev => prev - 1);
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    setToast({ 
      type: 'success', 
      message: 'Ad approved successfully!',
      show: true
    });
  };

  const handleReject = (id) => {
    setPendingAds(prev => prev - 1);
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    setToast({ 
      type: 'error', 
      message: 'Ad has been rejected.',
      show: true
    });
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
    setToast({
      type: 'info',
      message: `Initiating ${action}...`,
      show: true
    });
  };

  const handleInvestigateReport = (id) => {
    console.log('Investigating report:', id);
    setToast({
      type: 'warning',
      message: 'Opening report details...',
      show: true
    });
  };

  const closeToast = () => {
    setToast(null);
  };

  if (loading) {
    return (
      <div className="admin-dashboard loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Sidebar 
        pendingAds={pendingAds}
        pendingReports={pendingReports}
      />
      
      <main className="main-content">
        <ContentHeader 
          notifications={notifications}
          onlineUsers={247}
        />
        
        {/* Stats Overview Section */}
        <section className="stats-overview">
          <div className="widget-grid">
            {statsData.map(stat => (
              <StatWidget 
                key={stat.id}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
                positive={stat.positive}
              />
            ))}
          </div>
        </section>
        
        {/* Main Dashboard Content */}
        <section className="dashboard-content">
          <div className="content-grid">
            {/* Left Column */}
            <div className="content-column">
              {/* Pending Approvals Card */}
              <DashboardCard 
                title="Pending Approvals"
                viewAllLink="/admin/ads"
              >
                <div className="approval-list">
                  {pendingApprovals.map(item => (
                    <ApprovalItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      submittedBy={item.submittedBy}
                      time={item.time}
                      onApprove={() => handleApprove(item.id)}
                      onReject={() => handleReject(item.id)}
                    />
                  ))}
                </div>
              </DashboardCard>
              
              {/* Recent Reports Card */}
              <DashboardCard 
                title="Recent Reports"
                viewAllLink="/admin/reports"
              >
                <div className="report-list">
                  {recentReports.map(report => (
                    <ReportItem
                      key={report.id}
                      type={report.type}
                      icon={report.icon}
                      title={report.title}
                      description={report.description}
                      priority={report.priority}
                      time={report.time}
                      onInvestigate={() => handleInvestigateReport(report.id)}
                    />
                  ))}
                </div>
              </DashboardCard>
            </div>
            
            {/* Right Column */}
            <div className="content-column">
              {/* Quick Actions Card */}
              <DashboardCard title="Quick Actions">
                <div className="quick-actions-grid">
                  {quickActions.map(action => (
                    <QuickAction
                      key={action.id}
                      icon={action.icon}
                      label={action.label}
                      onClick={() => handleQuickAction(action.action)}
                    />
                  ))}
                </div>
              </DashboardCard>
              
              {/* System Health Card */}
              <DashboardCard title="System Health">
                <div className="health-stats">
                  {systemHealth.map(health => (
                    <HealthItem
                      key={health.id}
                      label={health.label}
                      value={health.value}
                      percentage={health.percentage}
                      status={health.status}
                    />
                  ))}
                </div>
              </DashboardCard>
              
              {/* Recent Activity Card */}
              <DashboardCard title="Recent Activity">
                <div className="activity-feed">
                  {recentActivities.map(activity => (
                    <ActivityItem
                      key={activity.id}
                      type={activity.type}
                      icon={activity.icon}
                      description={activity.description}
                      time={activity.time}
                    />
                  ))}
                </div>
              </DashboardCard>
            </div>
          </div>
        </section>
      </main>
      
      {/* Notification Toast */}
      {toast && (
        <NotificationToast
          type={toast.type}
          message={toast.message}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default AdminDashboard;