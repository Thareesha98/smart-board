import React from 'react';
import { Link } from 'react-router-dom';

const DashButton = ({ to, icon, label }) => (
  <Link
    to={to}
    className="dash-btn flex items-center gap-3 p-3 px-4 font-semibold rounded-[25px] transition duration-200 shadow-sm"
    style={{
      backgroundColor: "transparent",
      borderColor: "rgba(0, 0, 0, 0.05)",
      color: 'var(--text)',
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--accent)';
      e.currentTarget.style.color = "white";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 122, 0, 0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = 'var(--text)';
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
    }}
  >
    <i className={`${icon} w-5 text-center text-lg`}></i>
    <span>{label}</span>
  </Link>
);

export default DashButton;