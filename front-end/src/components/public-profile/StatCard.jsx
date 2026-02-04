import React from 'react';

const StatCard = ({ label, value, color, subtext, icon: Icon }) => (
  <div className="bg-card-bg p-6 rounded-report shadow-custom border border-light flex items-center justify-between">
    <div>
      <h4 className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">{label}</h4>
      <p className={`text-3xl font-black ${color} mb-1`}>{value}</p>
      <p className="text-[10px] text-muted font-medium bg-light px-2 py-0.5 rounded-full inline-block">{subtext}</p>
    </div>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100`}>
      <Icon size={24} className={color} />
    </div>
  </div>
);

export default StatCard;