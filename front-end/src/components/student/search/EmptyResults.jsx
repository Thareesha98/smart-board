import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const EmptyResults = ({ onClearFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-large shadow-custom p-12 text-center"
    >
      <FaSearch className="text-6xl text-text-muted mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-text-dark mb-2">No boardings found</h3>
      <p className="text-text-muted mb-6">Try adjusting your filters or search criteria</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClearFilters}
        className="bg-accent text-white px-6 py-3 rounded-large font-semibold"
      >
        Clear All Filters
      </motion.button>
    </motion.div>
  );
};

export default EmptyResults;