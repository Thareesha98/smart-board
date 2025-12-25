import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClipboardCheck, FaTools, FaCheckCircle } from 'react-icons/fa';

// Components
import HeaderBar from '../../components/Owner/common/HeaderBar';
import MaintenanceCard from '../../components/owner/maintenance/OwnerMaintenanceCard';

// Hook
import useMaintenanceLogic from '../../hooks/owner/useMaintenanceLogic';

const MaintenancePage = () => {
  // Use the Custom Hook
  const {
    filteredRequests,
    activeTab,
    setActiveTab,
    handleStatusUpdate,
    counts,
    ownerData,
  } = useMaintenanceLogic();

  return (
    <div className="pt-4 space-y-8 min-h-screen bg-light pb-10">
      <HeaderBar
        title="Maintenance"
        subtitle="Manage property repairs and track issue resolution."
        notificationCount={counts.pending}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      {/* Filter Tabs (Preserving your Pill Design) */}
      <section className="flex justify-center mb-4">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex relative">
          {/* Animated Background Pill */}
          <motion.div
            className="absolute h-[calc(100%-8px)] top-1 rounded-lg bg-accent text-white shadow-sm z-0"
            layoutId="activeTabPill"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              width: '50%',
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
      </section>

      {/* Requests Grid */}
      <section className="space-y-4 px-6">
        <motion.h3
          layout
          className="text-2xl font-black text-primary uppercase tracking-tight ml-2"
        >
          {activeTab} Tasks
        </motion.h3>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <MaintenanceCard 
                  key={request.id} 
                  request={request} 
                  onUpdateStatus={handleStatusUpdate}
                />
              ))
            ) : (
              // Empty State (Preserving your design)
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
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
      </section>
    </div>
  );
};

export default MaintenancePage;