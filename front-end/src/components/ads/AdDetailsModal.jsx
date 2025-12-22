import React, { useState } from 'react';

const AdDetailsModal = ({ ad, onClose, onApprove, onReject }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const nextImage = () => setCurrentImg((prev) => (prev + 1) % ad.images.length);
  const prevImage = () => setCurrentImg((prev) => (prev - 1 + ad.images.length) % ad.images.length);

  const commonReasons = ["Incomplete information", "Poor quality images", "Violates guidelines", "Duplicate listing"];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-text-dark/40 backdrop-blur-sm">
      <div className="bg-card-bg w-full max-w-5xl rounded-large shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-background-light/30">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-primary truncate">Review: {ad.title}</h3>
            {/* Status Badge */}
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
              ad.status === 'approved' ? 'bg-success/10 text-success' : 
              ad.status === 'rejected' ? 'bg-red-alert/10 text-red-alert' : 
              'bg-accent/10 text-accent'
            }`}>
              {ad.status}
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
            <i className="fas fa-times text-text-muted"></i>
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left: Image Gallery & Amenities */}
            <div className="space-y-6">
              <div className="relative h-72 bg-black rounded-large overflow-hidden group">
                <img src={ad.images[currentImg]} className="w-full h-full object-contain" alt="Ad" />
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              {/* Amenities Section */}
              <div className="p-6 bg-background-light/30 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-text-dark mb-4 flex items-center gap-2">
                  <i className="fas fa-concierge-bell text-accent"></i> Amenities
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {ad.amenities?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                      <i className={`fas ${item.icon || 'fa-check'} text-success text-[10px]`}></i>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Details & Reviews */}
            <div className="space-y-6">
              <div>
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase">{ad.type}</span>
                <h2 className="text-2xl font-bold text-text-dark mt-2">{ad.price}</h2>
                <p className="text-text-muted flex items-center gap-2 mt-1"><i className="fas fa-map-marker-alt text-accent"></i> {ad.location}</p>
              </div>

              <div className="p-4 bg-background-light/50 rounded-xl italic text-sm text-text-muted">
                "{ad.description}"
              </div>

              {/* Reviews Section */}
              <div className="space-y-4">
                <h4 className="font-bold text-text-dark flex items-center gap-2 text-sm">
                  <i className="fas fa-star text-yellow-500"></i> Student Reviews
                </h4>
                <div className="space-y-3">
                  {ad.reviews?.map((review, idx) => (
                    <div key={idx} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-xs text-primary">{review.studentName}</span>
                        <div className="text-[10px] text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`${i < review.rating ? 'fas' : 'far'} fa-star`}></i>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-text-muted">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rejection UI (Only relevant if pending) */}
          {showRejectionInput && ad.status === 'pending' && (
            <div className="mt-8 p-6 bg-red-alert/5 border border-red-alert/20 rounded-xl animate-in slide-in-from-top duration-300">
              <label className="block font-bold text-red-alert mb-2">Reason for Rejection</label>
              <textarea 
                className="w-full p-4 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-red-alert outline-none mb-4"
                placeholder="Explain why this ad is being rejected..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex flex-wrap gap-2">
                {commonReasons.map(reason => (
                  <button key={reason} onClick={() => setRejectionReason(reason)} className="text-xs bg-white border border-gray-100 px-3 py-1 rounded-full hover:border-red-alert transition-colors">
                    {reason}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Conditional Logic Based on Status */}
        <div className="p-6 bg-gray-50 flex flex-wrap gap-3 justify-end border-t border-gray-100">
          {ad.status === 'pending' ? (
            // If ad is pending, show Approve/Reject controls
            !showRejectionInput ? (
              <>
                <button onClick={onClose} className="px-6 py-2.5 rounded-full font-bold text-text-muted hover:bg-gray-200 transition-all">Cancel</button>
                <button onClick={() => setShowRejectionInput(true)} className="px-6 py-2.5 rounded-full font-bold text-red-alert border-2 border-red-alert hover:bg-red-alert hover:text-white transition-all">Reject Ad</button>
                <button onClick={() => onApprove(ad.id)} className="px-6 py-2.5 rounded-full font-bold bg-success text-white hover:bg-emerald-700 shadow-md transition-all flex items-center gap-2">
                  <i className="fas fa-check"></i> Approve Advertisement
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setShowRejectionInput(false)} className="px-6 py-2.5 rounded-full font-bold text-text-muted hover:bg-gray-200 transition-all">Go Back</button>
                <button 
                  onClick={() => onReject(ad.id, rejectionReason)} 
                  disabled={!rejectionReason}
                  className="px-8 py-2.5 rounded-full font-bold bg-red-alert text-white hover:bg-red-700 disabled:opacity-50 transition-all shadow-md"
                >
                  Confirm Rejection
                </button>
              </>
            )
          ) : (
            // If ad is already Approved or Rejected, show only Close button
            <button 
              onClick={onClose} 
              className="px-8 py-2.5 rounded-full font-bold bg-primary text-white hover:bg-opacity-90 shadow-md transition-all"
            >
              Close Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdDetailsModal;