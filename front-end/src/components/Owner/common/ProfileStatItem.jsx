import React from 'react';

const ProfileStatItem = ({ number, label }) => (
    <div className="stat-item text-center p-4 rounded-xl" style={{ backgroundColor: "var(--light)" }}>
        <div className="stat-number text-3xl font-bold mb-0.5" style={{ color: "var(--primary)" }}>
            {number}
        </div>
        <div className="stat-label text-sm" style={{ color: "var(--muted)" }}>
            {label}
        </div>
    </div>
);

export default ProfileStatItem;