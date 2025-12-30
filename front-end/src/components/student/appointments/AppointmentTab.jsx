import React from 'react';

const AppointmentTab = ({ category, icon, label, count, active, onClick }) => {
  
  // Define active color styles based on category
  const getActiveStyles = () => {
    switch(category) {
        case 'upcoming': return 'bg-orange-500 text-white shadow-orange-200';
        case 'visited': return 'bg-blue-600 text-white shadow-blue-200';
        case 'selected': return 'bg-green-600 text-white shadow-green-200';
        case 'cancelled': return 'bg-red-500 text-white shadow-red-200';
        case 'rejected': return 'bg-red-900 text-white shadow-red-200'; // Dark Red
        default: return 'bg-gray-800 text-white';
    }
  };

  const activeClass = active ? getActiveStyles() : 'bg-gray-50 text-gray-500 hover:bg-gray-100';
  const badgeClass = active ? 'bg-white text-gray-800' : 'bg-gray-200 text-gray-600';

  return (
    <button
      className={`
        border-none p-4 rounded-2xl font-semibold 
        cursor-pointer transition-all duration-300 relative
        flex flex-col items-center gap-2 shadow-sm
        ${activeClass}
      `}
      onClick={() => onClick(category)}
    >
      <i className={`${icon} text-2xl mb-1 opacity-90`}></i>
      <span className="text-sm md:text-base">{label}</span>
      
      {count > 0 && (
          <span className={`
            absolute -top-2 -right-2 w-6 h-6 rounded-full font-bold text-xs
            flex items-center justify-center shadow-sm
            ${badgeClass}
          `}>
            {count}
          </span>
      )}
    </button>
  );
};

export default AppointmentTab;