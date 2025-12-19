import React from 'react';
import UserTableRow from './UserTableRow.jsx';

const UserTable = ({ users, onView, onSelectToggle, selectedIds, loading }) => {
  if (loading) return <div className="p-10 text-center text-text-muted">Loading users...</div>;
  if (users.length === 0) return <div className="p-10 text-center text-text-muted">No users found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-background-light/20">
          <tr>
            <th className="p-4 w-10">
               {/* Global checkbox logic would go here */}
               <input type="checkbox" className="rounded" />
            </th>
            <th className="p-4 text-xs font-bold text-text-muted uppercase">User</th>
            <th className="p-4 text-xs font-bold text-text-muted uppercase">Role</th>
            <th className="p-4 text-xs font-bold text-text-muted uppercase">Status</th>
            <th className="p-4 text-xs font-bold text-text-muted uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserTableRow 
              key={user.id} 
              user={user} 
              onView={onView}
              onSelectToggle={onSelectToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;