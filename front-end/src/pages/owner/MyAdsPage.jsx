import React from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import AdCard from "../../components/Owner/ads/AdCard";
import {
  StatusTab,
  EmptyState,
  STATUS_CONFIG,
} from "../../components/Owner/ads/MyAdsComponents";
import useMyAdsLogic from "../../hooks/owner/useMyAdsLogic";

export default function MyAdsPage() {
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
  } = useMyAdsLogic();

  // If showing a nested route (e.g. Create/Edit), render that instead
  if (isNestedRoute) return <Outlet />;

  return (
    <div className="pt-4 space-y-6 bg-light min-h-screen">
      <HeaderBar
        title="My Listings"
        subtitle="Manage your boarding house advertisements"
        navBtnText="Create New Listing"
        navBtnPath="/owner/myAds/createAd"
      />

      {/* Filter Section */}
      <section className="px-4 md:px-0">
        <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 p-4 md:p-6 rounded-report shadow-custom bg-card-bg border border-light custom-scrollbar">
          {Object.keys(STATUS_CONFIG).map((status) => (
            <div key={status} className="min-w-[140px] md:min-w-0 flex-shrink-0">
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