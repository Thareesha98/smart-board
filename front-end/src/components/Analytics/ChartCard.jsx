import React from 'react';

const ChartCard = ({ title, children, legendItems = [], className = '' }) => {
  return (
    <div className={`bg-card-bg rounded-card shadow-custom p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2 sm:mb-0">{title}</h3>
        {legendItems.length > 0 && (
          <div className="flex flex-wrap gap-3 text-sm">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ 
                    backgroundColor: item.color,
                    border: item.dashed ? `2px dashed ${item.color}` : 'none'
                  }}
                ></div>
                <span className="text-text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-64">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;