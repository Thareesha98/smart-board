import React from "react";

const ViewToggle = ({ viewMode, setViewMode }) => {
  // Base styles using your architectural typography
  const btnBase =
    "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2";

  return (
    <div className="bg-light/50 p-1 rounded-full flex gap-1 shadow-inner border border-light">
      {/* Grid Button */}
      <button
        onClick={() => setViewMode("grid")}
        className={`
          ${btnBase} 
          ${
            viewMode === "grid"
              ? "bg-accent text-white shadow-md scale-105"
              : "text-muted hover:text-text hover:bg-light/50"
          }
        `}
      >
        <i className="fas fa-th-large text-xs"></i>
        <span>Grid</span>
      </button>

      {/* List Button */}
      <button
        onClick={() => setViewMode("list")}
        className={`
          ${btnBase} 
          ${
            viewMode === "list"
              ? "bg-accent text-white shadow-md scale-105"
              : "text-muted hover:text-text hover:bg-light/50"
          }
        `}
      >
        <i className="fas fa-list text-xs"></i>
        <span>List</span>
      </button>
    </div>
  );
};

export default ViewToggle;
