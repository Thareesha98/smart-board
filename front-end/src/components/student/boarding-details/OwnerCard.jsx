import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

const OwnerCard = ({ owner, onContact }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-large p-6 shadow-custom"
    >
      {/* Header */}
      <div className="flex gap-4 mb-6">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="w-20 h-20 rounded-full object-cover border-3 border-accent"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-dark mb-1">{owner.name}</h3>
          {owner.verified && (
            <div className="flex items-center gap-2 text-green-600 text-sm mb-2">
              <FaCheckCircle />
              <span>Verified Owner</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-500">{'★'.repeat(5)}</span>
            <span className="text-text-muted">{owner.rating} ({owner.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-background-light mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{owner.stats.properties}</div>
          <div className="text-xs text-text-muted">Properties</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{owner.stats.years}</div>
          <div className="text-xs text-text-muted">Years</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{owner.stats.responseRate}%</div>
          <div className="text-xs text-text-muted">Response Rate</div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="space-y-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onContact('message')}
          className="w-full border-2 border-accent text-accent py-3 rounded-large font-semibold hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <FaEnvelope />
          Send Message
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onContact('call')}
          className="w-full border-2 border-accent text-accent py-3 rounded-large font-semibold hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <FaPhone />
          Call Owner
        </motion.button>
      </div>

      {/* Description */}
      <p className="text-sm text-text-muted leading-relaxed">{owner.description}</p>
    </motion.div>
  );
};

export default OwnerCard;