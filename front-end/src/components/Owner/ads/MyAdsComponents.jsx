import React from "react";

// Configuration for consistent status styling
export const STATUS_CONFIG = {
  All: { color: "var(--primary)", icon: "fas fa-list" },
  Active: { color: "var(--success)", icon: "fas fa-check-circle" },
  Pending: { color: "var(--info)", icon: "fas fa-clock" },
  Draft: { color: "var(--muted)", icon: "fas fa-file-alt" },
  Inactive: { color: "var(--error)", icon: "fas fa-times-circle" },
};

export const StatusTab = ({ status, count, currentFilter, setFilter }) => {
  const isActive = currentFilter === status;
  const theme = STATUS_CONFIG[status] || { color: "var(--light)" };

  return (
    <button
      className={`relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300 w-full ${
        isActive ? "shadow-md scale-[1.05]" : "bg-opacity-80 hover:bg-gray-100"
      }`}
      style={{
        backgroundColor: isActive ? theme.color : "var(--light)",
        color: isActive ? "white" : "var(--text)",
      }}
      onClick={() => setFilter(status)}
    >
      <span className="font-semibold text-lg">{status}</span>
      <span
        className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full shadow-sm"
        style={{
          backgroundColor: isActive ? "var(--primary)" : "var(--accent)",
          color: "white",
        }}
      >
        {count}
      </span>
    </button>
  );
};

export const EmptyState = ({ filter, onCreate }) => (
  <div className="text-center p-12 rounded-3xl shadow-lg bg-(--card-bg) border border-gray-100">
    <i className="fas fa-clipboard-list text-6xl mb-4 text-(--muted)" />
    <h3 className="text-2xl font-bold mb-2 text-(--text)">
      No {filter} Listings Found
    </h3>
    <p className="text-base mb-6 text-(--muted)">
      {filter === "All"
        ? "It looks like you haven't created any boarding advertisements yet. Start now!"
        : `You currently have no listings in the ${filter} status.`}
    </p>
    <button
      className="px-8 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg bg-(--primary) text-(--card-bg)"
      onClick={onCreate}
    >
      <i className="fas fa-plus mr-2" /> Create Your First Ad
    </button>
  </div>
);
