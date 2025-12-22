import React from 'react';

const StatCard = ({ icon, label, value, change, increase, subtext }) => {
  return (
    <div className="bg-card-bg p-6 rounded-[25px] shadow-custom hover:-translate-y-[5px] transition-transform duration-300 flex gap-4 items-start h-full">
      {/* Icon Wrapper */}
      <div className="bg-background-light p-4 rounded-[15px] text-accent text-2xl w-[60px] h-[60px] flex items-center justify-center shrink-0">
        <i className={`fas ${icon}`}></i>
      </div>
      
      {/* Content */}
      <div className="flex flex-col">
        {/* 1. Changed from 'uppercase' to 'first-letter:uppercase' logic.
          2. Applied 'tracking-tighter' to match HTML letter spacing.
        */}
        <h3 className="text-text-muted font-semibold mb-2 text-base tracking-tighter lowercase first-letter:uppercase">
          {label}
        </h3>
        
        {/* Decreased letter spacing on the large value to match HTML version */}
        <strong className="text-2xl text-text-dark block font-bold leading-none mb-1 tracking-tight">
          {value}
        </strong>
        
        <div className="text-sm text-text-muted flex items-center gap-2 mt-1">
          {change ? (
            <>
              <span className={`flex items-center gap-1 font-medium ${increase ? 'text-success' : 'text-red-alert'}`}>
                <i className={`fas fa-arrow-${increase ? 'up' : 'down'}`}></i>
                {change}
              </span>
              <span className="opacity-80">this month</span>
            </>
          ) : (
            <span className="opacity-80">{subtext}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;