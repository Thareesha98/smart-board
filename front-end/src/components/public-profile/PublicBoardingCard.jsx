import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const PublicBoardingCard = ({ boarding }) => {
    const navigate = useNavigate();
    
    // Determine Image
    const image = (boarding.imageUrls && boarding.imageUrls.length > 0) 
        ? boarding.imageUrls[0] 
        : "https://via.placeholder.com/400x300?text=No+Image";

    return (
        <div className="bg-card-bg rounded-boarding shadow-custom hover:shadow-xl transition-all duration-300 overflow-hidden border border-light flex flex-col group">
            <div className="relative h-40 overflow-hidden">
                <img src={image} alt={boarding.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                    {boarding.boardingType}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h4 className="text-base font-black text-text tracking-tight mb-1 truncate">{boarding.title}</h4>
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-3 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-accent" /> {boarding.address}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-light">
                    <div>
                        <p className="text-[9px] font-black text-muted uppercase tracking-widest">Rent</p>
                        <p className="text-sm font-bold text-primary flex items-center gap-1">
                             Rs. {boarding.pricePerMonth}
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate(`/student/boarding-details/${boarding.id}`)}
                        className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                        <FaArrowRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublicBoardingCard;