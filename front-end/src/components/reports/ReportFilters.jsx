import React from 'react';

const ReportFilters = ({ currentTab, setTab, category, setCategory }) => {
  const tabs = ['pending', 'investigating', 'resolved', 'dismissed'];
  
  const categories = [
    { id: 'all', label: 'All Reports', icon: 'fa-list' },
    { id: 'students', label: 'Students', icon: 'fa-graduation-cap' },
    { id: 'owners', label: 'Owners', icon: 'fa-user-tie' }
  ];

  return (
    <div className="bg-card-bg rounded-large shadow-custom p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex gap-6 border-b border-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setTab(tab)}
              className={`pb-4 px-2 font-bold capitalize whitespace-nowrap transition-all relative ${
                currentTab === tab ? 'text-accent' : 'text-text-muted hover:text-text-dark'
              }`}
            >
              {tab}
              {currentTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                category === cat.id 
                ? 'bg-primary border-primary text-white shadow-md' 
                : 'bg-white border-gray-200 text-text-muted hover:border-primary/50'
              }`}
            >
              <i className={`fas ${cat.icon}`}></i>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;