import React from 'react';
import { motion } from 'framer-motion';
import { FaKey, FaLock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const AccountSection = ({ ownerData, onSecurity }) => {
  
  // Logic to display status based on backend boolean
  const statusElement = ownerData.verifiedOwner ? (
    <span className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-green-600 bg-green-100 rounded-full w-fit">
      <FaCheckCircle /> Verified
    </span>
  ) : (
    <span className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-yellow-600 bg-yellow-100 rounded-full w-fit">
      <FaExclamationCircle /> Pending Verification
    </span>
  );

  const accountItems = [
    { label: 'Login Email', value: ownerData.email },
    { label: 'Owner ID', value: `#${ownerData.id || '---'}` },
    { label: 'Bank Account Number', value: ownerData.paymentMethod || "Not set" },
    { label: 'Account Status', value: statusElement }, // Renders the component above
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-6 bg-card-bg rounded-large shadow-custom"
    >
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
        <h3 className="flex items-center gap-2 text-xl font-bold text-primary">
          <FaKey />
          Account Information
        </h3>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSecurity}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-large bg-background-light text-text-dark hover:bg-accent hover:text-white"
        >
          <FaLock />
          Security
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {accountItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 transition-colors duration-200 rounded-large hover:bg-background-light/30"
          >
            <label className="block mb-1 text-sm font-semibold text-text-muted">
              {item.label}
            </label>
            <div className="text-lg font-medium text-text-dark">
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AccountSection;