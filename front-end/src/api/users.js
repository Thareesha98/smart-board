// src/api/users.js
import { mockUsers } from '../data/mockData.js'; // Referencing mock data

// Mimics a paginated and filtered API response
export const fetchUsers = async (params) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API latency
  
  let filteredUsers = mockUsers;
  
  // Apply filtering logic
  if (params.search) {
    const term = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(u => 
      u.name.toLowerCase().includes(term) || 
      u.email.toLowerCase().includes(term)
    );
  }
  if (params.role !== 'all') {
    filteredUsers = filteredUsers.filter(u => u.role === params.role);
  }
  if (params.status !== 'all') {
    filteredUsers = filteredUsers.filter(u => u.status === params.status);
  }

  // Apply pagination
  const pageSize = 10;
  const startIndex = (params.page - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);
  
  return {
    users: paginatedUsers,
    totalPages: Math.ceil(filteredUsers.length / pageSize),
    totalCount: filteredUsers.length,
  };
};

export const performAction = async (action, userId) => {
    // API Call to Spring Boot
    console.log(`[API CALL] Performing ${action} on user ${userId}`);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: `User ${userId} successfully ${action}d.` };
}