import React from 'react';

const SubmissionCard = ({ ad, onApprove, onReject, onViewDetails }) => {
  const isPending = ad.status === 'pending';
  const isApproved = ad.status === 'approved';

  return (
    <div className="bg-white border border-[#e0d6c5] rounded-[25px] overflow-hidden hover:shadow-xl transition-all group">
      {/* Ad Image Preview */}
      <div className="h-44 relative overflow-hidden">
        <img 
          src={ad.adDetails.image || 'https://via.placeholder.com/300x150?text=No+Image'} 
          alt={ad.adDetails.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
                onClick={onViewDetails}
                className="bg-white text-primary px-4 py-2 rounded-full font-bold text-xs shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
            >
                Quick View
            </button>
        </div>
        
        <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {ad.plan} Plan
        </span>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-[#332720] truncate text-base flex-1">{ad.adDetails.title}</h4>
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
            isPending ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
          }`}>
            {ad.status}
          </span>
        </div>
        <p className="text-xs text-[#665345] mb-5 font-medium">Advertiser: {ad.user.name}</p>
        
        <div className="flex flex-col gap-2">
          {isPending ? (
            <div className="flex gap-2">
              <button 
                onClick={() => onApprove(ad.id)} 
                className="flex-1 bg-[#10B981] text-white py-2.5 rounded-xl text-xs font-bold hover:shadow-lg transition-all"
              >
                Approve
              </button>
              <button 
                onClick={() => onReject(ad.id)}
                className="flex-1 border border-[#EF4444] text-[#EF4444] py-2.5 rounded-xl text-xs font-bold hover:bg-red-50 transition-all"
              >
                Reject
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button disabled className="flex-1 bg-gray-100 text-gray-500 py-2.5 rounded-xl text-xs font-bold">
                Processed
              </button>
              {isApproved && (
                <a 
                  href={ad.adDetails.image} 
                  download={`ad-${ad.id}.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-50 text-blue-600 py-2.5 rounded-xl text-xs font-bold text-center hover:bg-blue-100 transition-all"
                >
                  <i className="fas fa-download mr-1"></i> Download
                </a>
              )}
            </div>
          )}
          
          <button 
            onClick={onViewDetails}
            className="w-full py-2.5 mt-1 border border-gray-100 text-[#332720] rounded-xl text-xs font-bold hover:bg-gray-50 transition-all"
          >
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;