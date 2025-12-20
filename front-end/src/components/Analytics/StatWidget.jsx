import React from 'react';

const StatWidget = ({ title, value, icon, trend, trendType = 'positive' }) => {
  const trendColors = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-info'
  };

  return (
    <div className="bg-card-bg p-6 rounded-card shadow-custom hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-background-light rounded-card text-primary">
          <i className={`fas fa-${icon} text-2xl`}></i>
        </div>
        <div className="flex-1">
          <h3 className="text-text-muted font-semibold mb-2">{title}</h3>
          <p className="text-3xl font-bold text-text-dark mb-2">{value}</p>
          <div className={`flex items-center ${trendColors[trendType]}`}>
            <i className={`fas fa-arrow-${trendType === 'positive' ? 'up' : 'down'} mr-2`}></i>
            <span className="text-sm font-medium">{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatWidget;