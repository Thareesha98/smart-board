import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// In a real project, you would import axios from 'axios';
// For this mock, we simulate axios behavior:
const axios = { 
    post: (url, data) => new Promise(resolve => 
        setTimeout(() => resolve({ data: { success: true, message: 'Boost initiated.' } }), 500)
    ),
    get: (url) => new Promise(resolve => 
        setTimeout(() => resolve({ data: { isBoosted: false } }), 300)
    ),
};


// =======================================================
// HELPER COMPONENTS (Required to be defined in MyAdsPage.jsx)
// =======================================================

const StatBox = ({ icon, label, value, color }) => (
  <div className="flex flex-col items-center">
    <i className={`${icon} text-xl mb-1`} style={{ color }}></i>
    <strong className="text-xl font-bold" style={{ color: "var(--text)" }}>
      {value}
    </strong>
    <span className="text-xs" style={{ color: "var(--muted)" }}>
      {label}
    </span>
  </div>
);

// Note: getStatusBadgeStyle is assumed to be defined in MyAdsPage.jsx as well

// =======================================================
// FULL AdCard COMPONENT
// =======================================================

const AdCard = ({ ad, onEdit, getStatusBadgeStyle }) => {
  const navigate = useNavigate();
  // State for the live status (will be populated by useEffect)
  const [isBoosted, setIsBoosted] = useState(ad.isBoosted || false); 
  const [isBoosting, setIsBoosting] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); // For initial data fetch

  // 1. useEffect for Initial Status Check (Simulating API GET)
  useEffect(() => {
    const fetchAdStatus = async () => {
      setIsLoading(true);
      
      try {
        // SIMULATED AXIOS GET: Check if this ad is already boosted in the database
        // We use ad.id to fetch status specifically for this card.
        const response = await axios.get(`/api/ads/status/${ad.id}`); 
        
        if (response.data && response.data.isBoosted) {
          setIsBoosted(response.data.isBoosted);
        }
      } catch (error) {
        console.error(`Failed to fetch status for ad ${ad.id}`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdStatus();
  }, [ad.id]); // Re-run if the ad ID changes (not expected in this component, but good practice)


  // 2. Event Handler for the Boost Action (Simulating API POST)
  const handleBoostClick = async () => {
    // Confirmation Dialog
    const confirmation = window.confirm(
      "Do you need to boost this ad? Boosting will increase its visibility. This action is irreversible."
    );

    if (!confirmation) {
      alert("Ad boost cancelled.");
      return;
    }
    
    setIsBoosting(true);

    try {
      // SIMULATED AXIOS POST: Send request to the backend
      const response = await axios.post('/api/ads/boost', {
        adId: ad.id,
        duration: '30_DAYS'
      });

      if (response.data.success) { 
        // Update local state only on successful API response
        setIsBoosted(true); 
        alert(`SUCCESS: Ad ID ${ad.id} is now BOOSTED!`);
      } else {
         alert(`Boost failed: ${response.data.message || 'Payment processing error.'}`);
      }

    } catch (error) {
      console.error("Boost API Error:", error);
      alert("ERROR: Could not connect to the boost service. Please try again.");
    } finally {
      setIsBoosting(false);
    }
  };


  // 3. Dynamic Boost Button Logic
  const BoostButton = () => {
    if (isLoading) {
        return (
            <button disabled className="px-4 py-2 text-sm font-semibold rounded-2xl" 
                    style={{ backgroundColor: "var(--light)", color: "var(--muted)" }}>
                <i className="fas fa-spinner fa-spin mr-2"></i> Loading...
            </button>
        );
    }

    if (isBoosted) {
      return (
        <button
          className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--card-bg)",
            pointerEvents: 'none',
          }}
        >
          <i className="fas fa-bolt mr-2"></i> Boosted
        </button>
      );
    }

    if (isBoosting) {
      return (
        <button
          className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300"
          style={{ backgroundColor: "var(--muted)", color: "var(--card-bg)" }}
          disabled
        >
          <i className="fas fa-circle-notch fa-spin mr-2"></i> Processing...
        </button>
      );
    }

    return (
      <button
        className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300 shadow-md hover:scale-[1.05]"
        style={{
          backgroundColor: "var(--success)",
          color: "var(--card-bg)",
        }}
        onClick={handleBoostClick}
      >
        <i className="fas fa-bolt mr-2"></i> Boost Ad
      </button>
    );
  };

  // 4. Render Method (JSX)
  return (
    <div
      className="flex flex-col md:flex-row p-4 md:p-6 rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.01]"
      style={{
        backgroundColor: "var(--card-bg)",
        border: isBoosted ? '2px solid var(--primary)' : 'none', 
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image & Status */}
      <div className="shrink-0 w-full md:w-48 h-40 md:h-auto relative mb-4 md:mb-0">
        <img
          src={ad.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=200&q=80"}
          alt={ad.title}
          className="w-full h-full object-cover rounded-2xl"
        />
        <span
          className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full"
          style={getStatusBadgeStyle(ad.status)}
        >
          {ad.status}
        </span>
        {isBoosted && (
             <span
                className="absolute bottom-2 left-2 px-3 py-1 text-xs font-semibold rounded-full"
                style={{ backgroundColor: 'var(--primary)', color: 'white' }}
             >
                <i className="fas fa-arrow-up mr-1"></i> BOOSTED
             </span>
        )}
      </div>

      {/* Details */}
      <div className="grow p-0 md:pl-6">
        <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>
          {ad.title}
        </h3>
        <p className="flex items-center text-sm mb-3" style={{ color: "var(--muted)" }}>
          <i className="fas fa-map-marker-alt mr-2" style={{ color: "var(--accent)" }}></i>
          {ad.address}
        </p>
        <div className="text-3xl font-extrabold mb-4" style={{ color: "var(--accent)" }}>
          LKR {ad.rent.toLocaleString()}
          <span className="text-base font-medium ml-1" style={{ color: "var(--muted)" }}>/ month</span>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 border-t pt-4" style={{ borderColor: "var(--light)" }}>
          <StatBox icon="fas fa-eye" label="Views" value={ad.views.toLocaleString()} color={"var(--info)"} />
          <StatBox icon="fas fa-calendar-alt" label="Appts" value={ad.appointments} color={"var(--accent)"} />
          <StatBox icon="fas fa-check-circle" label="Selected" value={ad.selected} color={"var(--success)"} />
        </div>

        {/* Actions */}
        <div className="flex justify-between space-x-3 mt-4">
          <BoostButton />

          <div className="flex space-x-3">
             <button
              className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300"
              style={{ border: `1px solid ${"var(--primary)"}`, color: "var(--primary)", backgroundColor: "transparent", }}
              onClick={() => console.log(`View Analytics for ${ad.id}`)}
            >
              <i className="fas fa-chart-bar mr-2"></i> Analytics
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300 shadow-md hover:scale-[1.05]"
              style={{ backgroundColor: "var(--accent)", color: "var(--card-bg)", }}
              onClick={() => onEdit(ad.id)}
            >
              <i className="fas fa-edit mr-2"></i> Edit Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;