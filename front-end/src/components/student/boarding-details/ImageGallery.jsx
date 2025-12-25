import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaImages } from 'react-icons/fa';

const ImageGallery = ({ images, currentIndex, onPrev, onNext, onSelect, badge }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
    >
      {/* Main Image Container - Responsive Height */}
      {/* Mobile: h-64, Tablet: h-80, Desktop: h-96 */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden bg-gray-100">
        <motion.img 
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          src={images[currentIndex]} 
          alt="Boarding View" 
          className="w-full h-full object-cover"
        />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-text-dark px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md z-10">
            {badge}
          </div>
        )}

        {/* Navigation Buttons (Hidden on mobile touch, visible on hover for desktop) */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
           <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onPrev}
            className="pointer-events-auto bg-white/80 hover:bg-white text-text-dark w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all"
          >
            <FaChevronLeft className="text-sm" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onNext}
            className="pointer-events-auto bg-white/80 hover:bg-white text-text-dark w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all"
          >
            <FaChevronRight className="text-sm" />
          </motion.button>
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="p-3 sm:p-4 border-t border-gray-100">
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={() => onSelect(idx)}
              className={`
                aspect-square rounded-lg overflow-hidden cursor-pointer relative
                ${idx === currentIndex ? 'ring-2 ring-accent ring-offset-2' : 'opacity-70 hover:opacity-100'}
              `}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              {/* Overlay for "See All" effect on last image if many images exist (optional visual cue) */}
              {idx === 4 && images.length > 5 && (
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xs">
                   <FaImages className="mr-1" /> +{images.length - 5}
                 </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageGallery;