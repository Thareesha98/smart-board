import React from "react";
import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

const BoostButton = ({ isBoosted, onBoostClick }) => {
  // --- Boosted State (Read-Only / Active Listing) ---
  if (isBoosted) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-primary text-card-bg cursor-default shadow-lg opacity-90 border border-white/10"
      >
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }} // Pulse animation
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mr-2"
        >
          <FaBolt className="text-white" />
        </motion.span>
        Boosted
      </motion.button>
    );
  }

  // --- Active State (Actionable / Purchase Boost) ---
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-success text-card-bg shadow-md group border border-transparent hover:border-white/20"
      onClick={(e) => {
        e.stopPropagation(); // Prevent card clicks if card becomes interactive
        onBoostClick();
      }}
    >
      {/* Icon Animation on Hover */}
      <motion.span
        className="mr-2"
        animate={{ rotate: 0, scale: 1 }}
        whileHover={{ rotate: 15, scale: 1.2 }}
      >
        <FaBolt />
      </motion.span>
      Boost Ad
    </motion.button>
  );
};

export default BoostButton;