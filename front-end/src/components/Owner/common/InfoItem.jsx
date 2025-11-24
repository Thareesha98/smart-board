import React from 'react';

const InfoItem = ({ label, value, fullWidth = false }) => (
    <div className={`info-item flex flex-col gap-1 p-4 rounded-xl transition duration-300 ${fullWidth ? 'col-span-full' : ''}`}
         style={{ transitionProperty: 'background-color' }}
         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(232, 219, 199, 0.3)'}
         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
        <label className="font-semibold text-sm" style={{ color: "var(--muted)" }}>{label}</label>
        <p className="text-base" style={{ color: "var(--text)" }}>{value}</p>
    </div>
);

export default InfoItem;