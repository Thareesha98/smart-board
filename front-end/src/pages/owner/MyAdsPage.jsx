import React from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useOwnerAuth } from "../../context/owner/OwnerAuthContext"; // ✅ Import Context
import HeaderBar from "../../components/Owner/common/HeaderBar";
import AdCard from "../../components/Owner/ads/AdCard";
import {
  StatusTab,
  EmptyState,
  STATUS_CONFIG,
} from "../../components/Owner/ads/MyAdsComponents";
import useMyAdsLogic from "../../hooks/owner/useMyAdsLogic";

export default function MyAdsPage() {
  // ✅ Get Current Owner
  const { currentOwner } = useOwnerAuth();

  const {
    filter,
    setFilter,
    filteredAds,
    counts,
    isNestedRoute,
    handleCreate,
    handleEdit,
    handleBoostRedirect,
    getStatusBadgeStyle,
    isLoading,
    error,
  } = useMyAdsLogic();

  if (isNestedRoute) return <Outlet />;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="text-xl font-black text-primary animate-pulse">
          Loading Your Listings...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light text-center">
        <div className="text-xl font-black text-error mb-2">Oops!</div>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-4 space-y-6 bg-light min-h-screen">
      {/* ✅ Updated HeaderBar with Context Data */}
      <HeaderBar
        title="My Listings"
        subtitle="Manage your boarding house advertisements"
        navBtnText="Create New Listing"
        navBtnPath="/owner/myAds/createAd"
        userAvatar={currentOwner?.avatar}
        userName={currentOwner?.firstName}
      />

      {/* Filter Section */}
      <section className="px-4 md:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-4 md:p-6 rounded-report shadow-custom bg-card-bg border border-light">
          {Object.keys(STATUS_CONFIG).map((status) => (
            <div
              key={status}
              className="min-w-[140px] md:min-w-0 flex-shrink-0"
            >
              <StatusTab
                status={status}
                count={counts[status] || 0}
                currentFilter={filter}
                setFilter={setFilter}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Ads Section */}
      <section className="px-4 md:px-0 pb-10">
        <motion.h2
          layout
          className="text-xl md:text-2xl font-black mb-4 text-primary tracking-tight"
        >
          {filter} Listings ({filteredAds.length})
        </motion.h2>

        <motion.div layout className="space-y-4 md:space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredAds.length > 0 ? (
              filteredAds.map((ad) => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  onEdit={handleEdit}
                  onBoostRedirect={handleBoostRedirect}
                  getStatusBadgeStyle={getStatusBadgeStyle}
                />
              ))
            ) : (
              <EmptyState filter={filter} onCreate={handleCreate} />
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
