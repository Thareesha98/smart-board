import React from 'react';

const StatWidget = ({ icon, title, mainDetail, subDetail, actionButton }) => {
  return (
    <div className="
      bg-card-bg p-6 rounded-large shadow-custom 
      flex gap-4 items-start transition-transform-shadow duration-300 
      hover:transform hover:-translate-y-1 hover:shadow-xl
    ">
      {/* Widget Icon */}
      <div className="
        bg-background-light p-4 rounded-card text-accent text-2xl 
        flex items-center justify-center
      ">
        <i className={icon}></i>
      </div>

      {/* Widget Content */}
      <div className="flex flex-col">
        <h3 className="text-text-muted text-lg font-semibold mb-2">{title}</h3>
        <div className="flex flex-col gap-1">
          <strong className="text-text-dark text-xl font-bold">{mainDetail}</strong>
          <span className="text-text-muted text-sm">{subDetail}</span>
          {actionButton && (
            <button 
              className="mt-3 py-2 px-4 text-sm font-semibold rounded-large bg-accent text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-lg focus:outline-none"
              onClick={actionButton.onClick}
            >
              {actionButton.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatWidget;