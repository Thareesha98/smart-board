import { useState, useMemo, useEffect } from 'react';
import AdminService from '../api/admin/AdminService'; // Updated Import Path

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Load users from Backend
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await AdminService.getAllUsers();
            
            // MAP BACKEND TO FRONTEND:
            // Java DTO uses 'fullName', React UI uses 'name'
            const mappedUsers = data.map(u => ({
                ...u,
                name: u.fullName,
                // If verifiedOwner is false for an owner, show 'pending'
                status: (u.role === 'OWNER' && !u.verifiedOwner) ? 'pending' : 'active',
                avatar: `https://ui-avatars.com/api/?name=${u.fullName}&background=random`
            }));
            
            setUsers(mappedUsers);
        } catch (error) {
            showToast('Connection to backend failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Logic to calculate top card stats using real data
    const stats = useMemo(() => {
        return {
            total: users.length,
            students: users.filter(u => u.role === 'STUDENT').length,
            owners: users.filter(u => u.role === 'OWNER').length,
            admins: users.filter(u => u.role === 'ADMIN').length
        };
    }, [users]);

    // Filtering logic (Search and Role)
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === 'all' || user.role === roleFilter.toUpperCase();
            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, roleFilter]);

    return {
        users: filteredUsers,
        loading,
        stats,
        searchTerm, setSearchTerm,
        roleFilter, setRoleFilter,
        selectedUser, setSelectedUser,
        toast, fetchUsers,
        resetFilters: () => { setSearchTerm(''); setRoleFilter('all'); }
    };
};