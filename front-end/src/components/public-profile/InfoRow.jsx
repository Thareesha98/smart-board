import React from 'react';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 py-3 border-b border-light last:border-0">
    <div className="w-8 h-8 rounded-lg bg-light flex items-center justify-center text-accent shrink-0">
      <Icon size={14} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-muted uppercase font-black tracking-widest mb-0.5">{label}</p>
      <p className="text-sm font-bold text-text truncate" title={value}>{value || "N/A"}</p>
    </div>
  </div>
);

export default InfoRow;