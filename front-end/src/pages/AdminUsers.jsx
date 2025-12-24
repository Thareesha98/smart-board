import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import UserFilters from '../components/users/UserFilters';
import UserTable from '../components/users/UserTable';
import UserModal from '../components/users/UserModal';
import Toast from '../components/common/Toast';
import { useUsers } from '../hooks/useUsers';

const AdminUsers = ({ onNavigate }) => {
    const { 
        users, stats, searchTerm, setSearchTerm, roleFilter, setRoleFilter,
        statusFilter, setStatusFilter, selectedUser, setSelectedUser,
        toast, handleDeleteUser, resetFilters 
    } = useUsers();

    return (
        <AdminLayout 
            onNavigate={onNavigate} 
            activePage="users"
            title="User Management"
            subtitle="Review and manage platform members"
        >
            {toast && <Toast message={toast.message} type={toast.type} />}

            {/* QUICK STATS BAR - RESPONSIVE GRID */}
            <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-3 lg:gap-4 mb-6 lg:mb-8">
                {/* Total Users */}
                <div className="bg-white p-3 lg:p-4 rounded-[20px] shadow-sm border-l-4 border-primary flex items-center gap-3 lg:gap-4">
                    <div className="hidden sm:flex p-2 lg:p-3 bg-primary/10 rounded-full text-primary">
                        <i className="fas fa-users text-sm lg:text-xl"></i>
                    </div>
                    <div>
                        <span className="block text-[10px] text-text-muted uppercase font-bold tracking-wider">Total</span>
                        <span className="text-lg lg:text-xl font-bold text-text-dark">{stats.total}</span>
                    </div>
                </div>

                {/* Students */}
                <div className="bg-white p-3 lg:p-4 rounded-[20px] shadow-sm border-l-4 border-accent flex items-center gap-3 lg:gap-4">
                    <div className="hidden sm:flex p-2 lg:p-3 bg-accent/10 rounded-full text-accent">
                        <i className="fas fa-user-graduate text-sm lg:text-xl"></i>
                    </div>
                    <div>
                        <span className="block text-[10px] text-text-muted uppercase font-bold tracking-wider">Students</span>
                        <span className="text-lg lg:text-xl font-bold text-text-dark">{stats.students}</span>
                    </div>
                </div>

                {/* Owners */}
                <div className="bg-white p-3 lg:p-4 rounded-[20px] shadow-sm border-l-4 border-success flex items-center gap-3 lg:gap-4">
                    <div className="hidden sm:flex p-2 lg:p-3 bg-success/10 rounded-full text-success">
                        <i className="fas fa-house-user text-sm lg:text-xl"></i>
                    </div>
                    <div>
                        <span className="block text-[10px] text-text-muted uppercase font-bold tracking-wider">Owners</span>
                        <span className="text-lg lg:text-xl font-bold text-text-dark">{stats.owners}</span>
                    </div>
                </div>

                {/* Admins */}
                <div className="bg-white p-3 lg:p-4 rounded-[20px] shadow-sm border-l-4 border-info flex items-center gap-3 lg:gap-4">
                    <div className="hidden sm:flex p-2 lg:p-3 bg-info/10 rounded-full text-info">
                        <i className="fas fa-user-shield text-sm lg:text-xl"></i>
                    </div>
                    <div>
                        <span className="block text-[10px] text-text-muted uppercase font-bold tracking-wider">Admins</span>
                        <span className="text-lg lg:text-xl font-bold text-text-dark">{stats.admins}</span>
                    </div>
                </div>
            </div>

            <UserFilters 
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                roleFilter={roleFilter} setRoleFilter={setRoleFilter}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                onReset={resetFilters}
            />

            <UserTable 
                users={users} 
                onView={setSelectedUser} 
                onDelete={handleDeleteUser} 
            />

            {selectedUser && (
                <UserModal 
                    user={selectedUser} 
                    onClose={() => setSelectedUser(null)} 
                    onDelete={handleDeleteUser}
                />
            )}
        </AdminLayout>
    );
};

export default AdminUsers;