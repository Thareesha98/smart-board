import React from 'react';

const AdStatsBar = ({ stats }) => {
  const statItems = [
    { label: 'Total Ads', value: stats.total, color: 'border-primary', icon: 'fa-ad', bg: 'bg-primary/10', text: 'text-primary' },
    { label: 'Pending', value: stats.pending, color: 'border-accent', icon: 'fa-clock', bg: 'bg-accent/10', text: 'text-accent' },
    { label: 'Approved', value: stats.approved, color: 'border-success', icon: 'fa-check-circle', bg: 'bg-success/10', text: 'text-success' },
    { label: 'Rejected', value: stats.rejected, color: 'border-red-alert', icon: 'fa-times-circle', bg: 'bg-red-alert/10', text: 'text-red-alert' },
  ];

  return (
    <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-3 lg:gap-4 mb-6 lg:mb-8">
      {statItems.map((item, idx) => (
        <div key={idx} className={`lg:flex-grow lg:min-w-[150px] bg-white p-3 lg:p-4 rounded-[20px] shadow-sm border-l-4 ${item.color} flex items-center gap-3 lg:gap-4`}>
          <div className={`hidden sm:flex p-2.5 lg:p-3 ${item.bg} rounded-full ${item.text}`}>
            <i className={`fas ${item.icon} text-sm lg:text-xl`}></i>
          </div>
          <div>
            <span className="block text-[10px] text-text-muted uppercase font-bold tracking-wider">{item.label}</span>
            <span className="text-lg lg:text-xl font-bold text-text-dark">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdStatsBar;