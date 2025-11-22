import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFilter, FaWifi, FaSnowflake, FaParking, FaTshirt, 
  FaShieldAlt, FaCouch, FaSearch 
} from 'react-icons/fa';

const amenityIcons = {
  wifi: FaWifi,
  ac: FaSnowflake,
  parking: FaParking,
  laundry: FaTshirt,
  security: FaShieldAlt,
  furnished: FaCouch
};

const FiltersSidebar = ({ filters, onFilterChange, onClearAll, onApply }) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-large shadow-custom p-6 sticky top-24 h-fit"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-background-light">
        <h3 className="text-primary font-bold text-lg flex items-center gap-2">
          <FaFilter /> FILTERS
        </h3>
        <button 
          onClick={onClearAll}
          className="text-accent font-semibold text-sm hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-dark mb-3">Price Range</h4>
        <div className="text-center mb-3 font-semibold text-primary">
          ${filters.minPrice} - ${filters.maxPrice}
        </div>
        <div className="space-y-2">
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', parseInt(e.target.value))}
            className="w-full accent-accent"
          />
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      {/* Distance */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-dark mb-3">Distance from Campus</h4>
        <div className="space-y-2">
          {[
            { value: '1', label: 'Within 1 km' },
            { value: '3', label: 'Within 3 km' },
            { value: '5', label: 'Within 5 km' },
            { value: '10', label: 'Any distance' }
          ].map(option => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="distance" 
                value={option.value}
                checked={filters.distance === option.value}
                onChange={(e) => onFilterChange('distance', e.target.value)}
                className="accent-accent w-4 h-4"
              />
              <span className="text-sm text-text-dark">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-dark mb-3">Gender Preference</h4>
        <div className="space-y-2">
          {[
            { value: 'any', label: 'Any' },
            { value: 'female', label: 'Female Only' },
            { value: 'male', label: 'Male Only' }
          ].map(option => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="radio" 
                name="gender" 
                value={option.value}
                checked={filters.gender === option.value}
                onChange={(e) => onFilterChange('gender', e.target.value)}
                className="accent-accent w-4 h-4"
              />
              <span className="text-sm text-text-dark">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-dark mb-3">Amenities</h4>
        <div className="space-y-2">
          {Object.entries(amenityIcons).map(([key, Icon]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox"
                checked={filters.amenities.includes(key)}
                onChange={() => {
                  const newAmenities = filters.amenities.includes(key)
                    ? filters.amenities.filter(a => a !== key)
                    : [...filters.amenities, key];
                  onFilterChange('amenities', newAmenities);
                }}
                className="accent-accent w-4 h-4"
              />
              <Icon className="text-accent" />
              <span className="text-sm text-text-dark capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-dark mb-3">Room Type</h4>
        <div className="space-y-2">
          {['single', 'shared', 'apartment'].map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox"
                checked={filters.roomTypes.includes(type)}
                onChange={() => {
                  const newTypes = filters.roomTypes.includes(type)
                    ? filters.roomTypes.filter(t => t !== type)
                    : [...filters.roomTypes, type];
                  onFilterChange('roomTypes', newTypes);
                }}
                className="accent-accent w-4 h-4"
              />
              <span className="text-sm text-text-dark capitalize">{type} Room</span>
            </label>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onApply}
        className="w-full bg-accent text-white py-3 rounded-large font-semibold flex items-center justify-center gap-2 hover:bg-primary transition-colors"
      >
        <FaSearch />
        Apply Filters
      </motion.button>
    </motion.aside>
  );
};

export default FiltersSidebar;