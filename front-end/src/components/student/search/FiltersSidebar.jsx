import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilter, FaWifi, FaSnowflake, FaParking, FaTshirt, 
  FaShieldAlt, FaCouch, FaSearch, FaTimes 
} from 'react-icons/fa';

const amenityIcons = {
  wifi: FaWifi,
  ac: FaSnowflake,
  parking: FaParking,
  laundry: FaTshirt,
  security: FaShieldAlt,
  furnished: FaCouch
};

// ✅ Professional Dual-Thumb Range Slider Component
const DualRangeSlider = ({ min, max, minValue, maxValue, onChange }) => {
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  // ✅ UPDATED: Step size of 500 prevents numbers like 49999
  const step = 500; 
  // ✅ UPDATED: Gap of 1000 prevents handles from overlapping
  const minGap = 1000;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - minGap);
    onChange(value, maxValue);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + minGap);
    onChange(minValue, value);
  };

  return (
    <div className="relative pt-2 pb-4">
      {/* Price Display */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-background-light px-3 py-2 rounded-lg">
          <span className="text-xs text-text-muted block">Min</span>
          <span className="text-base sm:text-lg font-bold text-primary">LKR {minValue}</span>
        </div>
        <div className="h-px w-6 sm:w-8 bg-gray-300"></div>
        <div className="bg-background-light px-3 py-2 rounded-lg">
          <span className="text-xs text-text-muted block">Max</span>
          <span className="text-base sm:text-lg font-bold text-primary">LKR {maxValue}</span>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative h-2 mb-2">
        {/* Background Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
        
        {/* Active Track */}
        <div 
          className="absolute h-2 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-200"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`
          }}
        ></div>

        {/* Min Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="range-slider-thumb range-slider-min"
        />

        {/* Max Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="range-slider-thumb range-slider-max"
        />
      </div>

      <style jsx>{`
        .range-slider-thumb {
          position: absolute;
          width: 100%;
          height: 2px;
          background: transparent;
          pointer-events: none;
          top: 0;
          -webkit-appearance: none;
          appearance: none;
        }
        
        .range-slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #D84C38;
          border: 4px solid white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(216, 76, 56, 0.4);
          transition: all 0.2s ease;
          position: relative;
          z-index: 3;
        }

        .range-slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(216, 76, 56, 0.5);
        }

        .range-slider-thumb::-webkit-slider-thumb:active {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(216, 76, 56, 0.6);
        }

        /* Mozilla Firefox Support */
        .range-slider-thumb::-moz-range-thumb {
          -moz-appearance: none;
          appearance: none;
          pointer-events: auto;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #D84C38;
          border: 4px solid white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(216, 76, 56, 0.4);
          transition: all 0.2s ease;
        }

        .range-slider-min {
          z-index: ${minValue > max - 100 ? '5' : '3'};
        }

        .range-slider-max {
          z-index: 4;
        }

        .range-slider-thumb::-webkit-slider-runnable-track,
        .range-slider-thumb::-moz-range-track {
          background: transparent;
          border: none;
        }

        .range-slider-thumb:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

// ... [RadioOption and CheckboxOption components remain exactly the same] ...
const RadioOption = ({ name, value, checked, onChange, label }) => (
  <label className="relative flex items-center gap-3 cursor-pointer group py-1">
    <input 
      type="radio" 
      name={name} 
      value={value}
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <div className={`
      w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200
      ${checked ? 'border-primary bg-primary shadow-md' : 'border-gray-300 bg-white group-hover:border-primary'}
    `}>
      {checked && <div className="w-2 h-2 rounded-full bg-white"></div>}
    </div>
    <span className={`text-sm font-medium ${checked ? 'text-text-dark' : 'text-text-muted'}`}>{label}</span>
  </label>
);

const CheckboxOption = ({ checked, onChange, label, icon: Icon }) => (
  <label className="relative flex items-center gap-3 cursor-pointer group py-1">
    <input 
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <div className={`
      w-5 h-5 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200
      ${checked ? 'border-primary bg-primary shadow-md' : 'border-gray-300 bg-white group-hover:border-primary'}
    `}>
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    {Icon && <Icon className={`text-base sm:text-lg flex-shrink-0 ${checked ? 'text-accent' : 'text-gray-400'}`} />}
    <span className={`text-sm font-medium ${checked ? 'text-text-dark' : 'text-text-muted'}`}>{label}</span>
  </label>
);

const FilterContent = ({ filters, onFilterChange, onClearAll, onApply, onClose }) => (
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="flex justify-between items-center pb-4 border-b-2 border-background-light mb-4">
      <h3 className="text-primary font-bold text-lg sm:text-xl flex items-center gap-2">
        <FaFilter className="text-accent text-base sm:text-lg" /> Filters
      </h3>
      <div className="flex items-center gap-3">
        <button onClick={onClearAll} className="text-accent font-semibold text-xs sm:text-sm hover:text-primary transition-colors">
          Clear All
        </button>
        <button onClick={onClose} className="text-text-muted hover:text-text-dark">
          <FaTimes size={20} />
        </button>
      </div>
    </div>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto pb-4 px-1">
      {/* Price Range */}
      <div className="mb-6 sm:mb-8">
        <h4 className="font-bold text-text-dark mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <span className="w-1 h-4 sm:h-5 bg-accent rounded-full"></span>
          Price Range
        </h4>
        
        {/* ✅ FIX: Changed max from 1000 to 50000 so it matches the data */}
        <DualRangeSlider
          min={0}
          max={50000} 
          minValue={filters.minPrice}
          maxValue={filters.maxPrice}
          onChange={(min, max) => {
            onFilterChange('minPrice', min);
            onFilterChange('maxPrice', max);
          }}
        />
      </div>

      {/* Distance */}
      <div className="mb-6 sm:mb-8">
        <h4 className="font-bold text-text-dark mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <span className="w-1 h-4 sm:h-5 bg-accent rounded-full"></span>
          Distance from Campus
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {[
            { value: '1', label: 'Within 1 km' },
            { value: '3', label: 'Within 3 km' },
            { value: '5', label: 'Within 5 km' },
            { value: '10', label: 'Any distance' }
          ].map(option => (
            <RadioOption
              key={option.value}
              name="distance"
              value={option.value}
              checked={filters.distance === option.value}
              onChange={(e) => onFilterChange('distance', e.target.value)}
              label={option.label}
            />
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-6 sm:mb-8">
        <h4 className="font-bold text-text-dark mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <span className="w-1 h-4 sm:h-5 bg-accent rounded-full"></span>
          Gender Preference
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {[
            { value: 'any', label: 'Any' },
            { value: 'female', label: 'Female Only' },
            { value: 'male', label: 'Male Only' }
          ].map(option => (
            <RadioOption
              key={option.value}
              name="gender"
              value={option.value}
              checked={filters.gender === option.value}
              onChange={(e) => onFilterChange('gender', e.target.value)}
              label={option.label}
            />
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6 sm:mb-8">
        <h4 className="font-bold text-text-dark mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <span className="w-1 h-4 sm:h-5 bg-accent rounded-full"></span>
          Amenities
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {Object.entries(amenityIcons).map(([key, Icon]) => (
            <CheckboxOption
              key={key}
              checked={filters.amenities.includes(key)}
              onChange={() => {
                const newAmenities = filters.amenities.includes(key)
                  ? filters.amenities.filter(a => a !== key)
                  : [...filters.amenities, key];
                onFilterChange('amenities', newAmenities);
              }}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              icon={Icon}
            />
          ))}
        </div>
      </div>

      {/* Room Type */}
      <div className="mb-6 sm:mb-8">
        <h4 className="font-bold text-text-dark mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <span className="w-1 h-4 sm:h-5 bg-accent rounded-full"></span>
          Room Type
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {[
            { value: 'single', label: 'Single Room' },
            { value: 'shared', label: 'Shared Room' },
            { value: 'apartment', label: 'Apartment' }
          ].map(type => (
            <CheckboxOption
              key={type.value}
              checked={filters.roomTypes.includes(type.value)}
              onChange={() => {
                const newTypes = filters.roomTypes.includes(type.value)
                  ? filters.roomTypes.filter(t => t !== type.value)
                  : [...filters.roomTypes, type.value];
                onFilterChange('roomTypes', newTypes);
              }}
              label={type.label}
            />
          ))}
        </div>
      </div>
    </div>

    {/* Apply Button */}
    <div className="pt-4 border-t border-gray-200">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          onApply();
          onClose();
        }}
        className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 sm:py-4 rounded-large font-bold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 hover:shadow-xl transition-all duration-300"
      >
        <FaSearch className="text-base sm:text-lg" />
        Apply Filters
      </motion.button>
    </div>
  </div>
);

const FiltersSidebar = ({ isOpen, onClose, filters, onFilterChange, onClearAll, onApply }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 md:w-[450px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-4 sm:p-6 flex-1 flex flex-col overflow-hidden">
              <FilterContent 
                filters={filters}
                onFilterChange={onFilterChange}
                onClearAll={onClearAll}
                onApply={onApply}
                onClose={onClose}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FiltersSidebar;