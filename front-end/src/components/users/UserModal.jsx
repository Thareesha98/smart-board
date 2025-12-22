import React from 'react';

const UserModal = ({ user, onClose, onDelete }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-text-dark/40 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="bg-card-bg w-full max-w-lg rounded-large shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-background-light/30">
          <h3 className="text-xl font-bold text-primary">User Details</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-text-muted"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-24 h-24 rounded-full border-4 border-accent shadow-md object-cover" 
              />
              <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white ${
                user.status === 'active' ? 'bg-success' : 'bg-red-alert'
              }`}></span>
            </div>
            <h4 className="mt-4 text-2xl font-bold text-text-dark">{user.name}</h4>
            <p className="text-accent font-semibold capitalize">{user.role}</p>
          </div>

          {/* User Info Grid */}
          <div className="grid grid-cols-1 gap-6 text-sm">
            <div className="flex items-center gap-4 p-4 bg-background-light rounded-[15px]">
              <i className="fas fa-envelope text-primary w-5 text-center"></i>
              <div>
                <p className="text-text-muted text-xs uppercase font-bold tracking-wider">Email Address</p>
                <p className="text-text-dark font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-background-light rounded-[15px]">
              <i className="fas fa-phone text-primary w-5 text-center"></i>
              <div>
                <p className="text-text-muted text-xs uppercase font-bold tracking-wider">Phone Number</p>
                <p className="text-text-dark font-medium">{user.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-100 rounded-[15px]">
                <p className="text-text-muted text-xs uppercase font-bold tracking-wider mb-1">Joined</p>
                <p className="text-text-dark font-medium">{user.registrationDate}</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-[15px]">
                <p className="text-text-muted text-xs uppercase font-bold tracking-wider mb-1">Last Active</p>
                <p className="text-text-dark font-medium">{user.lastActive}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 flex gap-3 justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-[12px] font-bold text-text-muted hover:bg-gray-200 transition-all"
          >
            Close
          </button>
          <button 
            onClick={() => onDelete(user.id)}
            className="px-6 py-2.5 rounded-[12px] font-bold bg-red-alert text-white hover:bg-red-700 shadow-md transition-all flex items-center gap-2"
          >
            <i className="fas fa-trash-alt text-sm"></i> Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;