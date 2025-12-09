// src/pages/UserManagementPage.jsx
import Card from '../components/UI/Card.jsx';
import useUsersData from '../hooks/useUsersData.js'; // Changed from .ts
import FilterBar from '../components/UserManagement/FilterBar.jsx';
import UserTable from '../components/UserManagement/UserTable.jsx';
import Pagination from '../components/UserManagement/Pagination.jsx';
import Modal from '../components/UI/Modal.jsx';
import UserDetailsModal from '../components/UserManagement/UserDetailsModal.jsx';
import { useState } from 'react';

const UserManagementPage = () => {
  const { users, totalPages, currentPage, loading, filters, setFilters, changePage, executeAction, selectedIds, handleSelectToggle } = useUsersData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleBulkDeactivate = () => {
    if (selectedIds.length > 0 && confirm(`Deactivate ${selectedIds.length} users?`)) {
        executeAction('deactivate', selectedIds);
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-text-dark mb-4">User Management</h2>
      <p className="text-text-muted mb-6">Manage and moderate all Student and Owner accounts.</p>

      <Card className="p-4 md:p-6">
        {/* Search and Filter */}
        <FilterBar 
            filters={filters} 
            setFilters={setFilters} 
            selectedCount={selectedIds.length}
            onBulkDeactivate={handleBulkDeactivate}
        />

        {/* User Table */}
        <UserTable 
          users={users} 
          onView={handleViewUser}
          onDeactivate={(id) => executeAction('deactivate', id)}
          onSelectToggle={handleSelectToggle}
          selectedIds={selectedIds}
          loading={loading}
        />

        {/* Pagination & Info */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={changePage} 
        />
      </Card>

      {/* User Details Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="User Details">
        {selectedUser ? (
          <UserDetailsModal 
            user={selectedUser} 
            onClose={() => setIsModalOpen(false)}
            onDelete={() => {
                if(confirm("Permanently delete this user?")) {
                    executeAction('delete', selectedUser.id);
                    setIsModalOpen(false);
                }
            }}
          />
        ) : (
            <p>Loading user details...</p>
        )}
      </Modal>
    </div>
  );
};

export default UserManagementPage;