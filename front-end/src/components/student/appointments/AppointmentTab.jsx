import React from "react";

const AppointmentTab = ({ category, icon, label, count, active, onClick }) => {
  const getActiveStyles = () => {
    switch (category) {
      case "upcoming":
        return "bg-orange-500 text-white shadow-orange-200";
      case "visited":
        return "bg-blue-600 text-white shadow-blue-200";
      case "selected":
        return "bg-green-600 text-white shadow-green-200";
      case "cancelled":
        return "bg-red-500 text-white shadow-red-200";
      case "rejected":
        return "bg-red-900 text-white shadow-red-200";
      default:
        return "bg-gray-800 text-white";
    }
  };

  const activeClass = active
    ? getActiveStyles()
    : "bg-gray-50 text-gray-500 hover:bg-gray-100";
  const badgeClass = active
    ? "bg-white text-gray-800"
    : "bg-gray-200 text-gray-600";

  return (
    <button
      className={`
        border-none rounded-xl font-semibold 
        cursor-pointer transition-all duration-300 relative
        flex flex-col items-center justify-center shadow-sm
        
        /* ✅ RESPONSIVE SIZING: Smaller on Mobile, Normal on Desktop */
        w-full
        p-2 gap-1         /* Mobile: Small padding & gap */
        sm:p-4 sm:gap-2   /* Desktop: Larger padding & gap */
        
        ${activeClass}
      `}
      onClick={() => onClick(category)}
    >
      {/* Icon: Smaller on mobile */}
      <i className={`${icon} text-lg sm:text-2xl mb-0.5 opacity-90`}></i>

      {/* Text: Smaller on mobile */}
      <span className="text-[10px] sm:text-sm md:text-base leading-tight">
        {label}
      </span>

      {/* Counter Badge: Scaled down */}
      {count > 0 && (
        <span
          className={`
            absolute -top-1.5 -right-1.5 w-5 h-5 text-[10px] 
            sm:-top-2 sm:-right-2 sm:w-6 sm:h-6 sm:text-xs
            rounded-full font-bold
            flex items-center justify-center shadow-sm
            ${badgeClass}
          `}
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default AppointmentTab;
