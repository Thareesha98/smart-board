import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClipboardCheck, FaTools, FaCheckCircle, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Components
import HeaderBar from '../../components/Owner/common/HeaderBar';
import OwnerMaintenanceCard from '../../components/owner/maintenance/OwnerMaintenanceCard';

// Hook
import useMaintenanceLogic from '../../hooks/owner/useMaintenanceLogic';

const MaintenancePage = () => {
  const {
    paginatedRequests,
    activeTab,
    setActiveTab,
    handleStatusUpdate,
    counts,
    ownerData,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
    error
  } = useMaintenanceLogic();

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light flex flex-col items-center justify-center text-red-500">
        <p className="font-bold mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="pt-4 space-y-8 min-h-screen bg-light pb-10">
      <HeaderBar
        title="Maintenance"
        subtitle="Manage property repairs and track issue resolution."
        notificationCount={counts.pending}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
        navBtnText="Log Issue"
        onNavBtnClick={() => alert("Open Log Modal")}
      />

      {/* --- CONTROLS SECTION --- */}
      <section className="px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Tab Switcher */}
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex relative w-full md:w-auto">
          <motion.div
            className="absolute h-[calc(100%-8px)] top-1 rounded-lg bg-accent text-white shadow-sm z-0"
            layoutId="activeTabPill"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              width: '50%',
              left: activeTab === 'pending' ? '4px' : '50%',
            }}
          />
          {['pending', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 flex-1 md:w-40 py-2.5 rounded-lg text-sm font-semibold capitalize transition-colors duration-200 flex items-center justify-center gap-2
                ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab === 'pending' ? <FaTools size={14} /> : <FaClipboardCheck size={14} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search room, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
          />
        </div>
      </section>

      {/* --- GRID SECTION --- */}
      <section className="space-y-4 px-6">
        <div className="flex justify-between items-end">
          <motion.h3 layout className="text-2xl font-black text-primary uppercase tracking-tight ml-2">
            {activeTab} Tasks
          </motion.h3>
          <span className="text-sm text-gray-400 font-medium mb-1">
            Page {currentPage} of {totalPages || 1}
          </span>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((request) => (
                <OwnerMaintenanceCard 
                  key={request.id} 
                  request={request} 
                  onUpdateStatus={handleStatusUpdate}
                />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-gray-200"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  {searchQuery ? <FaSearch size={24} /> : (activeTab === 'pending' ? <FaCheckCircle size={32} /> : <FaClipboardCheck size={32} />)}
                </div>
                <h3 className="text-gray-800 font-bold text-lg mb-1">
                  {searchQuery ? "No Matches Found" : (activeTab === 'pending' ? "All Caught Up!" : "No History Yet")}
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- PAGINATION CONTROLS --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 pt-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed bg-white/50"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>

            <span className="px-4 py-1.5 bg-white rounded-lg border border-gray-200 text-sm font-semibold text-gray-600">
              Page {currentPage}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed bg-white/50"
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