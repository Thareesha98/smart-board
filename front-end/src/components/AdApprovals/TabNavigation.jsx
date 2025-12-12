// src/components/AdApprovals/TabNavigation.jsx
const tabs = [
  { key: 'pending', label: 'Pending Review', icon: 'hourglass-half' },
  { key: 'approved', label: 'Approved', icon: 'check-circle' },
  { key: 'rejected', label: 'Rejected', icon: 'times-circle' },
];

const TabNavigation = ({ currentTab, onTabChange, stats }) => {
  const getCount = (key) => {
    // Stats object keys align with tab keys (pending, approved, rejected)
    // We add a 'rejected' count to the stats object if not present
    const count = key === 'rejected' 
        ? stats.totalAds - (stats.pending + stats.approved) 
        : stats[key] || 0;
    return count > 0 ? `(${count})` : '';
  }

  return (
    <div className="flex border-b border-background-light overflow-x-auto mb-6">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex items-center space-x-2 py-3 px-4 text-sm font-medium transition-colors border-b-2 
            ${currentTab === tab.key 
              ? 'border-primary text-primary' 
              : 'border-transparent text-text-muted hover:text-text-dark'
            }`}
        >
          <i className={`fas fa-${tab.icon}`} />
          <span>{tab.label}</span>
          <span className="font-bold">{getCount(tab.key)}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;