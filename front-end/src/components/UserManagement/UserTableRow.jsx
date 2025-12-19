import React from 'react';

const UserTableRow = ({ user, onView, onSelectToggle }) => {
  // Determine status styles based on user status
  const statusStyles = {
    active: 'bg-success/10 text-success',
    pending: 'bg-accent/10 text-accent',
    deactivated: 'bg-error/10 text-error'
  };

  return (
    <tr className="hover:bg-background-light/10 transition-colors border-b border-background-light last:border-none">
      <td className="p-4">
        <input 
          type="checkbox" 
          checked={user.isSelected} 
          onChange={() => onSelectToggle(user.id)}
          className="form-checkbox h-4 w-4 text-primary rounded border-background-light focus:ring-primary"
        />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img 
            src={user.avatar} 
            className="w-10 h-10 rounded-full object-cover border border-background-light" 
            alt={user.name} 
          />
          <div>
            <div className="font-bold text-text-dark text-sm">{user.name}</div>
            <div className="text-xs text-text-muted">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="text-sm font-medium capitalize text-text-dark">
          {user.role}
        </span>
      </td>
      <td className="p-4">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[user.status] || 'bg-gray-100'}`}>
          {user.status}
        </span>
      </td>
      <td className="p-4 text-right">
        <button 
          onClick={() => onView(user)}
          className="text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;