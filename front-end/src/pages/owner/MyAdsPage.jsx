import React, { useState, useMemo } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import AdCard from "../../components/Owner/ads/AdCard";
import {
  StatusTab,
  EmptyState,
  STATUS_CONFIG,
} from "../../components/Owner/ads/MyAdsComponents";
import { mockAds, ownerData } from "../../data/mockData";

export default function MyAdsPage() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Data Processing
  const liveAds = useMemo(() => {
    const boostedIds = JSON.parse(sessionStorage.getItem("boostedAds") || "[]");
    return mockAds.map((ad) => ({
      ...ad,
      isBoosted: boostedIds.includes(ad.id) || ad.isBoosted || false,
    }));
  }, []);

  const counts = useMemo(() => {
    const acc = liveAds.reduce((a, ad) => {
      a[ad.status] = (a[ad.status] || 0) + 1;
      return a;
    }, {});
    acc["All"] = liveAds.length;
    return acc;
  }, [liveAds]);

  const filteredAds = liveAds.filter(
    (ad) => filter === "All" || ad.status === filter
  );

  // 2. Navigation Helpers
  const isNestedRoute = location.pathname !== "/ownerLayout/myAds";
  const handleCreate = () => navigate("createAd");

  if (isNestedRoute) return <Outlet />;

  return (
    <div className="pt-4 space-y-6 bg-light min-h-screen">
      <HeaderBar
        title="My Boarding Ads"
        subtitle="Manage, track performance, and edit your listings"
        notificationCount={ownerData?.notifications || 3}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      >
        <button
          className="px-6 py-3 font-black rounded-full bg-accent text-card-bg shadow-md hover:scale-[1.02] transition-all uppercase tracking-widest text-xs"
          onClick={handleCreate}
        >
          <i className="fas fa-plus mr-2" /> Create New Ad
        </button>
      </HeaderBar>

      {/* Filter Section */}
      <section className="p-6 rounded-report shadow-custom grid grid-cols-2 md:grid-cols-5 gap-4 bg-card-bg border border-light">
        {Object.keys(STATUS_CONFIG).map((status) => (
          <StatusTab
            key={status}
            status={status}
            count={counts[status] || 0}
            currentFilter={filter}
            setFilter={setFilter}
          />
        ))}
      </section>

      {/* Ads Section */}
      <section className="pb-10">
        <h2 className="text-2xl font-black mb-4 text-primary tracking-tight">
          {filter} Listings ({filteredAds.length})
        </h2>

        <div className="space-y-6">
          {filteredAds.length > 0 ? (
            filteredAds.map((ad) => (
              <AdCard
                key={ad.id}
                ad={ad}
                onEdit={(id) => navigate(`editAd/${id}`)}
                onBoostRedirect={(id) =>
                  navigate(`/ownerLayout/subscriptions/${id}`)
                }
                // Updated to use the hex color values if needed,
                // or you can update AdCard to accept a class name instead.
                getStatusBadgeStyle={(s) => ({
                  backgroundColor: `var(--${s.toLowerCase()})`,
                })}
              />
            ))
          ) : (
            <EmptyState filter={filter} onCreate={handleCreate} />
          )}
        </div>
      </section>
    </div>
  );
}
