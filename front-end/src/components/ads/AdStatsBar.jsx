import React from 'react';

const AdStatsBar = ({ stats }) => {
  const statItems = [
    { label: 'Total Ads', value: stats.total, color: 'border-primary', icon: 'fa-ad', bg: 'bg-primary/10', textColor: 'text-primary' },
    { label: 'Pending', value: stats.pending, color: 'border-accent', icon: 'fa-clock', bg: 'bg-accent/10', textColor: 'text-accent' },
    { label: 'Approved', value: stats.approved, color: 'border-success', icon: 'fa-check-circle', bg: 'bg-success/10', textColor: 'text-success' },
    { label: 'Rejected', value: stats.rejected, color: 'border-red-alert', icon: 'fa-times-circle', bg: 'bg-red-alert/10', textColor: 'text-red-alert' },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {statItems.map((item, idx) => (
        <div key={idx} className={`flex-grow min-w-[150px] bg-white p-4 rounded-[20px] shadow-sm border-l-4 ${item.color} flex items-center gap-4`}>
          <div className={`p-3 ${item.bg} rounded-full ${item.textColor}`}>
            <i className={`fas ${item.icon} text-xl`}></i>
          </div>
          <div>
            <span className="block text-xs text-text-muted uppercase font-bold tracking-wider">{item.label}</span>
            <span className="text-xl font-bold text-text-dark">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdStatsBar;