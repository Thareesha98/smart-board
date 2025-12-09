// src/hooks/useUsersData.js
import { useState, useEffect, useCallback } from 'react';
import { fetchUsers, performAction } from '../api/users.js'; // Changed from .ts

const initialFilters = { search: '', role: 'all', status: 'all' };

const useUsersData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedIds, setSelectedIds] = useState([]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsers({ page: currentPage, ...filters });
      // Map users and check if they are currently selected
      setUsers(data.users.map(u => ({ ...u, isSelected: selectedIds.includes(u.id) })));
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // Implement notification logic here
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters, selectedIds]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const executeAction = async (action, userId) => {
    const ids = Array.isArray(userId) ? userId : [userId];
    const success = await Promise.all(ids.map(id => performAction(action, id)));

    if (success.every(s => s.success)) {
      // Clear selection and reload data on success
      setSelectedIds([]);
      loadUsers();
      // Implement success notification
    }
  };

  const handleSelectToggle = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
  
  return { users, totalPages, currentPage, loading, filters, setFilters, changePage, executeAction, selectedIds, handleSelectToggle };
};

export default useUsersData;