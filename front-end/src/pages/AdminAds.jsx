import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import AdStatsBar from '../components/ads/AdStatsBar';
import AdCard from '../components/ads/AdCard';
import AdDetailsModal from '../components/ads/AdDetailsModal';
import Toast from '../components/common/Toast';
import { useAds } from '../hooks/useAds';

const AdminAds = ({ onNavigate }) => {
  const { 
    ads, stats, currentTab, setCurrentTab, selectedAd, setSelectedAd, 
    toast, handleApprove, handleReject 
  } = useAds();

  return (
    <AdminLayout 
      onNavigate={onNavigate} 
      activePage="ads" 
      title="Ad Approvals" 
      subtitle="Review property listings"
    >
      {toast && <Toast message={toast.message} type={toast.type} />}

      <AdStatsBar stats={stats} />

      <div className="bg-card-bg rounded-[25px] shadow-sm p-4 lg:p-8 min-h-[60vh]">
        {/* MOBILE FRIENDLY TABS: Overflow-x-auto allows swiping on mobile */}
        <div className="flex gap-6 lg:gap-10 border-b border-gray-100 mb-6 lg:mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          {['pending', 'approved', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`pb-4 px-1 font-bold capitalize transition-all relative text-sm lg:text-base ${
                currentTab === tab ? 'text-accent' : 'text-text-muted hover:text-text-dark'
              }`}
            >
              {tab}
              {currentTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        {ads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} onReview={() => setSelectedAd(ad)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted">
            <i className="fas fa-folder-open text-5xl mb-4 opacity-20"></i>
            <p className="italic font-medium">No {currentTab} ads found.</p>
          </div>
        )}
      </div>

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