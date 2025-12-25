import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClipboardCheck, FaTools, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Components
import HeaderBar from '../../components/Owner/common/HeaderBar';
import MaintenanceCard from '../../components/Owner/Maintenance/MaintenanceCard.jsx';

// Hook
import useMaintenanceLogic from '../../hooks/owner/useMaintenanceLogic';

const MaintenancePage = () => {
  // Use the Custom Hook
  const {
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
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((request) => (
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

        {/* --- PAGINATION CONTROLS --- */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8 pt-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-lg font-semibold text-sm transition-colors
                  ${currentPage === pageNum 
                    ? 'bg-accent text-white shadow-md' 
                    : 'bg-transparent text-gray-600 hover:bg-white border border-transparent hover:border-gray-200'}`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MaintenancePage;