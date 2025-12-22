import React from 'react';

const QuickActions = ({ onNavigate, onBackup }) => {
  const actions = [
    { label: 'Manage Users', icon: 'fa-user-cog', id: 'users' },
    { label: 'Ad Management', icon: 'fa-home', id: 'ads' },
    { label: 'View Analytics', icon: 'fa-chart-line', id: 'analytics' },
    { label: 'System Settings', icon: 'fa-cogs', id: 'settings' },
    { label: 'Create Ad', icon: 'fa-ad', id: 'thirdparty' },
  ];

  return (
    <div className="bg-card-bg rounded-large shadow-custom p-8">
      <h3 className="text-primary text-xl font-bold mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, idx) => (
          <button 
            key={idx} 
            onClick={() => onNavigate(action.id)} 
            className="flex items-center gap-4 px-5 py-4 border border-gray-100 rounded-[15px] text-text-dark font-bold hover:bg-accent hover:text-white hover:border-accent hover:shadow-[0_10px_20px_rgba(255,122,0,0.3)] hover:-translate-y-1 transition-all duration-300 group text-left"
          >
            <i className={`fas ${action.icon} w-6 text-center text-lg text-accent group-hover:text-white transition-colors`}></i>
            {action.label}
          </button>
        ))}
        <button 
          onClick={onBackup} 
          className="flex items-center gap-4 px-5 py-4 border border-gray-100 rounded-[15px] text-text-dark font-bold hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_10px_20px_rgba(216,76,56,0.3)] hover:-translate-y-1 transition-all duration-300 group text-left"
        >
          <i className="fas fa-database w-6 text-center text-lg text-primary group-hover:text-white transition-colors"></i>
          Database Backup
        </button>
      </div>
    </div>
  );
};

export default QuickActions;