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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
    >
      {/* Boarding Details Card */}
      <InfoCard
        icon={FaHome}
        title="Boarding Details"
        content={
          <div className="space-y-3">
            <DetailItem label="Room Type" value={boarding.details.roomType} />
            <DetailItem label="Bathroom" value={boarding.details.bathroom} />
            <DetailItem label="Kitchen" value={boarding.details.kitchen} />
            <DetailItem label="Lease Period" value={boarding.details.leasePeriod} />
          </div>
        }
      />

      {/* Owner Information Card */}
      <InfoCard
        icon={FaUserTie}
        title="Owner Information"
        content={
          <>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={boarding.owner.avatar}
                alt={boarding.owner.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent"
              />
              <div className="flex-1">
                <div className="font-bold text-text-dark">{boarding.owner.name}</div>
                <div className="text-sm text-text-muted">Verified Owner</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={12} />
                    ))}
                  </div>
                  <span className="text-xs text-text-muted">
                    {boarding.owner.rating} ({boarding.owner.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactOwner}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-large font-semibold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaEnvelope size={14} />
                Message
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContactOwner}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-large font-semibold text-sm border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaPhone size={14} />
                Call
              </motion.button>
            </div>
          </>
        }
      />

      {/* Safety & Support Card */}
      <InfoCard
        icon={FaShieldAlt}
        title="Safety & Support"
        content={
          <div className="space-y-3">
            <SupportItem label="24/7 Emergency Support" />
            <SupportItem label="Verified Property" />
            <SupportItem label="Secure Payments" />
            <SupportItem label="Maintenance Support" />
          </div>
        }
      />
    </motion.div>
  );
};

const InfoCard = ({ icon: Icon, title, content }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="bg-card-bg rounded-large p-6 shadow-custom transition-shadow duration-300 hover:shadow-xl"
  >
    <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
      <Icon className="text-accent text-xl" />
      <h4 className="text-lg font-bold text-text-dark">{title}</h4>
    </div>
    {content}
  </motion.div>
);

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="text-text-muted text-sm">{label}:</span>
    <span className="text-text-dark font-semibold">{value}</span>
  </div>
);

const SupportItem = ({ label }) => (
  <div className="flex items-center gap-3 text-text-muted">
    <FaCheckCircle className="text-success text-lg flex-shrink-0" />
    <span className="text-sm">{label}</span>
  </div>
);

export default InfoCards;