import React from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import AdCard from "../../components/Owner/ads/AdCard";
import BoardingCardSkeleton from "../../components/Owner/ads/BoardingCardSkeleton"; // ✅ Imported
import {
  StatusTab,
  EmptyState,
  STATUS_CONFIG,
} from "../../components/Owner/ads/MyAdsComponents";
import useMyAdsLogic from "../../hooks/owner/useMyAdsLogic";

export default function MyAdsPage() {
  const { currentOwner } = useOwnerAuth();

  const {
    filter,
    setFilter,
    filteredAds,
    counts,
    isNestedRoute,
    handleCreate,
    handleEdit,
    toggleAdStatus,
    handleBoostRedirect,
    getStatusBadgeStyle,
    isLoading,
    error,
  } = useMyAdsLogic();

  if (isNestedRoute) return <Outlet />;

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light text-center">
        <div className="text-xl font-black text-error mb-2">Oops!</div>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  // ✅ MAIN RENDER (Handles both Loading & Success)
  return (
    <div className="pt-4 space-y-6 bg-light min-h-screen">
      {/* 1. Header is ALWAYS visible (No flickering) */}
      <HeaderBar
        title="My Listings"
        subtitle="Manage your boarding house advertisements"
        navBtnText="Create New Listing"
        navBtnPath="/owner/myAds/createAd"
        userAvatar={currentOwner?.avatar}
        userName={currentOwner?.firstName}
      />

      {/* 2. Filter Tabs are ALWAYS visible */}
      {/* 2. Filter Tabs are ALWAYS visible */}
      <section className="px-4 md:px-0">
        <div className="flex overflow-x-auto gap-3 md:gap-4 p-4 md:p-6 rounded-report shadow-custom bg-card-bg border border-light no-scrollbar">
          {Object.keys(STATUS_CONFIG).map((status) => (
            <div
              key={status}
              // flex-1 makes them fill space on desktop
              // min-w-[120px] ensures they don't get squished on mobile
              className="flex-1 min-w-[120px] md:min-w-0 flex-shrink-0" 
            >
              <StatusTab
                status={status}
                count={isLoading ? "-" : counts[status] || 0}
                currentFilter={filter}
                setFilter={setFilter}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Content Area: Switches between Skeletons and Real Ads */}
      <section className="px-4 md:px-0 pb-10">
        <motion.h2
          layout
          className="text-xl md:text-2xl font-black mb-4 text-primary tracking-tight"
        >
          {isLoading
            ? "Loading Properties..."
            : `${filter} Listings (${filteredAds.length})`}
        </motion.h2>

        <div className="space-y-4 md:space-y-6">
          {isLoading ? (
            // 💀 LOADING STATE: Show Skeletons
            <div className="space-y-4 md:space-y-6">
              {[1, 2, 3].map((n) => (
                <BoardingCardSkeleton key={n} />
              ))}
            </div>
          ) : (
            // 🟢 LOADED STATE: Show Real Ads
            <AnimatePresence mode="popLayout">
              {filteredAds.length > 0 ? (
                filteredAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    onEdit={handleEdit}
                    onToggleStatus={toggleAdStatus}
                    onBoostRedirect={handleBoostRedirect}
                    getStatusBadgeStyle={getStatusBadgeStyle}
                  />
                ))
              ) : (
                <EmptyState filter={filter} onCreate={handleCreate} />
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
