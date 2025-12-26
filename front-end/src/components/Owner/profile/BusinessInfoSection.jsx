import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaEdit } from 'react-icons/fa';

const BusinessInfoSection = ({ ownerData, onEdit }) => {
  const infoItems = [
    { label: 'Business Name', value: ownerData.businessName },
    { label: 'Owner Name', value: `${ownerData.firstName} ${ownerData.lastName}` },
    { label: 'Phone Number', value: ownerData.phone },
    { label: 'Email Address', value: ownerData.email },
    { label: 'Main Address', value: ownerData.address, fullWidth: true },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card-bg rounded-large shadow-custom p-6"
    >
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <FaBuilding />
          Business Information
        </h3>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 rounded-large font-semibold text-sm bg-background-light text-text-dark hover:bg-accent hover:text-white transition-all duration-300"
        >
          <FaEdit />
          Edit
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-large hover:bg-background-light/30 transition-colors duration-200 ${
              item.fullWidth ? 'md:col-span-2' : ''
            }`}
          >
            <label className="block text-sm font-semibold text-text-muted mb-1">
              {item.label}
            </label>
            <p className="text-text-dark">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default BusinessInfoSection;