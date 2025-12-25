import React from "react";
import { motion } from "framer-motion";
import { FaThLarge, FaList } from "react-icons/fa";

const ViewToggle = ({ viewMode, setViewMode }) => {
  // Base button styles
  // Added 'relative' and 'z-10' so text sits on top of the moving background
  const btnBase =
    "relative px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors duration-300 flex items-center gap-2 cursor-pointer z-10";

  return (
    <div className="bg-light/50 p-1 rounded-full flex gap-1 shadow-inner border border-light">
      
      {/* Grid Button */}
      <button
        onClick={() => setViewMode("grid")}
        className={`${btnBase} ${
          viewMode === "grid" ? "text-white" : "text-muted hover:text-text"
        }`}
      >
        {/* Sliding Background Animation */}
        {viewMode === "grid" && (
          <motion.div
            layoutId="activeViewToggle"
            className="absolute inset-0 bg-accent rounded-full shadow-md -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <FaThLarge className="text-xs" />
        <span>Grid</span>
      </button>

      {/* List Button */}
      <button
        onClick={() => setViewMode("list")}
        className={`${btnBase} ${
          viewMode === "list" ? "text-white" : "text-muted hover:text-text"
        }`}
      >
        {viewMode === "list" && (
          <motion.div
            layoutId="activeViewToggle" // Same ID allows framer-motion to morph the div from one button to the other
            className="absolute inset-0 bg-accent rounded-full shadow-md -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <FaList className="text-xs" />
        <span>List</span>
      </button>
    </div>
  );
};

export default ViewToggle;