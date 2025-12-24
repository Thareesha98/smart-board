import React from 'react';

const ProfileStatItem = ({ number, label }) => (
    <div className="stat-item text-center p-3 md:p-4 rounded-xl bg-light transition-all duration-300 hover:shadow-md border border-transparent hover:border-accent/10 flex flex-col justify-center">
        {/* Number: Scaled for impact across devices */}
        <div className="stat-number text-2xl md:text-3xl font-black mb-0.5 text-primary tracking-tighter leading-none">
            {number}
        </div>
        
        {/* Label: Tighter tracking and smaller size on mobile */}
        <div className="stat-label text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-widest text-muted/80 leading-tight">
            {label}
        </div>
    </div>
);

export default ProfileStatItem;