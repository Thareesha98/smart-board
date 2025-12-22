import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import AdStatsBar from '../components/ads/AdStatsBar';
import AdCard from '../components/ads/AdCard';
import AdDetailsModal from '../components/ads/AdDetailsModal';
import Toast from '../components/common/Toast';
import { useAds } from '../hooks/useAds';

const AdminAds = ({ onNavigate }) => {
  const { 
    ads, 
    stats, 
    currentTab, 
    setCurrentTab, 
    selectedAd, 
    setSelectedAd, 
    toast, 
    handleApprove, 
    handleReject 
  } = useAds();

  return (
    <AdminLayout 
      onNavigate={onNavigate} 
      activePage="ads" 
      title="Ad Approvals" 
      subtitle="Review and manage property listings"
    >
      {/* Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => {}} 
        />
      )}

      {/* Summary Stats */}
      <AdStatsBar stats={stats} />

      <div className="bg-card-bg rounded-large shadow-custom p-6 min-h-[60vh]">
        {/* Tab Navigation */}
        <div className="flex gap-8 border-b border-gray-100 mb-8 px-2">
          {['pending', 'approved', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`pb-4 px-2 font-bold capitalize transition-all relative ${
                currentTab === tab 
                  ? 'text-accent' 
                  : 'text-text-muted hover:text-text-dark'
              }`}
            >
              {tab}
              {currentTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Ads Grid */}
        {ads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <AdCard 
                key={ad.id} 
                ad={ad} 
                onReview={() => setSelectedAd(ad)} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted">
            <i className="fas fa-folder-open text-5xl mb-4 opacity-20"></i>
            <p className="italic font-medium">No {currentTab} advertisements found.</p>
          </div>
        )}
      </div>

      {/* Detail View Modal */}
      {selectedAd && (
        <AdDetailsModal 
          ad={selectedAd} 
          onClose={() => setSelectedAd(null)} 
          onApprove={handleApprove} 
          onReject={handleReject} 
        />
      )}
    </AdminLayout>
  );
};

export default AdminAds;