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

export const EmptyState = ({ filter, onCreate }) => {
  // Dynamic text based on the current filter
  const messages = {
    All: {
      title: "No Properties Listed",
      desc: "You haven't added any boarding places yet. Start your journey by creating your first ad!",
      btnText: "Create First Listing"
    },
    Active: {
      title: "No Active Ads",
      desc: "Your ads are either pending approval or have been saved as drafts.",
      btnText: "Create New Ad"
    },
    Pending: {
      title: "All Caught Up!",
      desc: "You have no ads waiting for admin approval right now.",
      btnText: null // No button needed here usually, but consistent UI is good
    },
    Draft: {
      title: "No Drafts Found",
      desc: "Great job! All your rejected or draft ads have been handled.",
      btnText: "Create New Ad"
    }
  };

  const content = messages[filter] || messages["All"];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200"
    >
      {/* Inline SVG Illustration (House Search) */}
      <div className="bg-blue-50 p-6 rounded-full mb-6">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 22L17.66 17.66" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.5 13.5C11.5 13.5 14 11 14 8C14 5 11.5 3.5 10 3.5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11L9 11.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h3 className="text-xl md:text-2xl font-black text-primary tracking-tight mb-2">
        {content.title}
      </h3>
      
      <p className="text-muted text-sm md:text-base max-w-sm mb-8 leading-relaxed">
        {content.desc}
      </p>

      {/* Primary Action Button */}
      {content.btnText && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreate}
          className="px-8 py-3 rounded-full bg-accent text-white font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-xl hover:bg-accent-dark transition-all flex items-center gap-2"
        >
          <i className="fas fa-plus"></i>
          {content.btnText}
        </motion.button>
      )}
    </motion.div>
  );
};