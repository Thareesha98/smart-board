import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockAds } from "../../data/mockData"; // Adjust path if necessary

const useMyAdsLogic = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Data Processing
  const liveAds = useMemo(() => {
    // Check session storage for boosted ads (simulating persistence)
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

  const filteredAds = useMemo(() => {
    return liveAds.filter((ad) => filter === "All" || ad.status === filter);
  }, [liveAds, filter]);

  // 2. Handlers
  const handleCreate = () => navigate("createAd");
  const handleEdit = (id) => navigate(`editAd/${id}`);
  const handleBoostRedirect = (id) => navigate(`/owner/subscriptions/${id}`);
  
  // Helper for badge styling
  const getStatusBadgeStyle = (status) => {
    const statusColors = {
      Active: "var(--success)", // Ensure these CSS vars exist or use hex codes
      Pending: "var(--info)",
      Draft: "var(--muted)",
      Inactive: "var(--error)",
    };
    // Fallback if vars aren't set
    const fallbackColors = {
      Active: "#10B981", 
      Pending: "#3B82F6",
      Draft: "#6B7280",
      Inactive: "#EF4444",
    };
    
    return {
      backgroundColor: statusColors[status] || fallbackColors[status] || "#6B7280",
      color: "white",
    };
  };

  const isNestedRoute = location.pathname !== "/owner/myAds";

  return {
    filter,
    setFilter,
    filteredAds,
    counts,
    isNestedRoute,
    handleCreate,
    handleEdit,
    handleBoostRedirect,
    getStatusBadgeStyle,
  };
};

export default useMyAdsLogic;