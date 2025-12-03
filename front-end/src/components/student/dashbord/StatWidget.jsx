import React from 'react';
import { motion } from 'framer-motion';

const StatWidget = ({ icon, title, mainDetail, subDetail, actionButton }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-card-bg p-4 md:p-5 xl:p-6 rounded-large shadow-custom 
      flex flex-col md:flex-row gap-4 items-start transition-all duration-300 
      hover:shadow-xl h-full"
    >

      {/* ICON */}
      <div className="bg-background-light p-3 md:p-4 rounded-card text-accent 
      text-xl md:text-2xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 w-full">
        <h3 className="text-text-muted text-sm md:text-base xl:text-lg font-semibold mb-1">
          {title}
        </h3>

        <strong className="text-text-dark text-base md:text-lg xl:text-xl font-bold">
          {mainDetail}
        </strong>

        <span className="text-text-muted text-xs md:text-sm">
          {subDetail}
        </span>

        {actionButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={actionButton.onClick}
            className="mt-3 py-2 px-3 md:px-4 
            text-xs md:text-sm font-semibold rounded-large 
            bg-accent text-white transition-all w-full md:w-auto hover:bg-primary"
          >
            {actionButton.label}
          </motion.button>
        )}
      </div>

    </motion.div>
  );
};

export default StatWidget;
