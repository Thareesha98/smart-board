import React from 'react';

const UserModal = ({ user, onClose, onDelete }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-text-dark/40 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="bg-card-bg w-full max-w-lg rounded-[25px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Modal Header */}
        <div className="p-5 lg:p-6 border-b border-gray-100 flex justify-between items-center bg-background-light/30">
          <h3 className="text-lg lg:text-xl font-bold text-primary">User Details</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-text-muted"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 lg:p-8">
          <div className="flex flex-col items-center mb-6 lg:mb-8">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-accent shadow-md object-cover" 
              />
              <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                user.status === 'active' ? 'bg-success' : 'bg-red-alert'
              }`}></div>
            </div>
            <h4 className="text-lg lg:text-xl font-bold mt-4 text-text-dark">{user.name}</h4>
            <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] lg:text-xs uppercase font-bold rounded-full mt-2 tracking-widest">
              {user.role}
            </span>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {/* Email Info */}
            <div className="flex items-center gap-4 p-3 lg:p-4 bg-background-light rounded-[15px] border border-gray-100/50">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-accent shadow-sm shrink-0">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Email Address</p>
                <p className="text-sm lg:text-base text-text-dark font-medium truncate">{user.email}</p>
              </div>
            </div>

            {/* Registration Details */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="p-3 lg:p-4 border border-gray-100 rounded-[15px] bg-gray-50/30">
                <p className="text-text-muted text-[10px] lg:text-xs uppercase font-bold tracking-wider mb-1">Joined</p>
                <p className="text-xs lg:text-sm text-text-dark font-bold">{user.registrationDate}</p>
              </div>
              <div className="p-3 lg:p-4 border border-gray-100 rounded-[15px] bg-gray-50/30">
                <p className="text-text-muted text-[10px] lg:text-xs uppercase font-bold tracking-wider mb-1">Last Active</p>
                <p className="text-xs lg:text-sm text-text-dark font-bold">{user.lastActive || 'Today'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 lg:p-6 bg-gray-50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 lg:py-3 rounded-[12px] font-bold text-text-muted hover:bg-gray-200 transition-all text-sm"
          >
            Close
          </button>
          <button 
            onClick={() => {
              onDelete(user.id);
              onClose();
            }}
            className="flex-1 px-4 py-2.5 lg:py-3 rounded-[12px] font-bold bg-red-alert text-white hover:bg-red-700 shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            <i className="fas fa-trash-alt"></i> Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;