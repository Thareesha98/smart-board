import { useState,useMemo } from 'react';

// Mock Data
const MOCK_REQUESTS = [
  { id: 'REQ-001', title: 'Leaking Faucet', boardingName: 'Sunset Villa', roomNumber: '101', date: '2025-10-24', urgency: 'medium', status: 'pending', description: 'The bathroom faucet is dripping continuously.' },
  { id: 'REQ-002', title: 'Broken Window Latch', boardingName: 'City View', roomNumber: '204', date: '2025-10-22', urgency: 'high', status: 'in-progress', description: 'Window cannot be locked securely. Cold air coming in.' },
  { id: 'REQ-003', title: 'Light Bulb Replacement', boardingName: 'Sunset Villa', roomNumber: '102', date: '2025-10-15', urgency: 'low', status: 'completed', description: 'Main bedroom light is flickering.' },
  { id: 'REQ-004', title: 'Leaking Faucet', boardingName: 'Sunset Villa', roomNumber: '101', date: '2025-10-24', urgency: 'medium', status: 'pending', description: 'The bathroom faucet is dripping continuously.' },
  { id: 'REQ-005', title: 'Broken Window Latch', boardingName: 'City View', roomNumber: '204', date: '2025-10-22', urgency: 'high', status: 'in-progress', description: 'Window cannot be locked securely. Cold air coming in.' },
  { id: 'REQ-006', title: 'Light Bulb Replacement', boardingName: 'Sunset Villa', roomNumber: '102', date: '2025-10-15', urgency: 'low', status: 'completed', description: 'Main bedroom light is flickering.' },
  { id: 'REQ-007', title: 'Leaking Faucet', boardingName: 'Sunset Villa', roomNumber: '101', date: '2025-10-24', urgency: 'medium', status: 'pending', description: 'The bathroom faucet is dripping continuously.' },
  { id: 'REQ-008', title: 'Broken Window Latch', boardingName: 'City View', roomNumber: '204', date: '2025-10-22', urgency: 'high', status: 'in-progress', description: 'Window cannot be locked securely. Cold air coming in.' },
  { id: 'REQ-009', title: 'Light Bulb Replacement', boardingName: 'Sunset Villa', roomNumber: '102', date: '2025-10-15', urgency: 'low', status: 'in-progress', description: 'Main bedroom light is flickering.' },
];

const useMaintenanceLogic = () => {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'completed'
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  // New State for Scale
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 cards per page

  // Mock Owner Data (for HeaderBar)
  const ownerData = {
    firstName: "Niroshan",
    avatar: "https://i.pravatar.cc/150?img=11" // Replace with real image
  };

  // 1. Filter Logic
  // 'Pending' tab groups 'pending' AND 'in-progress'
  const filteredRequests = requests.filter(req => {
    if (activeTab === 'pending') return req.status === 'pending' || req.status === 'in-progress';
    return req.status === 'completed';
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  
  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRequests, currentPage]);

  // 2. Counts Logic (for HeaderBar notifications)
  const counts = {
    pending: requests.filter(r => r.status === 'pending' || r.status === 'in-progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
    total: requests.length
  };

  // 3. Action Handlers
  const handleStatusUpdate = (id, newStatus) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  return {
    paginatedRequests,
    filteredRequests,
    activeTab,
    setActiveTab,
    handleStatusUpdate,
    counts,
    ownerData,

    currentPage,
    setCurrentPage,
    totalPages
  };
};

export default useMaintenanceLogic;