import React from 'react';
import StatCard from '../dashboard/StatCard';

const ThirdPartyStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <StatCard icon="fa-clock" label="Pending Review" value={stats.pending} />
      <StatCard icon="fa-layer-group" label="Active Campaigns" value={stats.activeCampaigns} />
      <StatCard 
        icon="fa-hand-holding-usd" 
        label="Total Revenue" 
        value={`Rs. ${stats.totalRevenue.toLocaleString()}`} 
      />
    </div>
  );
};

export default ThirdPartyStats;