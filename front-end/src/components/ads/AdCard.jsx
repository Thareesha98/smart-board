import React from 'react';

const AdCard = ({ ad, onReview }) => {
  return (
    <div className="bg-background-light/30 rounded-[20px] overflow-hidden border border-gray-100 hover:-translate-y-1 transition-all duration-300 shadow-sm">
      <div className="relative h-48">
        <img src={ad.images[0]} alt={ad.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-bold text-sm">
          {ad.price}
        </div>
      </div>
      
      <div className="p-5">
        <h4 className="font-bold text-text-dark mb-1 truncate">{ad.title}</h4>
        <p className="text-xs text-text-muted flex items-center gap-1 mb-4">
          <i className="fas fa-map-marker-alt text-accent"></i> {ad.location}
        </p>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <img src={ad.owner.avatar} className="w-8 h-8 rounded-full border border-accent" />
            <span className="text-xs font-medium text-text-dark">{ad.owner.name}</span>
          </div>
          <button 
            onClick={onReview}
            className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-opacity-90 transition-all shadow-sm active:scale-95"
          >
            Review Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;