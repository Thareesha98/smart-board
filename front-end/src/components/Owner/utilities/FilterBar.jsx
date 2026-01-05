import React from "react";

const FilterBar = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center px-4">
      {/* Search Input */}
      <div className="relative w-full md:w-96 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
          <i className="fas fa-search text-sm"></i>
        </div>
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full pl-12 pr-4 py-3 rounded-full 
            bg-white border border-light shadow-sm
            text-sm font-bold text-text placeholder:text-muted/50
            focus:outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent
            transition-all duration-300
          "
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex p-1 bg-white border border-light rounded-full shadow-sm">
        {["all", "pending", "updated"].map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`
              px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300
              ${
                filterStatus === status
                  ? "bg-text text-white shadow-md transform scale-105"
                  : "text-muted hover:bg-light hover:text-text"
              }
            `}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
