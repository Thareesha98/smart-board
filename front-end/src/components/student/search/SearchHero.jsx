import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';

const SearchHero = ({ 
  searchQuery, 
  setSearchQuery, 
  moveInDate, 
  setMoveInDate, 
  onSearch, 
  isSearching 
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-large p-8 mb-8 shadow-custom"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Find Your Perfect Boarding</h1>
        <p className="text-text-muted text-base md:text-lg mb-6">
          Discover verified, safe, and affordable boarding options near campus
        </p>
        
        <div className="bg-white p-4 md:p-6 rounded-large shadow-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="flex items-center gap-3 bg-background-light px-4 py-3 rounded-large border-2 border-transparent focus-within:border-accent transition-colors">
              <FaMapMarkerAlt className="text-accent text-xl flex-shrink-0" />
              <input 
                type="text"
                placeholder="Enter location or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none flex-1 text-text-dark w-full"
              />
            </div>

            <div className="flex items-center gap-3 bg-background-light px-4 py-3 rounded-large border-2 border-transparent focus-within:border-accent transition-colors">
              <FaCalendarAlt className="text-accent text-xl flex-shrink-0" />
              <input 
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-transparent outline-none flex-1 text-text-dark w-full"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSearch}
              disabled={isSearching}
              className="bg-accent text-white px-6 py-3 rounded-large font-semibold flex items-center justify-center gap-2 hover:bg-primary transition-colors disabled:opacity-50"
            >
              <FaSearch />
              {isSearching ? 'Searching...' : 'Search'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SearchHero;