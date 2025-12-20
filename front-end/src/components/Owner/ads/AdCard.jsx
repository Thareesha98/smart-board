import React, { useState } from "react";
import BoostButton from "./BoostButton";

/**
 * Sub-component for performance metrics
 */
const StatBox = ({ icon, label, value, textColorClass }) => (
  <div className="flex flex-col items-center text-center">
    <i className={`${icon} text-xl mb-1 ${textColorClass}`}></i>
    <strong className="text-xl font-bold text-text">{value}</strong>
    <span className="text-[10px] font-black uppercase tracking-widest text-muted">
      {label}
    </span>
  </div>
);

const AdCard = ({ ad, onEdit, onBoostRedirect, getStatusBadgeStyle }) => {
  // Check if ad is boosted (local state or from prop)
  const isBoosted = ad.isBoosted || false;

  const handleBoostClick = () => {
    onBoostRedirect(ad.id);
  };

  return (
    <div
      className={`flex flex-col md:flex-row p-4 md:p-6 rounded-boarding transition-all duration-300 hover:scale-[1.01] bg-card-bg shadow-custom border-2 ${
        isBoosted ? "border-primary" : "border-transparent"
      }`}
    >
      {/* Image & Status Section */}
      <div className="shrink-0 w-full md:w-48 h-40 md:h-48 relative mb-4 md:mb-0">
        <img
          src={
            ad.image ||
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=200&q=80"
          }
          alt={ad.title}
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Dynamic Status Badge */}
        <span
          className="absolute top-2 right-2 px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-full shadow-sm"
          style={getStatusBadgeStyle(ad.status)} // Retaining for dynamic status color logic
        >
          {ad.status}
        </span>

        {isBoosted && (
          <span className="absolute bottom-2 left-2 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-primary text-white shadow-lg animate-pulse-slow">
            <i className="fas fa-arrow-up mr-1"></i> BOOSTED
          </span>
        )}
      </div>

      {/* Details Section */}
      <div className="grow p-0 md:pl-8 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-black text-primary tracking-tight mb-1">
            {ad.title}
          </h3>
          <p className="flex items-center text-sm mb-4 text-muted font-medium italic">
            <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
            {ad.address}
          </p>
          <div className="text-3xl font-black text-accent mb-6">
            LKR {ad.rent.toLocaleString()}
            <span className="text-sm font-bold ml-1 text-muted tracking-normal">
              / month
            </span>
          </div>
        </div>

        {/* Performance Stats - Architectural Layout */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-light">
          <StatBox
            icon="fas fa-eye"
            label="Views"
            value={ad.views.toLocaleString()}
            textColorClass="text-info"
          />
          <StatBox
            icon="fas fa-calendar-alt"
            label="Appts"
            value={ad.appointments}
            textColorClass="text-accent"
          />
          <StatBox
            icon="fas fa-check-circle"
            label="Selected"
            value={ad.selected}
            textColorClass="text-success"
          />
        </div>

        {/* Actions Section */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex-1">
            {ad.status === "Active" && (
              <BoostButton
                isBoosted={isBoosted}
                onBoostClick={handleBoostClick}
              />
            )}
          </div>

          <div className="flex gap-3">
            {ad.status !== "Pending" && (
              <button
                className="px-6 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 bg-accent text-card-bg shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95"
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
