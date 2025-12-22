import React from 'react';

const ActivityFeed = ({ activities }) => {

  // Helper for icon colors
  const getIconStyles = (type) => {
    switch (type) {
      case 'success': return 'bg-success/10 text-success';
      case 'warning': return 'bg-yellow-500/10 text-yellow-600';
      case 'info':    return 'bg-info/10 text-info';
      case 'primary': return 'bg-accent/10 text-accent';
      default:        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="bg-card-bg rounded-large shadow-custom h-full">
      <div className="p-6 pb-4 border-b border-gray-100/50">
        <h3 className="text-primary text-xl font-bold">Recent Activity</h3>
      </div>
      
      <div className="p-6 flex flex-col gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-3 rounded-btn hover:bg-background-light transition-colors duration-300">
            {/* Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getIconStyles(activity.type)}`}>
              <i className={`fas ${activity.icon}`}></i>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <p className="text-text-dark text-sm mb-1">
                <strong className="text-primary">{activity.user}</strong> {activity.action}
              </p>
              <span className="text-text-muted text-xs block">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;