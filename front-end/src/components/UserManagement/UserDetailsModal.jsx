import React from 'react';
import Button from '../UI/Button.jsx';

const UserDetailsModal = ({ user, onClose, onDelete }) => {
  return (
    <div className="animate-fade-in">
      {/* Header with Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-20 h-20 rounded-full border-4 border-background-light object-cover shadow-sm" 
        />
        <div>
          <h3 className="text-2xl font-bold text-text-dark leading-tight">{user.name}</h3>
          <p className="text-text-muted">{user.email}</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            user.status === 'active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            {user.status}
          </span>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Role', value: user.role, icon: 'user-tag' },
          { label: 'Phone Number', value: user.phone, icon: 'phone' },
          { label: 'Registration Date', value: user.registrationDate, icon: 'calendar-alt' },
          { label: 'Last Active', value: user.lastActive, icon: 'clock' },
        ].map((item, index) => (
          <div key={index} className="p-4 bg-background-light/30 rounded-card border border-background-light/50">
            <div className="flex items-center gap-2 text-text-muted text-xs font-bold uppercase mb-1">
              <i className={`fas fa-${item.icon}`} />
              {item.label}
            </div>
            <div className="text-text-dark font-medium capitalize">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex justify-end items-center gap-3 pt-6 border-t border-background-light">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button 
          variant="error" 
          onClick={() => onDelete(user.id)}
          className="flex items-center gap-2"
        >
          <i className="fas fa-trash-alt text-sm" /> Delete User
        </Button>
      </div>
    </div>
  );
};

export default UserDetailsModal;