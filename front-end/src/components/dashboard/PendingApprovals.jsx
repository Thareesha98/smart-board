import React from 'react';

const PendingApprovals = ({ approvals, onApprove, onReject }) => {
  return (
    /* Removed overflow-hidden and added pb-6 to prevent bottom overlap */
    <div className="bg-card-bg rounded-[25px] shadow-custom flex flex-col border border-transparent">
      <div className="p-6 pb-4 flex justify-between items-center">
        <h3 className="text-primary text-xl font-bold">Pending Approvals</h3>
        <a href="#" className="text-accent font-semibold hover:underline text-sm">View All</a>
      </div>

      {/* Added bottom padding to the container to separate the last item from the border */}
      <div className="p-6 pt-0 pb-6 flex flex-col gap-4">
        {approvals.length === 0 ? (
          <p className="text-text-muted italic">No pending approvals.</p>
        ) : (
          approvals.map((ad) => (
            <div 
              key={ad.id} 
              className="flex flex-col sm:flex-row justify-between items-center p-4 bg-background-light rounded-[15px] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md gap-4 border border-gray-100/50"
            >
              <div className="text-center sm:text-left">
                {/* Title and Metadata */}
                <h4 className="text-text-dark font-bold tracking-tight">{ad.title}</h4>
                <p className="text-text-muted text-sm">Submitted by: {ad.submittedBy}</p>
                <span className="text-text-muted text-xs block mt-1">{ad.time}</span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => onApprove(ad.id)}
                  className="bg-success text-white px-3 py-2 rounded-[12px] text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <i className="fas fa-check"></i> Approve
                </button>
                <button 
                  onClick={() => onReject(ad.id)}
                  className="bg-red-alert text-white px-3 py-2 rounded-[12px] text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <i className="fas fa-times"></i> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;