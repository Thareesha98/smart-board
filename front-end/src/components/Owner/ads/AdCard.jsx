import React from "react";
import BoostButton from "./BoostButton";

/**
 * Sub-component for performance metrics
 * Optimized for mobile grids by reducing icon size and using fluid typography
 */
const StatBox = ({ icon, label, value, textColorClass }) => (
  <div className="flex flex-col items-center text-center px-1">
    <i className={`${icon} text-lg md:text-xl mb-1 ${textColorClass}`}></i>
    <strong className="text-lg md:text-xl font-bold text-text leading-tight">{value}</strong>
    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted mt-0.5">
      {label}
    </span>
  </div>
);

const AdCard = ({ ad, onEdit, onBoostRedirect, getStatusBadgeStyle }) => {
  const isBoosted = ad.isBoosted || false;

  const handleBoostClick = () => {
    onBoostRedirect(ad.id);
  };

  return (
    <div
      className={`
        flex flex-col md:flex-row p-4 md:p-6 rounded-report transition-all duration-300 
        bg-card-bg shadow-custom border-2 relative
        ${isBoosted ? "border-primary" : "border-transparent"}
        hover:scale-[1.01] active:scale-[0.99] md:active:scale-100
      `}
    >
      {/* 1. Image & Status Section - Full width on mobile, fixed width on desktop */}
      <div className="shrink-0 w-full md:w-48 lg:w-56 h-48 md:h-52 relative mb-5 md:mb-0">
        <img
          src={ad.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80"}
          alt={ad.title}
          className="w-full h-full object-cover rounded-2xl shadow-inner"
        />

        {/* Dynamic Status Badge */}
        <span
          className="absolute top-3 right-3 px-3 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg backdrop-blur-sm"
          style={getStatusBadgeStyle(ad.status)}
        >
          {ad.status}
        </span>

        {isBoosted && (
          <span className="absolute bottom-3 left-3 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full bg-primary text-white shadow-lg animate-pulse">
            <i className="fas fa-rocket mr-1"></i> BOOSTED
          </span>
        )}
      </div>

      {/* 2. Details Section - Adds padding only on desktop */}
      <div className="grow md:pl-8 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
            <h3 className="text-xl md:text-2xl font-black text-primary tracking-tight leading-tight">
              {ad.title}
            </h3>
            
            {/* Rent Price - High impact but scales for mobile */}
            <div className="text-2xl md:text-3xl font-black text-accent tracking-tighter">
              LKR {ad.rent.toLocaleString()}
              <span className="text-[10px] md:text-sm font-bold ml-1 text-muted lowercase tracking-normal">
                /mo
              </span>
            </div>
          </div>

          <p className="flex items-center text-xs md:text-sm text-muted font-medium italic mb-4">
            <i className="fas fa-map-marker-alt mr-2 text-accent shrink-0"></i>
            <span className="truncate">{ad.address}</span>
          </p>
        </div>

        {/* 3. Performance Stats - 3-column grid is safe for mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 py-4 my-4 border-y border-light bg-light/5 rounded-xl md:bg-transparent md:rounded-none">
          <StatBox icon="fas fa-eye" label="Views" value={ad.views.toLocaleString()} textColorClass="text-info" />
          <StatBox icon="fas fa-calendar-alt" label="Appts" value={ad.appointments} textColorClass="text-accent" />
          <StatBox icon="fas fa-check-circle" label="Selected" value={ad.selected} textColorClass="text-success" />
        </div>

        {/* 4. Actions Section - Stacks on very small screens */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
          <div className="w-full sm:w-auto">
            {ad.status === "Active" && (
              <BoostButton isBoosted={isBoosted} onBoostClick={handleBoostClick} />
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {ad.status !== "Pending" && (
              <button
                className="flex-1 sm:flex-none px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all bg-accent text-card-bg shadow-md active:scale-95 flex items-center justify-center"
                onClick={() => onEdit(ad.id)}
              >
                <i className="fas fa-edit mr-2"></i> Edit Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;