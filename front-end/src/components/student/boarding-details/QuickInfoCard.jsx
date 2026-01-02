import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBed,
  FaRulerCombined,
  FaUsers,
  FaHeart,
  FaShareAlt,
  FaCalendarCheck,
} from "react-icons/fa";

const QuickInfoCard = ({ boarding, onBookVisit }) => {
  const iconMap = {
    bed: FaBed,
    ruler: FaRulerCombined,
    users: FaUsers,
  };

  // ✅ FIX: Ensure boarding exists before rendering
  if (!boarding) return null;

  // ✅ FIX: Safe access for quickStats to prevent .map() crash
  const safeStats = boarding.quickStats || [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl p-6 shadow-custom border border-gray-100 w-full space-y-6"
    >
      {/* 1. Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-2 leading-tight">
          {boarding.name || "Boarding Name"}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
            <span className="text-yellow-500 text-base">★</span>
            <span className="font-bold text-text-dark">{boarding.rating || "New"}</span>
          </div>
          <span className="text-text-muted text-sm">
            ({boarding.reviewCount || 0} reviews)
          </span>
        </div>
      </div>

      {/* 2. Location Section */}
      <div className="flex items-start gap-3 text-text-muted bg-gray-50 p-3 rounded-xl">
        <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0 text-lg" />
        <div>
          <p className="text-text-dark font-medium text-sm sm:text-base leading-snug">
            {boarding.location?.address || "Address not available"}
          </p>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            {boarding.location?.distance || "Distance info unavailable"}
          </p>
        </div>
      </div>

      {/* 3. Price Section */}
      <div className="border-t border-b border-gray-100 py-4">
        <div className="flex flex-wrap items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-bold text-accent">
            LKR {boarding.price || "0"}
          </span>
          <span className="text-text-muted font-medium">/month</span>
        </div>
        {boarding.priceNote && (
          <p className="text-xs sm:text-sm text-green-600 font-medium mt-1 bg-green-50 inline-block px-2 py-0.5 rounded-full">
            {boarding.priceNote}
          </p>
        )}
      </div>

      {/* 4. Stats Section - FIXED CRASH HERE */}
      <div className="grid grid-cols-3 gap-3">
        {safeStats.length > 0 ? (
          safeStats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || FaBed; // Default icon fallback
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center bg-background-light rounded-xl p-3 hover:bg-gray-100 transition-colors"
              >
                <Icon className="text-2xl text-accent mb-2" />
                <p className="text-xs font-bold text-text-dark text-center">
                  {stat.label}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-text-muted col-span-3 text-center">No stats available</p>
        )}
      </div>

      {/* 5. Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBookVisit}
          className="flex-[1.3] bg-accent text-white py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:bg-primary transition-all flex items-center justify-center gap-2"
        >
          <FaCalendarCheck />
          Book Visit
        </motion.button>

        <div className="flex flex-1 gap-3">
          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 min-w-[80px] border-2 border-gray-100 bg-white text-gray-600 py-3.5 rounded-xl font-semibold shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <FaHeart />
            <span className="sm:hidden lg:inline text-xs">Save</span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 min-w-[80px] border-2 border-gray-100 bg-white text-gray-600 py-3.5 rounded-xl font-semibold shadow-sm hover:border-orange-200 hover:bg-orange-50 hover:text-accent hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <FaShareAlt />
            <span className="sm:hidden lg:inline text-xs">Share</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickInfoCard;