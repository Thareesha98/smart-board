// src/components/Dashboard/ActivityFeed.jsx
import Card from '../UI/Card.jsx';

const mockActivity = [
    { id: 1, type: 'Payment', message: 'John Smith completed monthly payment.', time: '5 minutes ago', icon: 'credit-card', color: 'success' },
    { id: 2, type: 'Report', message: 'Owner reported student for violation.', time: '15 minutes ago', icon: 'ban', color: 'error' },
    { id: 3, type: 'Registration', message: 'New registration: Sarah Johnson (Student).', time: '1 hour ago', icon: 'user-plus', color: 'info' },
    { id: 4, type: 'Listing', message: 'New boarding listed: Ocean View Apartments.', time: '2 hours ago', icon: 'home', color: 'primary' },
];

const ActivityItem = ({ message, time, icon, color }) => {
    return (
        <div className="flex items-start space-x-3 py-3 border-b last:border-b-0 border-background-light">
            <div className={`p-2 rounded-full text-white bg-${color}`}>
                <i className={`fas fa-${icon} text-sm`} />
            </div>
            <div className="flex-1">
                <p className="text-text-dark text-sm">{message}</p>
                <span className="text-text-muted text-xs">{time}</span>
            </div>
        </div>
    );
};

const ActivityFeed = () => {
  return (
    <Card title="Recent System Activity" className="lg:col-span-1">
      <div className="space-y-1">
        {mockActivity.map(activity => (
            <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
      <div className='mt-4 text-center'>
          <a href="#" className="text-primary hover:text-primary-dark text-sm font-semibold">View Full Log</a>
      </div>
    </Card>
  );
};

export default ActivityFeed;