// src/pages/ReportsPage.jsx
import { useState } from 'react';
import Card from '../components/UI/Card.jsx';
import Button from '../components/UI/Button.jsx';
import Pagination from '../components/UserManagement/Pagination.jsx'; 
import useReportsData from '../hooks/useReportsData.js';
import Modal from '../components/UI/Modal.jsx';

// Import Reports-specific components
import ReportStatCard from '../components/Reports/ReportStatCard.jsx';
import ReportTable from '../components/Reports/ReportTable.jsx';
import CategoryFilter from '../components/Reports/CategoryFilter.jsx';
import ReportDetailsModal from '../components/Reports/ReportDetailsModal.jsx';
import DismissalModal from '../components/Reports/DismissalModal.jsx';
import SuspendUserModal from '../components/Reports/SuspendUserModal.jsx';


const tabData = [
  { key: 'pending', label: 'Pending', icon: 'clock', color: 'accent' },
  { key: 'investigating', label: 'Investigating', icon: 'search', color: 'info' },
  { key: 'resolved', label: 'Resolved', icon: 'check-double', color: 'success' },
];

const ReportsPage = () => {
  const { 
    reports, 
    loading, 
    currentPage, 
    totalPages, 
    currentTab, 
    currentCategory,
    stats,
    changeTab, 
    changePage, 
    changeCategory,
    setSearch,
    loadReports,
    handleDismiss, 
    handleSuspend,
  } = useReportsData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDismissalModalOpen, setIsDismissalModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  
  // --- Search Handler ---
  const handleSearchClick = () => {
      loadReports();
  };
  
  // --- Report Actions ---
  const handleView = (report) => {
    setSelectedReport(report);
    setIsDetailsModalOpen(true);
  };
  
  const openDismissal = (report) => {
      setSelectedReport(report);
      setIsDismissalModalOpen(true);
  };
  
  const openSuspend = (reportedUser, report) => {
      setSelectedReport({ ...report, reported: reportedUser }); // Pass the full context
      setIsSuspendModalOpen(true);
  };
  
  // Action submissions from Modals
  const submitDismissal = (reportId, reason) => {
      handleDismiss(reportId, reason);
      setIsDetailsModalOpen(false); // Close details modal if open
  };

  const submitSuspension = (userEmail, duration, reason) => {
      handleSuspend(userEmail, duration, reason);
      setIsDetailsModalOpen(false); // Close details modal if open
  };


  return (
    <div>
      <h2 className="text-3xl font-bold text-text-dark mb-4">Reports Management</h2>
      <p className="text-text-muted mb-6">Investigate and moderate user-submitted reports for safety and compliance.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <ReportStatCard title="Total Reports" value={stats.totalReports || 0} icon="chart-line" color="info" />
        <ReportStatCard title="Pending Review" value={stats.pending || 0} icon="clock" color="accent" />
        <ReportStatCard title="Resolved Reports" value={stats.resolved || 0} icon="check-double" color="success" />
      </div>

      <Card className="p-4 md:p-6">
        
        {/* Tab Navigation */}
        <div className="flex border-b border-background-light overflow-x-auto mb-6">
            {tabData.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => changeTab(tab.key)}
                    className={`flex items-center space-x-2 py-3 px-4 text-sm font-medium transition-colors border-b-2 
                        ${currentTab === tab.key 
                          ? 'border-primary text-primary' 
                          : 'border-transparent text-text-muted hover:text-text-dark'
                        }`}
                >
                    <i className={`fas fa-${tab.icon}`} />
                    <span>{tab.label}</span>
                    <span className="font-bold">({stats[tab.key] || 0})</span>
                </button>
            ))}
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <CategoryFilter currentCategory={currentCategory} onCategoryChange={changeCategory} />
            
            <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search report titles or users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                        className="w-full pl-10 pr-4 py-2 border border-background-light rounded-card focus:ring-primary focus:border-primary transition"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
                </div>
                <Button variant="primary" onClick={handleSearchClick} className="hidden sm:block">Search</Button>
            </div>
        </div>

        {/* Report List (Table) */}
        {loading ? (
          <div className="text-center py-12 text-text-muted">
            <i className="fas fa-spinner fa-spin mr-2" /> Loading Reports...
          </div>
        ) : reports.length > 0 ? (
          <ReportTable 
            reports={reports} 
            currentTab={currentTab}
            onView={handleView}
            onDismiss={openDismissal}
            onSuspend={openSuspend}
          />
        ) : (
          <div className="text-center py-12 text-text-muted">
            No {currentTab} reports found for this filter.
          </div>
        )}

        {/* Pagination */}
        {reports.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={changePage} 
          />
        )}
      </Card>

      {/* --- MODALS --- */}
      
      {/* Report Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title="Report Details">
        {selectedReport && (
          <ReportDetailsModal 
            report={selectedReport} 
            onClose={() => setIsDetailsModalOpen(false)}
            onDismiss={openDismissal}
            onSuspend={openSuspend}
          />
        )}
      </Modal>
      
      {/* Report Dismissal Modal */}
      <DismissalModal 
        isOpen={isDismissalModalOpen}
        report={selectedReport}
        onClose={() => setIsDismissalModalOpen(false)}
        onSubmit={submitDismissal}
      />
      
      {/* Suspend User Modal */}
      <SuspendUserModal 
        isOpen={isSuspendModalOpen}
        reportedUser={selectedReport?.reported}
        report={selectedReport}
        onClose={() => setIsSuspendModalOpen(false)}
        onSubmit={submitSuspension}
      />
    </div>
  );
};

export default ReportsPage;