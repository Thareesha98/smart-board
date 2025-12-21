import React from "react";

// Configuration for consistent status styling
// Note: We keep the keys matching the Tailwind config keys
export const STATUS_CONFIG = {
  All: { colorClass: "bg-primary", icon: "fas fa-list" },
  Active: { colorClass: "bg-success", icon: "fas fa-check-circle" },
  Pending: { colorClass: "bg-info", icon: "fas fa-clock" },
  Draft: { colorClass: "bg-muted", icon: "fas fa-file-alt" },
  Inactive: { colorClass: "bg-error", icon: "fas fa-times-circle" },
};

export const StatusTab = ({ status, count, currentFilter, setFilter }) => {
  const isActive = currentFilter === status;
  const theme = STATUS_CONFIG[status];

  return (
    <button
      className={`relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300 w-full font-semibold text-lg ${
        isActive
          ? `${theme.colorClass} text-white shadow-md scale-[1.05]`
          : "bg-light text-text bg-opacity-80 hover:bg-gray-200"
      }`}
      onClick={() => setFilter(status)}
    >
      <span>{status}</span>
      <span
        className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-black rounded-full shadow-sm text-white ${
          isActive ? "bg-primary" : "bg-accent"
        }`}
      >
        {count}
      </span>
    </button>
  );
};

export const EmptyState = ({ filter, onCreate }) => (
  <div className="text-center p-12 rounded-report shadow-custom bg-card-bg border border-light">
    <i className="fas fa-clipboard-list text-6xl mb-4 text-muted" />
    <h3 className="text-2xl font-black mb-2 text-text tracking-tight">
      No {filter} Listings Found
    </h3>
    <p className="text-base mb-6 text-muted italic">
      {filter === "All"
        ? "It looks like you haven't created any boarding advertisements yet. Start now!"
        : `You currently have no listings in the ${filter} status.`}
    </p>
    <button
      className="px-8 py-3 font-black rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95 bg-primary text-card-bg uppercase tracking-widest text-xs"
      onClick={onCreate}
    >
      <i className="fas fa-plus mr-2" /> Create Your First Ad
    </button>
  </div>
);
