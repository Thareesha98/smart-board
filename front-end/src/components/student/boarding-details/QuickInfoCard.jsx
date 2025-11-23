import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBed, FaRulerCombined, FaUsers, FaHeart, FaShareAlt, FaCalendarCheck } from 'react-icons/fa';

const QuickInfoCard = ({ boarding, onBookVisit }) => {
  const iconMap = {
    bed: FaBed,
    ruler: FaRulerCombined,
    users: FaUsers
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-large p-6 shadow-custom sticky top-32 space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-dark mb-2">{boarding.name}</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-500 text-lg">{'★'.repeat(5)}</span>
          <span className="font-semibold text-text-dark">{boarding.rating}</span>
          <span className="text-text-muted">({boarding.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-2 text-text-muted">
        <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
        <div>
          <p>{boarding.location.address}</p>
          <p className="text-sm">• {boarding.location.distance}</p>
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-b border-background-light py-4">
        <div className="text-4xl font-bold text-accent">
          ${boarding.price} <span className="text-base font-normal text-text-muted">/month</span>
        </div>
        <p className="text-sm text-text-muted mt-1">{boarding.priceNote}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {boarding.quickStats.map((stat, idx) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={idx} className="text-center bg-background-light rounded-xl p-3">
              <Icon className="text-2xl text-accent mx-auto mb-2" />
              <p className="text-xs text-text-dark">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBookVisit}
          className="flex-[2] bg-accent text-white py-3 rounded-large font-semibold flex items-center justify-center gap-2 hover:bg-primary transition-colors"
        >
          <FaCalendarCheck />
          Book Visit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 border-2 border-accent text-accent py-3 rounded-large font-semibold hover:bg-accent hover:text-white transition-all"
        >
          <FaHeart />
          Save
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 border-2 border-accent text-accent py-3 rounded-large font-semibold hover:bg-accent hover:text-white transition-all"
        >
          <FaShareAlt />
          Shear
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuickInfoCard;