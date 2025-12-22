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

  const isNestedRoute = location.pathname !== "/owner/myAds";
  const handleCreate = () => navigate("createAd");

  if (isNestedRoute) return <Outlet />;

  return (
    <div className="pt-4 space-y-6 bg-light min-h-screen">
      <HeaderBar
        title="My Listings"
        subtitle="Manage your boarding house advertisements"
        navBtnText="Create New Listing"
        navBtnPath="/owner/myAds/createAd"
      />

      {/* Filter Section: 
          Uses horizontal scrolling on mobile (overflow-x-auto) 
          and a 5-column grid on desktop (md:grid-cols-5) */}
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

      {/* Ads Section: Padding added for mobile screens */}
      <section className="px-4 md:px-0 pb-10">
        <h2 className="text-xl md:text-2xl font-black mb-4 text-primary tracking-tight">
          {filter} Listings ({filteredAds.length})
        </h2>

        <div className="space-y-4 md:space-y-6">
          {filteredAds.length > 0 ? (
            filteredAds.map((ad) => (
              <AdCard
                key={ad.id}
                ad={ad}
                onEdit={(id) => navigate(`editAd/${id}`)}
                onBoostRedirect={(id) =>
                  navigate(`/owner/subscriptions/${id}`)
                }
                getStatusBadgeStyle={(s) => ({
                  backgroundColor: `var(--${s.toLowerCase()})`,
                  color: 'white'
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