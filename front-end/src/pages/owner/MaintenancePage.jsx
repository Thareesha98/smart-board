import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OwnerLayout from '../../components/owner/common/OwnerLayout'; // Assuming you have this
import MaintenanceCard from '../../components/owner/maintenance/OwnerMaintenanceCard';
import { FaClipboardCheck, FaTools } from 'react-icons/fa';

// Mock Data (Replace with your API call later)
const MOCK_REQUESTS = [
  { id: 'REQ-001', title: 'Leaking Faucet', boardingName: 'Sunset Villa', roomNumber: '101', date: '2025-10-24', urgency: 'medium', status: 'pending', description: 'The bathroom faucet is dripping continuously.' },
  { id: 'REQ-002', title: 'Broken Window Latch', boardingName: 'City View', roomNumber: '204', date: '2025-10-22', urgency: 'high', status: 'in-progress', description: 'Window cannot be locked securely. Cold air coming in.' },
  { id: 'REQ-003', title: 'Light Bulb Replacement', boardingName: 'Sunset Villa', roomNumber: '102', date: '2025-10-15', urgency: 'low', status: 'completed', description: 'Main bedroom light is flickering.' },
];

const MaintenancePage = () => {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'completed'
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  // Filter Logic: 'Pending' tab shows both 'pending' and 'in-progress'
  const filteredRequests = requests.filter(req => {
    if (activeTab === 'pending') return req.status === 'pending' || req.status === 'in-progress';
    return req.status === 'completed';
  });

  const handleStatusUpdate = (id, newStatus) => {
    // In a real app, call your API here
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  return (
    <OwnerLayout title="Maintenance Dashboard" subtitle="Manage property repairs and issues">
      
      {/* --- STATUS TABS --- */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex relative">
          {/* Animated Background Pill */}
          <motion.div
            className="absolute h-[calc(100%-8px)] top-1 rounded-lg bg-accent text-white shadow-sm z-0"
            layoutId="activeTabPill"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              width: activeTab === 'pending' ? '50%' : '50%',
              left: activeTab === 'pending' ? '4px' : '50%',
            }}
          />
          
          {/* Tab Buttons */}
          {['pending', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 px-8 py-2.5 rounded-lg text-sm font-semibold capitalize transition-colors duration-200 flex items-center gap-2 w-40 justify-center
                ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab === 'pending' ? <FaTools size={14} /> : <FaClipboardCheck size={14} />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <OwnerMaintenanceCard 
                key={request.id} 
                request={request} 
                onUpdateStatus={handleStatusUpdate}
              />
            ))
          ) : (
            /* Empty State */
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-gray-200"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                {activeTab === 'pending' ? <FaCheckCircle size={32} /> : <FaClipboardCheck size={32} />}
              </div>
              <h3 className="text-gray-800 font-bold text-lg mb-1">
                {activeTab === 'pending' ? "All Caught Up!" : "No History Yet"}
              </h3>
              <p className="text-gray-500 text-sm">
                {activeTab === 'pending' 
                  ? "You have no pending maintenance requests." 
                  : "Completed maintenance tasks will appear here."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </OwnerLayout>
  );
};

export default MaintenancePage;