import React from "react";
import { motion } from "framer-motion";
import { FaList, FaCheckCircle, FaClock, FaFileAlt, FaTimesCircle, FaClipboardList, FaPlus } from "react-icons/fa";

export const STATUS_CONFIG = {
  All: { colorClass: "bg-primary", icon: <FaList /> },
  Active: { colorClass: "bg-success", icon: <FaCheckCircle /> },
  Pending: { colorClass: "bg-info", icon: <FaClock /> },
  Draft: { colorClass: "bg-muted", icon: <FaFileAlt /> },
  Inactive: { colorClass: "bg-error", icon: <FaTimesCircle /> },
};

export const StatusTab = ({ status, count, currentFilter, setFilter }) => {
  const isActive = currentFilter === status;
  const theme = STATUS_CONFIG[status];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center p-3 rounded-2xl transition-colors duration-300 w-full font-semibold text-lg ${
        isActive
          ? `${theme.colorClass} text-white shadow-md`
          : "bg-light text-text bg-opacity-80 hover:bg-gray-200"
      }`}
      onClick={() => setFilter(status)}
    >
      <span className="flex items-center gap-2">
        {/* Render the icon if needed, currently just showing text for cleanliness */}
        {status}
      </span>
      <span
        className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-black rounded-full shadow-sm text-white ${
          isActive ? "bg-primary" : "bg-accent"
        }`}
      >
        {count}
      </span>
    </motion.button>
  );
};

export const EmptyState = ({ filter, onCreate }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center p-12 rounded-report shadow-custom bg-card-bg border border-light"
  >
    <div className="flex justify-center mb-4">
        <FaClipboardList className="text-6xl text-muted" />
    </div>
    <h3 className="text-2xl font-black mb-2 text-text tracking-tight">
      No {filter} Listings Found
    </h3>
    <p className="text-base mb-6 text-muted italic">
      {filter === "All"
        ? "It looks like you haven't created any boarding advertisements yet. Start now!"
        : `You currently have no listings in the ${filter} status.`}
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-3 font-black rounded-full shadow-md bg-primary text-card-bg uppercase tracking-widest text-xs flex items-center justify-center gap-2 mx-auto"
      onClick={onCreate}
    >
      <FaPlus /> Create Your First Ad
    </motion.button>
  </motion.div>
);