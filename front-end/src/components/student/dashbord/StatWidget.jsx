import React from 'react';
import { motion } from 'framer-motion';

const StatWidget = ({ icon, title, mainDetail, subDetail, actionButton }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-card-bg p-4 sm:p-6 rounded-large shadow-custom flex flex-col sm:flex-row gap-3 sm:gap-4 items-start transition-shadow duration-300 hover:shadow-xl h-full"
    >
      {/* Widget Icon - Responsive sizing */}
      <div className="bg-background-light p-3 sm:p-4 rounded-card text-accent text-xl sm:text-2xl flex items-center justify-center flex-shrink-0 w-12 h-12 sm:w-auto sm:h-auto">
        {icon}
      </div>

      {/* Widget Content */}
      <div className="flex flex-col flex-1 w-full">
        <h3 className="text-text-muted text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2">
          {title}
        </h3>
        <div className="flex flex-col gap-1">
          <strong className="text-text-dark text-base sm:text-lg lg:text-xl font-bold break-words">
            {mainDetail}
          </strong>
          <span className="text-text-muted text-xs sm:text-sm">
            {subDetail}
          </span>
          {actionButton && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 sm:mt-3 py-2 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-large bg-accent text-white transition-all duration-300 hover:bg-primary hover:shadow-lg focus:outline-none w-full sm:w-auto"
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