import React, { useState } from 'react';
import StatWidget from './StatWidget';
import ChartCard from './ChartCard';
import StudentGrowthChart from './StudentGrowthChart';
import OwnerGrowthChart from './OwnerGrowthChart';
import ListingPerformanceChart from './ListingPerformanceChart';
import ReportsCategoryChart from './ReportsCategoryChart';
import RevenueGrowthChart from './RevenueGrowthChart';
import Button from '../UI/Button';
import useAnalyticsData from '../../hooks/useAnalyticsData';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const { analyticsData, loading, error, refreshData, changeDateRange } = useAnalyticsData(timeRange);

  const handleTimeRangeChange = async (newRange) => {
    setTimeRange(newRange);
    await changeDateRange(newRange);
  };

  const handleExportData = async () => {
    // Simulate export functionality
    console.log('Exporting analytics data...');
    alert('Export functionality would be implemented here. Data would be exported in CSV format.');
  };

  if (loading && !analyticsData) {
    return (
      <div className="flex justify-center items-center py-20">
        <i className="fas fa-spinner fa-spin text-4xl text-primary"></i>
        <span className="ml-3 text-text-dark">Loading analytics data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card-bg p-8 rounded-card shadow-custom text-center">
        <i className="fas fa-exclamation-triangle text-4xl text-error mb-4"></i>
        <h3 className="text-xl font-bold text-text-dark mb-2">Error Loading Data</h3>
        <p className="text-text-muted mb-4">{error}</p>
        <Button onClick={refreshData} variant="primary">
          <i className="fas fa-redo mr-2"></i>
          Retry
        </Button>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-chart-line text-4xl text-text-muted mb-4"></i>
        <h3 className="text-xl font-bold text-text-dark mb-2">No Analytics Data</h3>
        <p className="text-text-muted mb-4">Unable to load analytics data. Please try again.</p>
        <Button onClick={refreshData} variant="primary">
          Refresh
        </Button>
      </div>
    );
  }

  const { currentMetrics, timeSeriesData, categoricalData, topPerformers } = analyticsData;

  return (
    <div className="space-y-6">
      {/* Header with Time Range Filter and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-text-muted">Time Range:</span>
          <div className="flex flex-wrap gap-2">
            {['daily', 'weekly', 'monthly', 'quarterly'].map((range) => (
              <Button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                variant={timeRange === range ? 'primary' : 'outline'}
                size="sm"
                className="capitalize"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleExportData} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <i className="fas fa-download"></i>
            <span className="hidden sm:inline">Export Data</span>
          </Button>
          <Button 
            onClick={refreshData} 
            variant="primary" 
            className="flex items-center gap-2"
          >
            <i className="fas fa-redo"></i>
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="bg-card-bg rounded-card shadow-custom p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${currentMetrics.systemStatus === 'online' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
              <i className={`fas fa-circle text-xs ${currentMetrics.systemStatus === 'online' ? 'animate-pulse' : ''}`}></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-muted">System Status</p>
              <p className={`font-bold capitalize ${currentMetrics.systemStatus === 'online' ? 'text-success' : 'text-error'}`}>
                {currentMetrics.systemStatus}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <p className="text-sm font-semibold text-text-muted">Online Users</p>
              <p className="text-lg font-bold text-text-dark">{currentMetrics.onlineUsers}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-text-muted">Occupancy Rate</p>
              <p className="text-lg font-bold text-success">{currentMetrics.occupancyRate}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-text-muted">Avg Rating</p>
              <p className="text-lg font-bold text-warning">{currentMetrics.avgRating}/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatWidget
          title="Total Users"
          value={currentMetrics.totalUsers || '0'}
          icon="users"
          trend={`+${currentMetrics.monthlyGrowth || 0}% from last month`}
          trendType="positive"
        />
        <StatWidget
          title="Active Listings"
          value={currentMetrics.activeListings || '0'}
          icon="home"
          trend={`+${currentMetrics.listingGrowth || 0}% from last month`}
          trendType="positive"
        />
        <StatWidget
          title="Platform Revenue"
          value={`Rs. ${currentMetrics.platformRevenue || '0'}`}
          icon="money-bill-wave"
          trend={`+${currentMetrics.revenueGrowth || 0}% from last month`}
          trendType="positive"
        />
      </div>

      {/* Pending Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card-bg rounded-card shadow-custom p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-dark">Pending Actions</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Requires Attention</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background-light/50 rounded-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 text-accent rounded-full">
                  <i className="fas fa-home"></i>
                </div>
                <div>
                  <p className="font-semibold text-text-dark">Pending Ads</p>
                  <p className="text-sm text-text-muted">Awaiting approval</p>
                </div>
              </div>
              <span className="text-lg font-bold text-accent">{currentMetrics.pendingAds || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background-light/50 rounded-card">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-error/20 text-error rounded-full">
                  <i className="fas fa-flag"></i>
                </div>
                <div>
                  <p className="font-semibold text-text-dark">Pending Reports</p>
                  <p className="text-sm text-text-muted">Needs investigation</p>
                </div>
              </div>
              <span className="text-lg font-bold text-error">{currentMetrics.pendingReports || 0}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-card-bg rounded-card shadow-custom p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-dark">Quick Stats</h3>
            <i className="fas fa-info-circle text-text-muted"></i>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-background-light/30 rounded-card">
              <p className="text-2xl font-bold text-primary">{currentMetrics.onlineUsers || '0'}</p>
              <p className="text-sm text-text-muted">Online Now</p>
            </div>
            <div className="text-center p-3 bg-background-light/30 rounded-card">
              <p className="text-2xl font-bold text-success">{currentMetrics.occupancyRate || 0}%</p>
              <p className="text-sm text-text-muted">Occupancy Rate</p>
            </div>
            <div className="text-center p-3 bg-background-light/30 rounded-card">
              <p className="text-2xl font-bold text-warning">{currentMetrics.avgRating || '0'}</p>
              <p className="text-sm text-text-muted">Avg Rating</p>
            </div>
            <div className="text-center p-3 bg-background-light/30 rounded-card">
              <p className="text-2xl font-bold text-info">99.8%</p>
              <p className="text-sm text-text-muted">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Growth Chart */}
        <ChartCard 
          title="Student Growth"
          legendItems={[
            { label: 'Students', color: '#D84C38' }
          ]}
        >
          <StudentGrowthChart data={timeSeriesData?.studentGrowth || []} />
        </ChartCard>

        {/* Owner Growth Chart */}
        <ChartCard 
          title="Owner Growth"
          legendItems={[
            { label: 'Owners', color: '#FF7A00' }
          ]}
        >
          <OwnerGrowthChart data={timeSeriesData?.ownerGrowth || []} />
        </ChartCard>

        {/* Listing Performance Chart */}
        <ChartCard 
          title="Listing Performance"
          legendItems={[
            { label: 'Approved', color: '#10B981' },
            { label: 'Pending', color: '#F59E0B' },
            { label: 'Rejected', color: '#EF4444' }
          ]}
        >
          <ListingPerformanceChart data={timeSeriesData?.listingPerformance || []} />
        </ChartCard>

        {/* Reports by Category Chart */}
        <ChartCard 
          title="Reports by Category"
          legendItems={[]}
        >
          <ReportsCategoryChart data={categoricalData?.reportsByCategory || []} />
        </ChartCard>

        {/* Revenue Growth Chart (Full Width) */}
        <ChartCard 
          title="Revenue Growth"
          legendItems={[
            { label: 'Revenue', color: '#FF7A00' },
            { label: 'Growth %', color: '#10B981', dashed: true }
          ]}
          className="lg:col-span-2"
        >
          <div className="h-72">
            <RevenueGrowthChart data={timeSeriesData?.revenueGrowth || []} />
          </div>
        </ChartCard>
      </div>

      {/* Top Performers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Boardings */}
        <div className="bg-card-bg rounded-card shadow-custom p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-text-dark">Top Boardings</h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {topPerformers?.topBoardings?.slice(0, 3).map((boarding, index) => (
              <div key={boarding.id} className="flex items-center justify-between p-3 hover:bg-background-light/30 rounded-card transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark">{boarding.name}</p>
                    <p className="text-xs text-text-muted">{boarding.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success">Rs. {boarding.revenue.toLocaleString()}</p>
                  <p className="text-xs text-text-muted">{boarding.occupancy}% occupancy</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-card-bg rounded-card shadow-custom p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-text-dark">User Distribution</h3>
            <i className="fas fa-users text-text-muted"></i>
          </div>
          <div className="space-y-4">
            {categoricalData?.userDistribution?.map((userType) => (
              <div key={userType.role} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    userType.role === 'Student' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
                  }`}>
                    <i className={`fas fa-${userType.role === 'Student' ? 'user-graduate' : 'user-tie'}`}></i>
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark">{userType.role}s</p>
                    <p className="text-sm text-text-muted">{userType.count.toLocaleString()} users</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-text-dark">{userType.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Performance */}
        <div className="bg-card-bg rounded-card shadow-custom p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-text-dark">System Performance</h3>
            <div className={`px-3 py-1 rounded-full ${
              analyticsData?.systemPerformance?.serverLoad < 60 ? 'bg-success/20 text-success' :
              analyticsData?.systemPerformance?.serverLoad < 80 ? 'bg-warning/20 text-warning' :
              'bg-error/20 text-error'
            }`}>
              <span className="text-sm font-semibold">{analyticsData?.systemPerformance?.serverLoad || 0}%</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-text-muted mb-1">
                <span>Uptime</span>
                <span>{analyticsData?.systemPerformance?.uptime || 99.8}%</span>
              </div>
              <div className="h-2 bg-background-light rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full" 
                  style={{ width: `${analyticsData?.systemPerformance?.uptime || 99.8}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-text-muted mb-1">
                <span>Response Time</span>
                <span>{analyticsData?.systemPerformance?.responseTime || 120}ms</span>
              </div>
              <div className="h-2 bg-background-light rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    (analyticsData?.systemPerformance?.responseTime || 120) < 150 ? 'bg-success' :
                    (analyticsData?.systemPerformance?.responseTime || 120) < 300 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-text-muted mb-1">
                <span>Error Rate</span>
                <span>{analyticsData?.systemPerformance?.errorRate || 0.2}%</span>
              </div>
              <div className="h-2 bg-background-light rounded-full overflow-hidden">
                <div 
                  className="h-full bg-error rounded-full" 
                  style={{ width: `${Math.min((analyticsData?.systemPerformance?.errorRate || 0.2) * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated & Info Footer */}
      <div className="bg-card-bg rounded-card shadow-custom p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <i className="fas fa-clock text-text-muted"></i>
            <span className="text-sm text-text-muted">
              Data last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-xs text-text-muted">Good Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <span className="text-xs text-text-muted">Needs Attention</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error"></div>
              <span className="text-xs text-text-muted">Critical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;