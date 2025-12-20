import React from 'react';

const ProfileStatItem = ({ number, label }) => (
    <div className="stat-item text-center p-4 rounded-xl bg-light transition-all duration-300 hover:shadow-md border border-transparent hover:border-accent/10">
        <div className="stat-number text-3xl font-black mb-0.5 text-primary tracking-tighter">
            {number}
        </div>
        <div className="stat-label text-[10px] font-bold uppercase tracking-widest text-muted">
            {label}
        </div>
    </div>
);

export default ProfileStatItem;