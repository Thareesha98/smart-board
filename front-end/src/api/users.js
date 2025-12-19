// src/api/users.js
import { mockUsers } from '../data/mockData.js';

export const fetchUsers = async (params) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  let filteredUsers = [...mockUsers];
  
  // 1. Search filter (Name or Email)
  if (params.search) {
    const term = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(u => 
      u.name.toLowerCase().includes(term) || 
      u.email.toLowerCase().includes(term)
    );
  }

  // 2. Role filter
  if (params.role && params.role !== 'all') {
    filteredUsers = filteredUsers.filter(u => u.role === params.role);
  }

  // 3. Status filter
  if (params.status && params.status !== 'all') {
    filteredUsers = filteredUsers.filter(u => u.status === params.status);
  }

  // 4. Pagination (Matching your new UI requirement of 10-20 per page)
  const pageSize = 8; 
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const startIndex = (params.page - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);
  
  return {
    users: paginatedUsers,
    totalPages: totalPages,
    totalCount: filteredUsers.length,
  };
};

export const performAction = async (action, userId) => {
    // This simulates the "Delete" or "Deactivate" backend calls
    console.log(`API Request: ${action} on User ID: ${userId}`);
    return { success: true };
};