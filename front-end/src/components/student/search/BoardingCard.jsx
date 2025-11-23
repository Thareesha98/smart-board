import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarCheck, FaEye } from 'react-icons/fa';

const BoardingCard = ({ boarding, onBook }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Navigate to details page with boarding ID and pass boarding data
    navigate(`/boarding-details/${boarding.id}`, { 
      state: { boarding } 
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-large overflow-hidden shadow-custom transition-shadow duration-300 hover:shadow-xl cursor-pointer"
    >
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={boarding.image} 
          alt={boarding.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => e.target.src = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80"}
        />
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1.5 rounded-full text-xs font-semibold">
          {boarding.badge}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-text-dark mb-1">{boarding.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-500">{'⭐'.repeat(Math.floor(boarding.rating))}</span>
              <span className="text-text-muted">{boarding.rating} ({boarding.reviewCount} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-accent">${boarding.price}</div>
            <span className="text-xs text-text-muted">/month</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
          <FaMapMarkerAlt className="text-accent" />
          {boarding.location}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {boarding.amenities.map((amenity, idx) => (
            <span key={idx} className="bg-background-light text-text-dark px-3 py-1 rounded-full text-xs font-medium">
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onBook(boarding.id)}
            className="flex-1 bg-accent text-white py-2.5 rounded-large font-semibold transition-all hover:bg-primary flex items-center justify-center gap-2"
          >
            <FaCalendarCheck />
            Book Visit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
            className="flex-1 border-2 border-accent text-accent py-2.5 rounded-large font-semibold transition-all hover:bg-accent hover:text-white flex items-center justify-center gap-2"
          >
            <FaEye />
            Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BoardingCard;