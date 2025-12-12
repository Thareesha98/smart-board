// src/pages/AdApprovalsPage.jsx
import { useState } from 'react';
import Card from '../components/UI/Card.jsx';
import Button from '../components/UI/Button.jsx';
import Pagination from '../components/UserManagement/Pagination.jsx'; // Reusing existing Pagination
import useAdsData from '../hooks/useAdsData.js';
import AdStatCard from '../components/AdApprovals/AdStatCard.jsx';
import TabNavigation from '../components/AdApprovals/TabNavigation.jsx';
import AdCard from '../components/AdApprovals/AdCard.jsx';
import Modal from '../components/UI/Modal.jsx';
import AdDetailsModal from '../components/AdApprovals/AdDetailsModal.jsx';
import RejectionModal from '../components/AdApprovals/RejectionModal.jsx';

const AdApprovalsPage = () => {
  const { 
    ads, 
    loading, 
    currentPage, 
    totalPages, 
    currentTab, 
    search, 
    stats,
    changeTab, 
    changePage, 
    handleApprove, 
    handleReject,
    handleSearch,
    handleDelete
  } = useAdsData();
  
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [searchTerm, setSearchTerm] = useState(search);
  
  // Handlers for Modals
  const handleViewAd = (ad) => {
    setSelectedAd(ad);
    setIsDetailsModalOpen(true);
  };
  
  const openRejectionModal = (ad) => {
    setSelectedAd(ad);
    setIsRejectionModalOpen(true);
  };
  
  const handleRejectSubmit = (adId, reason) => {
    handleReject(adId, reason);
    setIsRejectionModalOpen(false);
    setIsDetailsModalOpen(false); // Close details modal if it was open
  };
  
  const handleLocalApprove = (adId) => {
      if(confirm('Are you sure you want to approve this advertisement?')) {
        handleApprove(adId);
        setIsDetailsModalOpen(false);
      }
  }

  const tabAdjectives = { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' };

  return (
    <div>
      <h2 className="text-3xl font-bold text-text-dark mb-4">Advertisement Approvals</h2>
      <p className="text-text-muted mb-6">Review, approve, or reject new boarding advertisements.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <AdStatCard title="Total Ads" value={stats.totalAds || 0} icon="chart-line" color="info" />
        <AdStatCard title="Pending Review" value={stats.pending || 0} icon="hourglass-half" color="accent" />
        <AdStatCard title="Approved Ads" value={stats.approved || 0} icon="check-circle" color="success" />
      </div>

      <Card className="p-4 md:p-6">
        
        {/* Tab Navigation */}
        <TabNavigation currentTab={currentTab} onTabChange={changeTab} stats={stats} />

        {/* Search Bar */}
        <div className="flex items-center space-x-3 mb-6">
            <div className="relative flex-1 max-w-lg">
              <input
                type="text"
                placeholder={`Search ${currentTab} ads by title or location...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                className="w-full pl-10 pr-4 py-2 border border-background-light rounded-card focus:ring-primary focus:border-primary transition"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            </div>
            <Button variant="outline" onClick={() => handleSearch(searchTerm)}>Search</Button>
            <Button variant="ghost" onClick={() => { setSearchTerm(''); handleSearch(''); }}>Clear</Button>
        </div>

        {/* Ad Grid */}
        {loading ? (
          <div className="text-center py-12 text-text-muted">
            <i className="fas fa-spinner fa-spin mr-2" /> Loading {tabAdjectives[currentTab]} Advertisements...
          </div>
        ) : ads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map(ad => (
              <AdCard 
                key={ad.id} 
                ad={ad}
                currentTab={currentTab}
                onApprove={handleLocalApprove}
                onReject={openRejectionModal}
                onViewDetails={handleViewAd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-text-muted">
            No {tabAdjectives[currentTab]} advertisements found.
          </div>
        )}

        {/* Pagination */}
        {ads.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={changePage} 
          />
        )}
      </Card>

      {/* Ad Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title="Ad Details">
        {selectedAd && (
          <AdDetailsModal 
            ad={selectedAd} 
            onClose={() => setIsDetailsModalOpen(false)}
            onApprove={handleLocalApprove}
            onReject={openRejectionModal}
            onDelete={handleDelete}
          />
        )}
      </Modal>
      
      {/* Ad Rejection Modal */}
      <RejectionModal 
        isOpen={isRejectionModalOpen}
        ad={selectedAd}
        onClose={() => setIsRejectionModalOpen(false)}
        onSubmit={handleRejectSubmit}
      />
    </div>
  );
};

export default AdApprovalsPage;