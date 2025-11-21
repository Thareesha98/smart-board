import React from 'react';
import { motion } from 'framer-motion';

const StatWidget = ({ icon, title, mainDetail, subDetail, actionButton }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-card-bg p-6 rounded-large shadow-custom flex gap-4 items-start transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Widget Icon */}
      <div className="bg-background-light p-4 rounded-card text-accent text-2xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      {/* Widget Content */}
      <div className="flex flex-col flex-1">
        <h3 className="text-text-muted text-lg font-semibold mb-2">{title}</h3>
        <div className="flex flex-col gap-1">
          <strong className="text-text-dark text-xl font-bold">{mainDetail}</strong>
          <span className="text-text-muted text-sm">{subDetail}</span>
          {actionButton && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 py-2 px-4 text-sm font-semibold rounded-large bg-accent text-white transition-all duration-300 hover:bg-primary hover:shadow-lg focus:outline-none"
              onClick={actionButton.onClick}
            >
              {actionButton.label}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatWidget;