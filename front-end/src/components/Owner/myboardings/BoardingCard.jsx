import React from "react";

const BoardingCard = ({ property, viewMode, onManage, onViewTenants }) => {
  
  const statusColors = {
    active: "bg-green-500",
    inactive: "bg-gray-400",
  };

  return (
    <div className={`bg-white rounded-[30px] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex ${
      viewMode === 'list' ? 'flex-row h-56' : 'flex-col'
    }`}>
      
      {/* Image & Status Badge */}
      <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'h-52'}`}>
        <img src={property.image} className="w-full h-full object-cover" alt={property.name} />
        <div className={`absolute top-4 right-4 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm ${statusColors[property.status] || 'bg-gray-400'}`}>
          {property.status}
        </div>
      </div>

      {/* Details & Action Buttons */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{property.name}</h3>
          <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
            <i className="fas fa-map-marker-alt text-xs"></i> {property.address}
          </p>
          
          <div className="grid grid-cols-3 gap-2 border-t pt-4">
            <div className="text-center border-r border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase">Rent</p>
              <p className="font-bold text-gray-700">{property.rent}</p>
            </div>
            <div className="text-center border-r border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase">Available</p>
              <p className="font-bold text-gray-700">{property.availableRooms}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase">Rating</p>
              <p className="font-bold text-(--accent)">{property.rating} <i className="fas fa-star text-[8px]"></i></p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {/* View Tenants Button */}
          <button 
            disabled={property.totalTenants === 0}
            onClick={() => onViewTenants(property.id)}
            className="flex-1 border-2 border-(--accent) text-(--accent) py-2 rounded-full font-bold text-xs transition hover:bg-(--accent) hover:text-white disabled:opacity-30 disabled:border-gray-200 disabled:text-gray-300"
          >
            <i className="fas fa-users mr-1"></i> {property.totalTenants || '0'} Tenants
          </button>
          
          {/* Manage Button  */}
          <button 
            onClick={() => onManage(property.id)}
            className="flex-1 py-2 rounded-full font-bold text-xs text-white transition bg-(--accent) hover:shadow-lg active:scale-95"
          >
            <i className="fas fa-cog mr-1"></i> Manage
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardingCard;