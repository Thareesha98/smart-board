import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, FaUserTie, FaShieldAlt, FaCheckCircle,
  FaEnvelope, FaPhone, FaStar
} from 'react-icons/fa';

const InfoCards = ({ boarding, onContactOwner }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      // RESPONSIVE GRID LOGIC:
      // Mobile: 1 Col
      // Tablet (< 1024px): 2 Cols
      // Laptop (< 1400px): 3 Cols
      // Desktop (>= 1400px): 1 Col (Sidebar)
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1400px]:grid-cols-1 gap-6"
    >
      {/* 1. Boarding Details Card */}
      <InfoCard
        icon={FaHome}
        title="Details"
        content={
          <div className="space-y-3">
            <DetailItem label="Room Type" value={boarding.details.roomType} />
            <DetailItem label="Bathroom" value={boarding.details.bathroom} />
            <DetailItem label="Kitchen" value={boarding.details.kitchen} />
            <DetailItem label="Lease" value={boarding.details.leasePeriod} />
          </div>
        }
      />

      {/* 2. Owner Information Card */}
      <InfoCard
        icon={FaUserTie}
        title="Landlord"
        content={
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={boarding.owner.avatar}
                alt={boarding.owner.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-accent p-0.5 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-text-dark truncate" title={boarding.owner.name}>
                  {boarding.owner.name}
                </div>
                <div className="text-sm text-text-muted truncate">Verified Owner</div>
                <div className="flex items-center gap-1 text-xs text-yellow-500 font-medium mt-0.5">
                   <FaStar /> {boarding.owner.rating}
                   <span className="text-text-muted">({boarding.owner.reviews})</span>
                </div>
              </div>
            </div>
            
            {/* FIXED: Buttons now wrap if space is too small */}
            <div className="flex flex-wrap gap-2 mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactOwner}
                // min-w-[100px] forces it to stack if the card gets too narrow
                className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-bold text-xs bg-accent text-white hover:bg-primary transition-all whitespace-nowrap"
              >
                <FaEnvelope size={12} />
                Message
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContactOwner}
                className="flex-1 min-w-[80px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-bold text-xs border border-gray-300 text-text-dark hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                <FaPhone size={12} />
                Call
              </motion.button>
            </div>
          </div>
        }
      />

      {/* 3. Safety & Support Card */}
      <InfoCard
        icon={FaShieldAlt}
        title="Support"
        content={
          <div className="space-y-3">
            <SupportItem label="24/7 Support" />
            <SupportItem label="Verified Property" />
            <SupportItem label="Secure Payments" />
            <SupportItem label="Maintenance" />
          </div>
        }
      />
    </motion.div>
  );
};

const InfoCard = ({ icon: Icon, title, content }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="bg-white rounded-2xl p-5 shadow-custom transition-shadow duration-300 hover:shadow-lg border border-gray-100 h-full flex flex-col"
  >
    <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-50">
      <div className="w-8 h-8 rounded-full bg-background-light flex items-center justify-center text-accent flex-shrink-0">
         <Icon className="text-sm" />
      </div>
      <h4 className="text-lg font-bold text-text-dark truncate">{title}</h4>
    </div>
    <div className="flex-1">
        {content}
    </div>
  </motion.div>
);

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0 text-sm gap-2">
    <span className="text-text-muted whitespace-nowrap">{label}</span>
    <span className="text-text-dark font-semibold text-right truncate">{value}</span>
  </div>
);

const SupportItem = ({ label }) => (
  <div className="flex items-center gap-2 text-text-muted text-sm">
    <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
    <span className="truncate">{label}</span>
  </div>
);

export default InfoCards;