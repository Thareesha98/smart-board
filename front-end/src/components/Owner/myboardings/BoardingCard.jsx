import React from "react";

const BoardingCard = ({ property, viewMode, onManage, onViewTenants }) => {
  // Using standard Tailwind classes for status
  const statusColors = {
    active: "bg-success",
    inactive: "bg-muted",
  };

  return (
    <div
      className={`bg-card-bg rounded-boarding shadow-custom hover:shadow-xl transition-all duration-300 overflow-hidden flex border border-light ${
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
          <h3 className="text-xl font-black text-text tracking-tight">
            {property.name}
          </h3>
          <p className="text-muted text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 mb-4">
            <i className="fas fa-map-marker-alt text-accent"></i>{" "}
            {property.address}
          </p>

          <div className="grid grid-cols-3 gap-2 border-t border-light pt-4">
            <div className="text-center border-r border-light">
              <p className="text-[9px] font-black text-muted uppercase tracking-[0.1em]">
                Rent
              </p>
              <p className="font-bold text-text">{property.rent}</p>
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
              <p className="font-bold text-accent">
                {property.rating} <i className="fas fa-star text-[8px]"></i>
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {/* View Tenants Button */}
          <button
            disabled={property.totalTenants === 0}
            onClick={() => onViewTenants(property.id)}
            className="flex-1 border-2 border-accent text-accent py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all hover:bg-accent hover:text-white disabled:opacity-20 disabled:border-muted disabled:text-muted"
          >
            <i className="fas fa-users mr-1"></i> {property.totalTenants || "0"}{" "}
            Tenants
          </button>

          {/* Manage Button */}
          <button
            onClick={() => onManage(property.id)}
            className="flex-1 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest text-white transition-all bg-accent shadow-md hover:shadow-lg active:scale-95"
          >
            <i className="fas fa-cog mr-1"></i> Manage
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardingCard;
