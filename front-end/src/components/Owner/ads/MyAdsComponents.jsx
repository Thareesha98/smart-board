import React from "react";
import { motion } from "framer-motion";
import { FaList, FaCheckCircle, FaClock, FaFileAlt, FaTimesCircle, FaClipboardList, FaPlus } from "react-icons/fa";

export const STATUS_CONFIG = {
  All: { colorClass: "bg-primary", icon: <FaList /> },
  Active: { colorClass: "bg-success", icon: <FaCheckCircle /> },
  Pending: { colorClass: "bg-info", icon: <FaClock /> },
  Draft: { colorClass: "bg-muted", icon: <FaFileAlt /> },
  
};

export const StatusTab = ({ status, count, currentFilter, setFilter }) => {
  const isActive = currentFilter === status;
  const theme = STATUS_CONFIG[status];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      // Responsive classes: smaller text/padding on mobile, larger on desktop
      className={`
        relative flex items-center justify-center 
        py-3 px-4 md:py-4 md:px-6 
        rounded-2xl md:rounded-3xl 
        transition-colors duration-300 w-full 
        font-bold text-sm md:text-base whitespace-nowrap
        ${
          isActive
            ? `${theme.colorClass} text-white shadow-md`
            : "bg-light text-text/70 bg-opacity-80 hover:bg-gray-200"
        }
      `}
      onClick={() => setFilter(status)}
    >
      <span className="flex items-center gap-2 z-10">
        {/* Icon hidden on small screens to save space, visible on md+ */}
        <span className="hidden md:block">{theme.icon}</span>
        {status}
      </span>

      {/* Notification Badge */}
      {count > 0 && (
        <span
          className={`
            absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 
            px-1.5 min-w-[18px] h-[18px] md:min-w-[20px] md:h-[20px]
            flex items-center justify-center
            text-[9px] md:text-[10px] font-black 
            rounded-full shadow-sm z-20
            ${
              isActive 
                ? "bg-white text-primary border-2 border-transparent" 
                : "bg-accent text-white"
            }
          `}
        >
          {count}
        </span>
      )}
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