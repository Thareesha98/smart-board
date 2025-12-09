// src/pages/DashboardPage.jsx
import Card from '../components/UI/Card.jsx';
import StatCard from '../components/Dashboard/StatCard.jsx';
import ActivityFeed from '../components/Dashboard/ActivityFeed.jsx';
import Button from '../components/UI/Button.jsx';

// Mock Data
const mockStats = [
  { id: 1, title: 'Total Users', value: '4,520', change: '+12% this month', icon: 'users', color: 'info' },
  { id: 2, title: 'Pending Ads', value: '18', change: '3 new', icon: 'home', color: 'accent' },
  { id: 3, title: 'Reports Received', value: '7', change: '2 urgent', icon: 'exclamation-triangle', color: 'error' },
  { id: 4, title: 'Monthly Revenue', value: '$5.2k', change: '+5% last week', icon: 'dollar-sign', color: 'success' },
];

const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-text-dark mb-6">Admin Dashboard</h2>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map(stat => <StatCard key={stat.id} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals & Reports */}
        <Card title="Review Queue" className="lg:col-span-2">
          <div className="space-y-4">
            <p className="text-text-muted">You have 18 boarding advertisements and 7 reports awaiting review.</p>
            <div className="flex space-x-3">
                <Button variant="accent" to="/ads">Approve Ads (18)</Button>
                <Button variant="error" to="/reports">Review Reports (7)</Button>
            </div>
            <div className='mt-6 h-64 bg-background-light rounded-card flex items-center justify-center text-text-muted'>
                [Placeholder for Analytics Chart (e.g., Pending vs. Approved)]
            </div>
          </div>
        </Card>

        {/* Recent Activity Feed */}
        <ActivityFeed />
      </div>
    </div>
  );
};

export default DashboardPage;