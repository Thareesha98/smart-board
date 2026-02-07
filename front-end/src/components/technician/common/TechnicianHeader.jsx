import React from "react";
import { FaBell } from "react-icons/fa";
import { useTechAuth } from "../../../context/technician/TechnicianAuthContext";

const TechnicianHeader = ({ title, subtitle }) => {
  const { currentTech } = useTechAuth();

  const displayName = currentTech?.fullName || "Technician";
  
  // 1. Reliable Image Source Logic
  const profileImageSrc = currentTech?.profileImageUrl
    ? `http://localhost:8086/uploads/${currentTech.profileImageUrl}`
    : `https://ui-avatars.com/api/?name=${displayName.replace(" ", "+")}&background=random`;

  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/70 backdrop-blur-sm p-6 rounded-large shadow-custom static md:sticky top-0 md:top-6 z-10">
      <div>
        <h1 className="text-primary text-2xl md:text-3xl font-bold mb-1">
          {title}
        </h1>
        <p className="text-text-muted">{subtitle}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer p-3 rounded-full bg-background-light text-text-dark hover:bg-accent hover:text-white transition-all">
          <FaBell className="text-xl" />
          <span className="absolute -top-1.5 -right-1.5 bg-red-alert text-white rounded-full w-5 h-5 text-xs flex items-center justify-center border-2 border-white">
            2
          </span>
        </div>

        {/* Profile Image Area */}
        <div className="flex items-center gap-3">
          <img
            src={profileImageSrc}
            alt="User"
            className="w-10 h-10 rounded-full object-cover border-2 border-accent shadow-sm bg-white"
            
            //  CRITICAL: If image fails (403/404), force switch to Initials
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = `https://ui-avatars.com/api/?name=${displayName.replace(" ", "+")}&background=random`;
            }}
          />
          
          {/* Optional: Show name next to pic on large screens */}
          <span className="hidden md:block font-bold text-gray-700 text-sm">
            {displayName.split(" ")[0]}
          </span>
        </div>
      </div>
    </header>
  );
};

export default TechnicianHeader;
