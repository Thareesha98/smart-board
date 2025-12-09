import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar.jsx";
import AdCard from "../../components/Owner/ads/AdCard.jsx";

import { mockAds, ownerData } from "../../data/mockData.js";

// Helper function moved outside the main component
const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "Active":
      return { backgroundColor: "var(--success)", color: "white" };
    case "Pending":
      return { backgroundColor: "var(--info)", color: "white" };
    case "Draft":
      return { backgroundColor: "var(--muted)", color: "white" };
    case "Inactive":
      return { backgroundColor: "var(--error)", color: "white" };
    default:
      return { backgroundColor: "var(--light)", color: "var(--text)" };
  }
};

const StatusTab = ({ status, count, currentFilter, setFilter }) => {
  const isActive = currentFilter === status;
  const color = getStatusBadgeStyle(status).backgroundColor;

  return (
    <button
      className={`flex items-center justify-center p-3 rounded-2xl transition-all duration-300 relative w-full ${
        isActive ? "shadow-md scale-[1.05]" : "bg-opacity-80"
      }`}
      style={{
        backgroundColor: isActive ? color : "var(--light)",
        color: isActive ? "white" : "var(--text)",
      }}
      onClick={() => setFilter(status)}
    >
      <span className="font-semibold text-lg">{status}</span>
      <span
        className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full`}
        style={{
          backgroundColor: isActive ? "var(--primary)" : "var(--accent)",
          color: "white",
        }}
      >
        {count}
      </span>
    </button>
  );
};

const EmptyState = ({ filter, handleCreateNewAd }) => (
  <div
    className="text-center p-12 rounded-3xl shadow-lg"
    style={{ backgroundColor: "var(--card-bg)" }}
  >
    <i
      className="fas fa-clipboard-list text-6xl mb-4"
      style={{ color: "var(--muted)" }}
    ></i>
    <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
      No {filter} Listings Found
    </h3>
    <p className="text-base mb-6" style={{ color: "var(--muted)" }}>
      {filter === "All"
        ? "It looks like you haven't created any boarding advertisements yet. Start now!"
        : `You currently have no listings in the **${filter}** status.`}
    </p>
    <button
      className="px-8 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg"
      style={{ backgroundColor: "var(--primary)", color: "var(--card-bg)" }}
      onClick={handleCreateNewAd}
    >
      <i className="fas fa-plus mr-2"></i> Create Your First Ad
    </button>
  </div>
);

const MyAdsPage = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filteredAds = mockAds.filter((ad) =>
    filter === "All" ? true : ad.status === filter
  );

  const handleEditClick = (adId) => {
    // Navigate to the nested route: /ownerLayout/myAds/editAd/:adId
    navigate(`/ownerLayout/editAd/${adId}`);
  };

  // 🌟 NEW HANDLER FOR REDIRECTION to Subscription Plans
  const handleBoostRedirect = (adId) => {
    // Navigate to the dedicated subscription path, passing the ad ID
    navigate(`/ownerLayout/subscriptions/${adId}`);
  };

  const handleCreateNewAd = () => {
    // Navigate to the nested route: /ownerLayout/myAds/createAd
    navigate("/ownerLayout/createAd");
  };

  const getStatusCounts = () => {
    return mockAds.reduce((acc, ad) => {
      acc[ad.status] = (acc[ad.status] || 0) + 1;
      acc["All"] = (acc["All"] || 0) + 1;
      return acc;
    }, {});
  };

  const counts = getStatusCounts();
  const notificationCount = ownerData?.notifications || 3;

  return (
    <div className="pt-4 space-y-6" style={{ backgroundColor: "var(--light)" }}>

        <>
          <HeaderBar
            title="My Boarding Ads"
            subtitle="Manage, track performance, and edit your listings"
            notificationCount={notificationCount}
            userAvatar={ownerData.avatar}
            userName={ownerData.firstName}
          >
            <button
              className="px-6 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--card-bg)",
              }}
              onClick={handleCreateNewAd}
            >
              <i className="fas fa-plus mr-2"></i>
              Create New Ad
            </button>
          </HeaderBar>

          {/* Status Filter Tabs */}
          <section
            className="mb-8 p-6 rounded-3xl shadow-lg grid grid-cols-2 md:grid-cols-5 gap-4"
            style={{ backgroundColor: "var(--card-bg)" }}
          >
            <StatusTab
              status="All"
              count={counts["All"] || 0}
              currentFilter={filter}
              setFilter={setFilter}
            />
            <StatusTab
              status="Active"
              count={counts["Active"] || 0}
              currentFilter={filter}
              setFilter={setFilter}
            />
            <StatusTab
              status="Pending"
              count={counts["Pending"] || 0}
              currentFilter={filter}
              setFilter={setFilter}
            />
            <StatusTab
              status="Draft"
              count={counts["Draft"] || 0}
              currentFilter={filter}
              setFilter={setFilter}
            />
            <StatusTab
              status="Inactive"
              count={counts["Inactive"] || 0}
              currentFilter={filter}
              setFilter={setFilter}
            />
          </section>

          {/* Ads List */}
          <section>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--primary)" }}
            >
              {filter} Listings ({filteredAds.length})
            </h2>
            <div className="space-y-6">
              {filteredAds.length > 0 ? (
                filteredAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    onEdit={handleEditClick}
                    onBoostRedirect={handleBoostRedirect} // 🌟 Pass redirect handler
                    getStatusBadgeStyle={getStatusBadgeStyle}
                  />
                ))
              ) : (
                <EmptyState
                  filter={filter}
                  handleCreateNewAd={handleCreateNewAd}
                />
              )}
            </div>
          </section>
        </>
      
    </div>
  );
};

export default MyAdsPage;
