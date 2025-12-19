import { useState, useEffect, useCallback } from 'react';
import { fetchUsers, performAction } from '../api/users.js';

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
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSelectToggle = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (ids) => {
      setSelectedIds(prev => prev.length === ids.length ? [] : ids);
  };

  return { 
      users, totalPages, currentPage, loading, filters, setFilters, 
      setCurrentPage, selectedIds, handleSelectToggle, handleSelectAll, loadUsers 
  };
};

export default useUsersData;