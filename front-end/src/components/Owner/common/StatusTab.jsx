import React from "react";

const StatusTab = ({ status, count, currentFilter, setFilter, style }) => {
  const isActive = currentFilter === status;

  return (
    <button
      className="category-tab flex flex-col items-center gap-1.5 p-6 rounded-[25px] font-semibold cursor-pointer transition duration-300 relative w-full"
      style={{
        backgroundColor: isActive ? style.color : "var(--light)",
        color: isActive ? "var(--card-bg)" : "var(--muted)",
        boxShadow: isActive ? `0 4px 12px ${style.color}80` : "var(--shadow)",
      }}
      onClick={() => setFilter(status)}
    >
      <i className={`${style.icon} text-2xl`}></i>
      <span className="text-base capitalize">{status}</span>
      <span
        className="tab-count absolute top-[-8px] right-[-8px] w-6 h-6 text-xs flex items-center justify-center font-bold rounded-full"
        style={{
          backgroundColor: isActive ? "var(--card-bg)" : "var(--primary)",
          color: isActive ? style.color : "var(--card-bg)",
        }}
      >
        {count}
      </span>
    </button>
  );
};

export default StatusTab;