import React, { useState } from 'react';
import Card from '../components/UI/Card.jsx'; // Centralized UI wrapper
import useUsersData from '../hooks/useUsersData.js';
import FilterBar from '../components/UserManagement/FilterBar.jsx';
import UserTable from '../components/UserManagement/UserTable.jsx';
import Pagination from '../components/UserManagement/Pagination.jsx';
import Modal from '../components/UI/Modal.jsx';
import UserDetailsModal from '../components/UserManagement/UserDetailsModal.jsx';

const UserManagementPage = () => {
  const { 
    users, totalPages, currentPage, loading, filters, setFilters, 
    changePage, executeAction, selectedIds, handleSelectToggle 
  } = useUsersData();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-text-dark">User Management</h2>
        <p className="text-text-muted">Manage and moderate all Student and Owner accounts.</p>
      </div>

      {/* This Card component creates the "sheet" of paper effect 
         that contains your filters and your table.
      */}
      <Card className="p-0 overflow-hidden"> 
        <div className="p-6 border-b border-background-light">
           <FilterBar 
              filters={filters} 
              setFilters={setFilters} 
              selectedCount={selectedIds.length}
           />
        </div>

        <UserTable 
          users={users} 
          loading={loading}
          selectedIds={selectedIds}
          onSelectToggle={handleSelectToggle}
          onView={(user) => { setSelectedUser(user); setIsModalOpen(true); }}
        />

        <div className="p-6 bg-background-light/10">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={changePage} 
          />
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="User Profile">
        {selectedUser && <UserDetailsModal user={selectedUser} onClose={() => setIsModalOpen(false)} />}
      </Modal>
    </div>
  );
};

export default UserManagementPage;