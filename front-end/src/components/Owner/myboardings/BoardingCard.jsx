import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaStar, FaUsers, FaCog } from "react-icons/fa";

const BoardingCard = ({ property, viewMode, onManage, onViewTenants }) => {
  // Status Color Mapping
  const statusColors = {
    active: "bg-success",
    inactive: "bg-muted",
  };

  return (
    <motion.div
      layout // 🔥 Automagically animates between Grid and List view
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }} // Lift effect on hover
      className={`bg-card-bg rounded-boarding shadow-custom hover:shadow-xl transition-shadow duration-300 overflow-hidden flex border border-light ${
        viewMode === "list" ? "flex-row h-60" : "flex-col"
      }`}
    >
      {/* Image & Status Badge */}
      <div className={`relative ${viewMode === "list" ? "w-1/3" : "h-52"}`}>
        <img
          src={property.image}
          className="w-full h-full object-cover"
          alt={property.name}
        />
        <div
          className={`absolute top-4 right-4 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase shadow-md ${
            statusColors[property.status] || "bg-muted"
          }`}
        >
          {property.status}
        </div>
      </div>

      {/* Details & Action Buttons */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-black text-text tracking-tight line-clamp-1">
              {property.name}
            </h3>
            {viewMode === "list" && (
              <div className="font-bold text-accent flex items-center gap-1 text-sm">
                {property.rating} <FaStar className="text-[10px]" />
              </div>
            )}
          </div>

          <p className="text-muted text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 mb-4 mt-1">
            <FaMapMarkerAlt className="text-accent" />
            <span className="truncate">{property.address}</span>
          </p>

          <div className="grid grid-cols-3 gap-2 border-t border-light pt-4">
            <div className="text-center border-r border-light">
              <p className="text-[9px] font-black text-muted uppercase tracking-[0.1em]">
                Rent
              </p>
              <p className="font-bold text-text truncate">{property.rent}</p>
            </div>
            <div className="text-center border-r border-light">
              <p className="text-[9px] font-black text-muted uppercase tracking-[0.1em]">
                Available
              </p>
              <p className="font-bold text-text">{property.availableRooms}</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-black text-muted uppercase tracking-[0.1em]">
                Rating
              </p>
              <p className="font-bold text-accent flex justify-center items-center gap-1">
                {property.rating} <FaStar className="text-[8px]" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {/* View Tenants Button */}
          <motion.button
            whileHover={property.totalTenants > 0 ? { scale: 1.05 } : {}}
            whileTap={property.totalTenants > 0 ? { scale: 0.95 } : {}}
            disabled={property.totalTenants === 0}
            onClick={() => onViewTenants(property.id)}
            className="flex-1 border-2 border-accent text-accent py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-colors hover:bg-accent hover:text-white disabled:opacity-30 disabled:border-muted disabled:text-muted disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <FaUsers /> {property.totalTenants || "0"} Tenants
          </motion.button>

          {/* Manage Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onManage(property.id)}
            className="flex-1 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest text-white transition-colors bg-accent shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FaCog /> Manage
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BoardingCard;
