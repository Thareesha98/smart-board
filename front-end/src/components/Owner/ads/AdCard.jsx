import React from "react";
import { motion } from "framer-motion";
import BoostButton from "./BoostButton";
import { 
  FaMapMarkerAlt, 
  FaRocket, 
  FaEdit,
  FaBed,
  FaUserFriends,
  FaMars,
  FaVenus,
  FaVenusMars,
  FaMoneyBillWave,
  FaCheckCircle
} from "react-icons/fa";

// --- Sub-Component: Feature Chip ---
// A clean, pill-shaped badge for key features
const FeatureChip = ({ icon, label, subLabel, colorClass }) => (
  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colorClass} bg-opacity-10 border-opacity-20`}>
    <div className="text-sm">{icon}</div>
    <div className="flex flex-col leading-none">
      <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
      <span className="text-xs font-black">{subLabel}</span>
    </div>
  </div>
);

const AdCard = ({ ad, onEdit, onBoostRedirect, getStatusBadgeStyle }) => {
  const isBoosted = ad.isBoosted || false;

  // Helper: Gender Icon Logic
  const getGenderIcon = (type) => {
    switch (type?.toUpperCase()) {
      case "MALE": return <FaMars />;
      case "FEMALE": return <FaVenus />;
      default: return <FaVenusMars />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className={`
        group relative flex flex-col md:flex-row bg-card-bg rounded-2xl overflow-hidden
        border transition-all duration-300
        ${isBoosted ? "border-accent ring-1 ring-accent/20 shadow-lg" : "border-light shadow-sm"}
      `}
    >
      {/* ================= LEFT: IMAGE SECTION ================= */}
      <div className="w-full md:w-72 h-56 md:h-auto relative shrink-0 overflow-hidden">
        <img
          src={ad.image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={ad.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
             <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-md backdrop-blur-md border border-white/20 ${getStatusBadgeStyle(ad.status)}`}>
                {ad.status}
             </span>
        </div>

        {/* Boosted Strip */}
        {isBoosted && (
          <div className="absolute bottom-0 w-full bg-accent/95 backdrop-blur-sm text-white py-2 flex justify-center items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-inner">
            <FaRocket /> Boosted Listing
          </div>
        )}
      </div>

      {/* ================= RIGHT: CONTENT SECTION ================= */}
      <div className="flex-1 p-5 md:p-7 flex flex-col">
        
        {/* 1. Header: Title & Rent */}
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-primary tracking-tight leading-tight line-clamp-1 group-hover:text-accent transition-colors">
              {ad.title}
            </h3>
            <div className="flex items-center text-xs text-muted font-bold tracking-wide">
              <FaMapMarkerAlt className="mr-1.5 text-accent/80" />
              <span className="truncate max-w-[220px]">{ad.address}</span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-2xl font-black text-accent tracking-tighter">
              <span className="text-xs text-muted font-bold mr-1">LKR</span>
              {ad.rent?.toLocaleString()} 
            </div>
            <div className="text-[10px] text-muted font-bold uppercase tracking-wider text-right">/ Month</div>
          </div>
        </div>

        <hr className="border-light my-4 opacity-50" />

        {/* 2. Key Features Grid (Replaces the Stats) */}
        <div className="grid grid-cols-3 gap-3 mb-6">
           {/* Feature 1: Gender */}
           <FeatureChip 
              icon={getGenderIcon(ad.genderType)}
              label="Gender"
              subLabel={ad.genderType || "Mixed"}
              colorClass="bg-blue-50 border-blue-100 text-blue-600"
           />
           
           {/* Feature 2: Type */}
           <FeatureChip 
              icon={<FaBed />}
              label="Type"
              subLabel={ad.boardingType || "Room"}
              colorClass="bg-purple-50 border-purple-100 text-purple-600"
           />

           {/* Feature 3: Slots */}
           <FeatureChip 
              icon={<FaUserFriends />}
              label="Availability"
              subLabel={`${ad.availableSlots || 0}/${ad.maxOccupants || 0} Open`}
              colorClass={ad.availableSlots > 0 ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-red-50 border-red-100 text-red-600"}
           />
        </div>

        {/* 3. Extra Info (Deposit) */}
        {ad.deposit > 0 && (
            <div className="flex items-center gap-2 mb-6 text-xs text-muted font-medium bg-light/50 p-2 rounded-lg w-fit">
                <FaMoneyBillWave className="text-gray-400"/> 
                <span>Security Deposit: <strong className="text-primary">LKR {ad.deposit.toLocaleString()}</strong></span>
            </div>
        )}

        {/* 4. Footer Actions - Pushed to bottom */}
        <div className="mt-auto flex gap-3">
          {ad.status !== "Pending" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onEdit(ad.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-light text-primary font-bold text-xs uppercase tracking-widest hover:border-primary hover:bg-primary hover:text-white transition-all"
            >
              <FaEdit /> Edit Details
            </motion.button>
          )}

          {/* Show Boost Button only if Active */}
          {ad.status === "Active" && (
             <div className="flex-1">
                <BoostButton isBoosted={isBoosted} onBoostClick={() => onBoostRedirect(ad.id)} />
             </div>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default AdCard;