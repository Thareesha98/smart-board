// src/components/UserManagement/UserTable.jsx
import UserTableRow from './UserTableRow.jsx';

const UserTable = ({ users, onView, onDeactivate, onSelectToggle, selectedIds, loading }) => {
  if (loading) {
    return <div className="text-center py-12 text-text-muted"><i className="fas fa-spinner fa-spin mr-2" /> Loading Users...</div>;
  }
  
  if (users.length === 0) {
    return <div className="text-center py-12 text-text-muted">No users found matching the criteria.</div>;
  }

  const isAllSelected = users.length > 0 && users.every(u => selectedIds.includes(u.id));

  return (
    <div className="overflow-x-auto shadow-sm rounded-large border border-background-light">
      <table className="min-w-full divide-y divide-background-light">
        <thead className="bg-background-light/50 sticky top-0">
          <tr className="text-left text-xs font-semibold uppercase text-text-muted tracking-wider">
            <th className="p-4 w-12">
                <input 
                    type="checkbox" 
                    checked={isAllSelected}
                    onChange={() => alert('Bulk select all toggled')} 
                    className="form-checkbox text-primary rounded" 
                />
            </th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4 w-24">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-card-bg divide-y divide-background-light">
          {users.map(user => (
            <UserTableRow 
              key={user.id} 
              user={{...user, isSelected: selectedIds.includes(user.id)}}
              onView={onView} 
              onDeactivate={onDeactivate}
              onSelectToggle={onSelectToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;