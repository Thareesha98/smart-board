import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockAds } from '../../data/mockData.js';

// Helper function moved outside the main component
const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'Active': return { backgroundColor: 'var(--success)', color: 'white' };
        case 'Pending': return { backgroundColor: 'var(--info)', color: 'white' };
        case 'Draft': return { backgroundColor: 'var(--muted)', color: 'white' };
        case 'Inactive': return { backgroundColor: 'var(--error)', color: 'white' };
        default: return { backgroundColor: 'var(--warning)', color: 'var(--text)' };
    }
};

const StatBox = ({ icon, label, value, color }) => (
    <div className="flex flex-col items-center">
        <i className={`${icon} text-xl mb-1`} style={{ color }}></i>
        <strong className="text-xl font-bold" style={{ color: 'var(--text)' }}>{value}</strong>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>{label}</span>
    </div>
);

const AdCard = ({ ad, onEdit, getStatusBadgeStyle }) => {
  return (
    <div
      className="flex flex-col md:flex-row p-4 md:p-6 rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.01]"
      style={{
        backgroundColor: "var(--card-bg)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image & Status */}
      <div className="shrink-0 w-full md:w-48 h-40 md:h-auto relative mb-4 md:mb-0">
        <img
          src={
            ad.image ||
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=200&q=80"
          }
          alt={ad.title}
          className="w-full h-full object-cover rounded-2xl"
        />
        <span
          className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full"
          style={getStatusBadgeStyle(ad.status)}
        >
          {ad.status}
        </span>
      </div>

      {/* Details */}
      <div className="grow p-0 md:pl-6">
        <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text)" }}>
          {ad.title}
        </h3>
        <p
          className="flex items-center text-sm mb-3"
          style={{ color: "var(--muted)" }}
        >
          <i
            className="fas fa-map-marker-alt mr-2"
            style={{ color: "var(--accent)" }}
          ></i>
          {ad.address}
        </p>
        <div
          className="text-3xl font-extrabold mb-4"
          style={{ color: "var(--accent)" }}
        >
          LKR {ad.rent.toLocaleString()}
          <span
            className="text-base font-medium ml-1"
            style={{ color: "var(--muted)" }}
          >
            / month
          </span>
        </div>

        {/* Performance Stats */}
        <div
          className="grid grid-cols-3 gap-4 mb-4 border-t pt-4"
          style={{ borderColor: "var(--light)" }}
        >
          <StatBox
            icon="fas fa-eye"
            label="Views"
            value={ad.views.toLocaleString()}
            color={"var(--info)"}
          />
          <StatBox
            icon="fas fa-calendar-alt"
            label="Appts"
            value={ad.appointments}
            color={"var(--accent)"}
          />
          <StatBox
            icon="fas fa-check-circle"
            label="Selected"
            value={ad.selected}
            color={"var(--success)"}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-4">
          <button
            className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300"
            style={{
              border: `1px solid ${"var(--primary)"}`,
              color: "var(--primary)",
              backgroundColor: "transparent",
            }}
            onClick={() => console.log(`View Analytics for ${ad.id}`)}
          >
            <i className="fas fa-chart-bar mr-2"></i> Analytics
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300 shadow-md hover:scale-[1.05]"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--card-bg)",
            }}
            onClick={() => onEdit(ad.id)}
          >
            <i className="fas fa-edit mr-2"></i> Edit Ad
          </button>
        </div>
      </div>
    </div>
  );
};


const StatusTab = ({ status, count, currentFilter, setFilter }) => {
    const isActive = currentFilter === status;
    const color = getStatusBadgeStyle(status).backgroundColor;

    return (
        <button 
            className={`flex items-center justify-center p-3 rounded-2xl transition-all duration-300 relative w-full ${isActive ? 'shadow-md scale-[1.05]' : 'bg-opacity-80'}`}
            style={{ backgroundColor: isActive ? color : 'var(--light)', color: isActive ? 'white' : 'var(--text)' }}
            onClick={() => setFilter(status)}
        >
            <span className="font-semibold text-lg">{status}</span>
            <span 
                className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full`}
                style={{ backgroundColor: isActive ? 'var(--primary)' : 'var(--accent)', color: 'white' }}
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
    {filter === "All" ? (
      <p className="text-base mb-6" style={{ color: "var(--muted)" }}>
        It looks like you haven't created any boarding advertisements yet. Start
        now!
      </p>
    ) : (
      <p className="text-base mb-6" style={{ color: "var(--muted)" }}>
        You currently have no listings in the **{filter}** status.
      </p>
    )}
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
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();
    
    const handleEditClick = (adId) => {
        alert(`Redirecting to EditAdPage for ID: ${adId}`);
        navigate(`../editAd/${adId}`);
    };
    
    const handleCreateNewAd = () => {
        alert('Redirecting to CreateAdPage');
        navigate('../createAd');
    };

    const filteredAds = mockAds.filter(ad => 
        filter === 'All' ? true : ad.status === filter
    );

    const getStatusCounts = () => {
        return mockAds.reduce((acc, ad) => {
            acc[ad.status] = (acc[ad.status] || 0) + 1;
            acc['All'] = (acc['All'] || 0) + 1;
            return acc;
        }, {});
    };

    const counts = getStatusCounts();

    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--light)' }}>
            {/* Header */}
            <header 
                className="flex flex-col sm:flex-row justify-between items-center mb-8 p-6 rounded-3xl shadow-lg sticky top-6 z-10"
                style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)'
                }}
            >
                <div className="flex flex-col mb-4 sm:mb-0">
                    <h1 className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>
                        My Boarding Ads
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        Manage, track performance, and edit your listings
                    </p>
                </div>
                <button 
                    className="px-6 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--card-bg)' }}
                    onClick={handleCreateNewAd}
                >
                    <i className="fas fa-plus mr-2"></i>
                    Create New Ad
                </button>
            </header>

            {/* Status Filter Tabs */}
            <section className="mb-8 p-6 rounded-3xl shadow-lg grid grid-cols-2 md:grid-cols-5 gap-4" style={{ backgroundColor: 'var(--card-bg)' }}>
                
                <StatusTab status="All" count={counts["All"] || 0} currentFilter={filter} setFilter={setFilter} />
                <StatusTab status="Active" count={counts["Active"] || 0} currentFilter={filter} setFilter={setFilter} />
                <StatusTab status="Pending" count={counts["Pending"] || 0} currentFilter={filter} setFilter={setFilter} />
                <StatusTab status="Draft" count={counts["Draft"] || 0} currentFilter={filter} setFilter={setFilter} />
                <StatusTab status="Inactive" count={counts["Inactive"] || 0} currentFilter={filter} setFilter={setFilter} />
            </section>

            {/* Ads List */}
            <section>
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                    {filter} Listings ({filteredAds.length})
                </h2>
                <div className="space-y-6">
                    {filteredAds.length > 0 ? (
                        filteredAds.map(ad => (
                            <AdCard key={ad.id} ad={ad} onEdit={handleEditClick} getStatusBadgeStyle={getStatusBadgeStyle} />
                        ))
                    ) : (
                        <EmptyState filter={filter} handleCreateNewAd={handleCreateNewAd} />
                    )}
                </div>
            </section>
        </div>
    );
};


export default MyAdsPage;