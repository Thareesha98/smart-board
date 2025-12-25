import React from 'react';
import { motion } from 'framer-motion';

const BillingDetails = ({ details }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // h-full to fill space in grid
      className="bg-card-bg rounded-large shadow-custom p-6 h-full"
    >
      <h2 className="text-xl font-bold text-primary mb-6">Billing Details</h2>

      <div className="space-y-4">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
          >
            <span className="text-text-muted text-sm sm:text-base">{detail.label}</span>
            <span className="font-semibold text-text-dark text-sm sm:text-base text-right">{detail.value}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default BillingDetails;