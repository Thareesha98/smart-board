import React from 'react';

const ReportFilters = ({ currentTab, setTab, category, setCategory }) => {
  const tabs = ['pending', 'investigating', 'resolved', 'dismissed'];
  
  const categories = [
    { id: 'all', label: 'All Reports', icon: 'fa-list' },
    { id: 'students', label: 'Students', icon: 'fa-graduation-cap' },
    { id: 'owners', label: 'Owners', icon: 'fa-user-tie' }
  ];

  return (
    <div className="bg-card-bg rounded-[20px] lg:rounded-large shadow-custom p-4 lg:p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* TAB NAVIGATION: 
            - -mx-4 px-4: Allows the scroll effect to go to the edge of the screen on mobile
            - no-scrollbar: Hides the bar while keeping the swipe action
        */}
        <div className="flex gap-6 border-b border-gray-100 overflow-x-auto no-scrollbar flex-nowrap -mx-4 px-4 lg:mx-0 lg:px-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setTab(tab)}
              className={`pb-4 px-1 font-bold capitalize whitespace-nowrap transition-all relative text-sm lg:text-base ${
                currentTab === tab ? 'text-accent' : 'text-text-muted hover:text-text-dark'
              }`}
            >
              {tab}
              {currentTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full animate-in fade-in slide-in-from-bottom-1" />
              )}
            </button>
          ))}
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] lg:text-xs font-bold transition-all border ${
                category === cat.id 
                ? 'bg-primary border-primary text-white shadow-md' 
                : 'bg-white border-gray-200 text-text-muted hover:border-primary/50'
              }`}
            >
              <i className={`fas ${cat.icon}`}></i>
              <span className="whitespace-nowrap">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;