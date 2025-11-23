import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageGallery = ({ images, currentIndex, onPrev, onNext, onSelect, badge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-large overflow-hidden shadow-custom"
    >
      {/* Main Image */}
      <div className="relative h-96 overflow-hidden group">
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={images[currentIndex]}
          alt="Boarding"
          className="w-full h-full object-cover"
        />
        
        {/* Badge */}
        <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          {badge}
        </div>

        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-accent hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        >
          <FaChevronLeft />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-accent hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        >
          <FaChevronRight />
        </motion.button>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-2 p-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            onClick={() => onSelect(idx)}
            className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
              idx === currentIndex ? 'border-accent' : 'border-transparent'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ImageGallery;