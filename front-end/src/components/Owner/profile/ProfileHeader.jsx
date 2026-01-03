import React from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaCheckCircle, FaStar } from 'react-icons/fa';

const ProfileHeader = ({ ownerData, onChangeAvatar }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card-bg rounded-large shadow-custom p-8"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        {/* Avatar and Info */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full lg:w-auto">
          <div className="relative flex-shrink-0">
            <img
              src={ownerData.avatar}
              alt={`${ownerData.firstName} ${ownerData.lastName}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-accent"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onChangeAvatar}
              className="absolute bottom-1 right-1 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 shadow-lg"
            >
              <FaCamera />
            </motion.button>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-text-dark mb-2">
              {ownerData.businessName}
            </h2>
            <p className="text-lg text-text-muted mb-1">{ownerData.firstName} {ownerData.lastName}</p>
            <p className="text-accent font-semibold mb-3">Verified Owner</p>
            
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">
                <FaCheckCircle />
                Identity Verified
              </span>
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-semibold">
                <FaStar />
                Partner since 2023
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Owner Specific */}
        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
          {[
            { label: 'Active Ads', value: ownerData.stats.activeAds },
            { label: 'Current Tenants', value: ownerData.stats.tenants },
            { label: 'Total Visits', value: ownerData.stats.visits },
            { label: 'Avg Rating', value: ownerData.stats.rating },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 bg-background-light rounded-large"
            >
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProfileHeader;