// src/api/ads.js
import { initialAdsData } from '../data/mockAdsData.js';

// Internal state to simulate database changes
let currentAdsState = initialAdsData;

const ADS_PER_PAGE = 6;

// Helper to calculate statistics
export const getAdStats = () => {
    return {
        totalAds: currentAdsState.pending.length + currentAdsState.approved.length + currentAdsState.rejected.length,
        pending: currentAdsState.pending.length,
        approved: currentAdsState.approved.length,
    };
}

// Simulates fetching ads with filtering and pagination
export const fetchAds = async (tab, page, search = '') => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API latency
  
  let ads = currentAdsState[tab] || [];
  
  // Apply Search/Filter
  if (search) {
      const term = search.toLowerCase();
      ads = ads.filter(ad => 
          ad.title.toLowerCase().includes(term) || 
          ad.location.toLowerCase().includes(term)
      );
  }

  // Apply Pagination
  const startIndex = (page - 1) * ADS_PER_PAGE;
  const paginatedAds = ads.slice(startIndex, startIndex + ADS_PER_PAGE);
  const totalPages = Math.ceil(ads.length / ADS_PER_PAGE);
  
  return {
    ads: paginatedAds,
    totalPages: totalPages,
    totalCount: ads.length,
  };
};

// Simulates approving an ad
export const approveAd = async (adId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Find ad in pending and move to approved (in memory)
    const pendingIndex = currentAdsState.pending.findIndex(ad => ad.id === adId);
    if (pendingIndex !== -1) {
        const adToApprove = currentAdsState.pending.splice(pendingIndex, 1)[0];
        adToApprove.status = 'approved';
        adToApprove.dateApproved = new Date().toISOString().split('T')[0];
        currentAdsState.approved.push(adToApprove);
        return { success: true, message: `Ad ID ${adId} successfully approved.` };
    }
    return { success: false, message: `Ad ID ${adId} not found in pending list.` };
};

// Simulates rejecting an ad
export const rejectAd = async (adId, reason) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Find ad in pending and move to rejected (in memory)
    const pendingIndex = currentAdsState.pending.findIndex(ad => ad.id === adId);
    if (pendingIndex !== -1) {
        const adToReject = currentAdsState.pending.splice(pendingIndex, 1)[0];
        adToReject.status = 'rejected';
        adToReject.rejectionReason = reason;
        currentAdsState.rejected.push(adToReject);
        return { success: true, message: `Ad ID ${adId} successfully rejected.` };
    }
    return { success: false, message: `Ad ID ${adId} not found in pending list.` };
};

export const deleteAd = async (adId) => {
    await new Promise(resolve => setTimeout(resolve, 200));

    let found = false;
    ['pending', 'approved', 'rejected'].forEach(tab => {
        const index = currentAdsState[tab].findIndex(ad => ad.id === adId);
        if (index !== -1) {
            currentAdsState[tab].splice(index, 1);
            found = true;
        }
    });

    return { success: found, message: found ? `Ad ID ${adId} deleted.` : `Ad ID ${adId} not found.` };
}