import React from "react";
import { Link } from "react-router-dom";

const DashButton = ({ to, icon, label }) => (
  <Link
    to={to}
    className="
      group flex items-center gap-3 p-3 px-4 rounded-report 
      transition-all duration-300 no-underline
      bg-transparent text-text border border-black/5 shadow-sm
      hover:bg-accent hover:text-white hover:-translate-y-0.5 hover:shadow-accent-hover
    "
  >
    {/* Icon with a subtle scale effect on hover */}
    <i
      className={`${icon} w-5 text-center text-lg transition-transform group-hover:scale-110`}
    ></i>

    {/* Label with architectural typography */}
    <span className="text-sm font-black uppercase tracking-tight">{label}</span>
  </Link>
);

export default DashButton;
