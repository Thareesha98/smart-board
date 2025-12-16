import React, { useState } from "react";
import BoostButton from "./BoostButton"; // Import the new component

const StatBox = ({ icon, label, value, color }) => (
  <div className="flex flex-col items-center">
    <i className={`${icon} text-xl mb-1`} style={{ color }}></i>
    <strong className="text-xl font-bold" style={{ color: "var(--text)" }}>
      {value}
    </strong>
    <span className="text-xs" style={{ color: "var(--muted)" }}>
      {label}
    </span>
  </div>
);

const AdCard = ({ ad, onEdit, onBoostRedirect, getStatusBadgeStyle }) => {
  const [isBoosted] = useState(ad.isBoosted || false);

  const handleBoostClick = () => {
    onBoostRedirect(ad.id);
  };

  return (
    <div
      className="flex flex-col md:flex-row p-4 md:p-6 rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.01]"
      style={{
        backgroundColor: "var(--card-bg)",
        border: isBoosted ? "2px solid var(--primary)" : "none",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image & Status Section */}
      <div className="shrink-0 w-full md:w-48 h-40 md:h-auto relative mb-4 md:mb-0">
        <img
          src={ad.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=200&q=80"}
          alt={ad.title}
          className="w-full h-full object-cover rounded-2xl"
        />
        <span
          className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full"
          style={getStatusBadgeStyle(ad.status)}
        >
          {ad.status}
        </span>
        {isBoosted && (
          <span
            className="absolute bottom-2 left-2 px-3 py-1 text-xs font-semibold rounded-full"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            <i className="fas fa-arrow-up mr-1"></i> BOOSTED
          </span>
        )}
      </div>

      {/* Details Section */}
      <div className="grow p-0 md:pl-6">
        <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>{ad.title}</h3>
        <p className="flex items-center text-sm mb-3" style={{ color: "var(--muted)" }}>
          <i className="fas fa-map-marker-alt mr-2" style={{ color: "var(--accent)" }}></i>
          {ad.address}
        </p>
        <div className="text-3xl font-extrabold mb-4" style={{ color: "var(--accent)" }}>
          LKR {ad.rent.toLocaleString()}
          <span className="text-base font-medium ml-1" style={{ color: "var(--muted)" }}>/ month</span>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 border-t pt-4" style={{ borderColor: "var(--light)" }}>
          <StatBox icon="fas fa-eye" label="Views" value={ad.views.toLocaleString()} color={"var(--info)"} />
          <StatBox icon="fas fa-calendar-alt" label="Appts" value={ad.appointments} color={"var(--accent)"} />
          <StatBox icon="fas fa-check-circle" label="Selected" value={ad.selected} color={"var(--success)"} />
        </div>

        {/* Actions Section */}
        <div className="flex justify-between space-x-3 mt-4">
          {/* Use the separated component here */}
          {ad.status === "Active" ? (
          <BoostButton isBoosted={isBoosted} onBoostClick={handleBoostClick} />
        ) : (
          <div className="flex-1"></div> // Spacer to keep layout consistent
        )}

          <div className="flex space-x-3">
            <button
              className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300 shadow-md hover:scale-[1.05]"
              style={{ backgroundColor: "var(--accent)", color: "var(--card-bg)" }}
              onClick={() => onEdit(ad.id)}
            >
              <i className="fas fa-edit mr-2"></i> Edit Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;