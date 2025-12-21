import React from 'react';
import { motion } from 'framer-motion';

const StatWidget = ({ icon, title, mainDetail, subDetail, actionButton }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      // STRICT STRUCTURE: Always flex-row (Icon Left, Content Right)
      // h-full ensures equal height in the grid
      className="bg-card-bg p-4 md:p-5 xl:p-6 rounded-large shadow-custom 
      flex flex-row gap-4 items-start transition-all duration-300 
      hover:shadow-xl h-full border border-gray-100"
    >

      {/* ICON - Fixed layout, never shrinks */}
      <div className="bg-background-light p-3 md:p-4 rounded-card text-accent 
      text-xl md:text-2xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      {/* CONTENT - Flex-1 to take remaining space */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* REMOVED 'truncate', ADDED 'break-words' */}
        <h3 className="text-text-muted text-sm font-semibold mb-1 break-words leading-tight">
          {title}
        </h3>

        <strong className="text-text-dark text-base md:text-lg xl:text-xl font-bold break-words leading-tight">
          {mainDetail}
        </strong>

        {subDetail && (
          <span className="text-text-muted text-xs md:text-sm mt-1 break-words leading-tight">
            {subDetail}
          </span>
        )}

        {actionButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.stopPropagation();
              actionButton.onClick();
            }}
            className="mt-3 py-2 px-4 text-xs md:text-sm font-semibold rounded-large 
            bg-accent text-white transition-all w-fit hover:bg-primary shadow-sm whitespace-nowrap"
          >
            {actionButton.label}
          </motion.button>
        )}
      </div>

    </motion.div>
  );
};

export default StatWidget;