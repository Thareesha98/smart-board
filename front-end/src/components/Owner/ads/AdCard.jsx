import React from "react";
import { motion } from "framer-motion";
import BoostButton from "./BoostButton";
import { FaEye, FaCalendarAlt, FaCheckCircle, FaMapMarkerAlt, FaRocket, FaEdit } from "react-icons/fa";

const StatBox = ({ icon, label, value, textColorClass }) => (
  <div className="flex flex-col items-center text-center px-1">
    <div className={`${textColorClass} text-lg md:text-xl mb-1`}>{icon}</div>
    <strong className="text-lg md:text-xl font-bold text-text leading-tight">{value}</strong>
    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted mt-0.5">
      {label}
    </span>
  </div>
);

const AdCard = ({ ad, onEdit, onBoostRedirect, getStatusBadgeStyle }) => {
  const isBoosted = ad.isBoosted || false;

  return (
    <motion.div
      layout // 🔥 Enables smooth layout transitions during filtering
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 2 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={`
        flex flex-col md:flex-row p-4 md:p-6 rounded-report transition-colors duration-300 
        bg-card-bg shadow-custom border-2 relative
        ${isBoosted ? "border-primary" : "border-transparent"}
      `}
    >
      {/* 1. Image & Status Section */}
      <div className="shrink-0 w-full md:w-48 lg:w-56 h-48 md:h-52 relative mb-5 md:mb-0">
        <img
          src={ad.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80"}
          alt={ad.title}
          className="w-full h-full object-cover rounded-2xl shadow-inner"
        />

        <span
          className="absolute top-3 right-3 px-3 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg backdrop-blur-sm"
          style={getStatusBadgeStyle(ad.status)}
        >
          {ad.status}
        </span>

        {isBoosted && (
          <span className="absolute bottom-3 left-3 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full bg-primary text-white shadow-lg animate-pulse flex items-center gap-1">
            <FaRocket /> BOOSTED
          </span>
        )}
      </div>

      {/* 2. Details Section */}
      <div className="grow md:pl-8 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
            <h3 className="text-xl md:text-2xl font-black text-primary tracking-tight leading-tight">
              {ad.title}
            </h3>
            
            <div className="text-2xl md:text-3xl font-black text-accent tracking-tighter">
              LKR {ad.rent.toLocaleString()}
              <span className="text-[10px] md:text-sm font-bold ml-1 text-muted lowercase tracking-normal">
                /mo
              </span>
            </div>
          </div>

          <p className="flex items-center text-xs md:text-sm text-muted font-medium italic mb-4">
            <FaMapMarkerAlt className="mr-2 text-accent shrink-0" />
            <span className="truncate">{ad.address}</span>
          </p>
        </div>

        {/* 3. Performance Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 py-4 my-4 border-y border-light bg-light/5 rounded-xl md:bg-transparent md:rounded-none">
          <StatBox icon={<FaEye />} label="Views" value={ad.views.toLocaleString()} textColorClass="text-info" />
          <StatBox icon={<FaCalendarAlt />} label="Appts" value={ad.appointments} textColorClass="text-accent" />
          <StatBox icon={<FaCheckCircle />} label="Selected" value={ad.selected} textColorClass="text-success" />
        </div>

        {/* 4. Actions Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
          <div className="w-full sm:w-auto">
            {ad.status === "Active" && (
              <BoostButton isBoosted={isBoosted} onBoostClick={() => onBoostRedirect(ad.id)} />
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {ad.status !== "Pending" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-full bg-accent text-card-bg shadow-md flex items-center justify-center gap-2"
                onClick={() => onEdit(ad.id)}
              >
                <FaEdit /> Edit Listing
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdCard;