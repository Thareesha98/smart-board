import { useState, useMemo } from 'react';
import { initialUsers } from '../data/mockData';

export const useUsers = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [toast, setToast] = useState(null);

    // Helper to show notifications
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    /**
     * CALCULATE TOTALS
     * This section calculates the counts for the top stat cards
     * based on the current state of the users array.
     */
    const stats = useMemo(() => {
        return {
            total: users.length,
            students: users.filter(u => u.role === 'student').length,
            owners: users.filter(u => u.role === 'owner').length,
            admins: users.filter(u => u.role === 'admin').length
        };
    }, [users]);

    /**
     * FILTER LOGIC
     * Handles search, role selection, and status filtering.
     */
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = 
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
            
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchTerm, roleFilter, statusFilter]);

    /**
     * ACTIONS
     */
    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(prev => prev.filter(u => u.id !== id));
            setSelectedUser(null);
            showToast('User deleted successfully', 'error');
        }
    };

    const resetFilters = () => {
        setSearchTerm('');
        setRoleFilter('all');
        setStatusFilter('all');
    };

    return {
        users: filteredUsers,
        stats, // Exported stats for the top cards
        searchTerm, 
        setSearchTerm,
        roleFilter, 
        setRoleFilter,
        statusFilter, 
        setStatusFilter,
        selectedUser, 
        setSelectedUser,
        toast, 
        handleDeleteUser, 
        resetFilters 
    };
};