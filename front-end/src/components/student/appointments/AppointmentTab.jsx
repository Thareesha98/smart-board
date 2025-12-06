import React from 'react';

const AppointmentTab = ({ category, icon, label, count, active, onClick }) => {
  

  return (
    <button
      className={`
        bg-background-light border-none p-6 rounded-large font-semibold 
        text-text-muted cursor-pointer transition-transform duration-300 relative
        flex flex-col items-center gap-2 hover:bg-accent hover:text-white hover:-translate-y-0.5
        ${active ? 'bg-accent text-white shadow-accent-hover' : ''}
      `}
      onClick={() => onClick(category)}
    >
      <i className={`${icon} text-2xl mb-1`}></i>
      <span className="text-base">{label}</span>
      <span className={`
        absolute -top-2 -right-2 w-6 h-6 rounded-full font-bold text-xs
        flex items-center justify-center bg-primary text-white
      `}>
        {count}
      </span>
    </button>
  );
};

export default AppointmentTab;