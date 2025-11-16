import React, { useState } from 'react';

// Custom colors based on the provided CSS variables for consistent styling
const COLORS = {
  primary: '#D84C38', // --primary
  accent: '#FF7A00',   // --accent
  text: '#332720',    // --text
  muted: '#665345',    // --muted
  cardBg: '#FFFFFF',   // --card-bg
  light: '#E8DBC7',    // --light
  success: '#10B981', // --success
  error: '#EF4444',   // --error
  info: '#3B82F6', // --info
};

// ⚠️ MOCK DATA for the user's ads
const mockAds = [
    {
        id: '101',
        title: 'Luxury Studio near University',
        address: '34, Temple Rd, Matara',
        rent: 18000,
        status: 'Active',
        views: 1240,
        appointments: 42,
        selected: 3,
        image: 'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?auto=format&fit=crop&w=200&q=80',
    },
    {
        id: '102',
        title: 'Budget Friendly Room, 10 min to Campus',
        address: '777 Suburb Rd, Matara',
        rent: 10000,
        status: 'Draft',
        views: 5,
        appointments: 0,
        selected: 0,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=200&q=80',
    },
    {
        id: '103',
        title: 'Spacious Family Boarding',
        address: '12, Galle Rd, Matara',
        rent: 25000,
        status: 'Inactive',
        views: 450,
        appointments: 15,
        selected: 1,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=200&q=80',
    },
    {
        id: '104',
        title: 'Semi-Luxury Single Room',
        address: '9, Lake View Lane, Matara',
        rent: 15000,
        status: 'Active',
        views: 890,
        appointments: 30,
        selected: 2,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80',
    },
    {
        id: '105',
        title: 'Room with Garden Access',
        address: '20, Green Valley Rd, Matara',
        rent: 12000,
        status: 'Pending',
        views: 200,
        appointments: 5,
        selected: 0,
        image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=200&q=80',
    },
];

// Helper function moved outside the main component
const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'Active': return { backgroundColor: COLORS.success, color: 'white' };
        case 'Pending': return { backgroundColor: COLORS.info, color: 'white' };
        case 'Draft': return { backgroundColor: COLORS.muted, color: 'white' };
        case 'Inactive': return { backgroundColor: COLORS.error, color: 'white' };
        default: return { backgroundColor: COLORS.light, color: COLORS.text };
    }
};

// --- CORRECTED StatusTab Component (Defined outside MyAdsPage) ---
const StatusTab = ({ status, count, currentFilter, setFilter }) => {
    const isActive = currentFilter === status;
    const color = getStatusBadgeStyle(status).backgroundColor;

    return (
        <button 
            className={`flex items-center justify-center p-3 rounded-2xl transition-all duration-300 relative w-full ${isActive ? 'shadow-md scale-[1.05]' : 'bg-opacity-80'}`}
            style={{ backgroundColor: isActive ? color : COLORS.light, color: isActive ? 'white' : COLORS.text }}
            onClick={() => setFilter(status)}
        >
            <span className="font-semibold text-lg">{status}</span>
            <span 
                className={`absolute top-[-8px] right-[-8px] px-2 py-0.5 text-xs font-bold rounded-full`}
                style={{ backgroundColor: isActive ? COLORS.primary : COLORS.accent, color: 'white' }}
            >
                {count}
            </span>
        </button>
    );
};
// -----------------------------------------------------------------


const MyAdsPage = () => {
    const [filter, setFilter] = useState('All');
    
    const handleEditClick = (adId) => {
        console.log(`Navigating to edit page for Ad ID: ${adId}`);
        alert(`Redirecting to EditAdPage for ID: ${adId}`);
    };
    
    const handleCreateNewAd = () => {
        console.log('Navigating to CreateAdPage');
        alert('Redirecting to CreateAdPage');
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
        <div className="min-h-screen p-8" style={{ backgroundColor: COLORS.light }}>
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
                    <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
                        My Boarding Ads
                    </h1>
                    <p className="text-sm" style={{ color: COLORS.muted }}>
                        Manage, track performance, and edit your listings
                    </p>
                </div>
                <button 
                    className="px-6 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                    style={{ backgroundColor: COLORS.accent, color: COLORS.cardBg }}
                    onClick={handleCreateNewAd}
                >
                    <i className="fas fa-plus mr-2"></i>
                    Create New Ad
                </button>
            </header>

            {/* Status Filter Tabs */}
            <section className="mb-8 p-6 rounded-3xl shadow-lg grid grid-cols-2 md:grid-cols-5 gap-4" style={{ backgroundColor: COLORS.cardBg }}>
                {/* Passed the state (filter) and setter (setFilter) as props to StatusTab.
                  The StatusTab component is now defined outside of this render function.
                */}
                <StatusTab status="All" count={counts["All"] || 0} currentFilter={filter} setFilter={setFilter} />
                <StatusTab status="Active" count={counts["Active"] || 0} currentFilter={filter} setFilter={setFilter} />
                <StatusTab status="Pending" count={counts["Pending"] || 0} currentFilter={filter} setFilter={setFilter} />
                <StatusTab status="Draft" count={counts["Draft"] || 0} currentFilter={filter} setFilter={setFilter} />
                <StatusTab status="Inactive" count={counts["Inactive"] || 0} currentFilter={filter} setFilter={setFilter} />
            </section>

            {/* Ads List */}
            <section>
                <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.primary }}>
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

// --- AdCard Component ---
const AdCard = ({ ad, onEdit, getStatusBadgeStyle }) => {
    // ... (AdCard logic remains the same, but relies on the external getStatusBadgeStyle)
    return (
        <div 
            className="flex flex-col md:flex-row p-4 md:p-6 rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.01]" 
            style={{ backgroundColor: COLORS.cardBg, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
        >
            {/* Image & Status */}
            <div className="flex-shrink-0 w-full md:w-48 h-40 md:h-auto relative mb-4 md:mb-0">
                <img 
                    src={ad.image || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=200&q=80'} 
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
            <div className="flex-grow p-0 md:pl-6">
                <h3 className="text-xl font-bold mb-1" style={{ color: COLORS.text }}>{ad.title}</h3>
                <p className="flex items-center text-sm mb-3" style={{ color: COLORS.muted }}>
                    <i className="fas fa-map-marker-alt mr-2" style={{ color: COLORS.accent }}></i>
                    {ad.address}
                </p>
                <div className="text-3xl font-extrabold mb-4" style={{ color: COLORS.accent }}>
                    LKR {ad.rent.toLocaleString()}
                    <span className="text-base font-medium ml-1" style={{ color: COLORS.muted }}>/ month</span>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 border-t pt-4" style={{ borderColor: COLORS.light }}>
                    <StatBox icon="fas fa-eye" label="Views" value={ad.views.toLocaleString()} color={COLORS.info} />
                    <StatBox icon="fas fa-calendar-alt" label="Appts" value={ad.appointments} color={COLORS.accent} />
                    <StatBox icon="fas fa-check-circle" label="Selected" value={ad.selected} color={COLORS.success} />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 mt-4">
                    <button 
                        className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300"
                        style={{ border: `1px solid ${COLORS.primary}`, color: COLORS.primary, backgroundColor: 'transparent' }}
                        onClick={() => console.log(`View Analytics for ${ad.id}`)}
                    >
                        <i className="fas fa-chart-bar mr-2"></i> Analytics
                    </button>
                    <button 
                        className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300 shadow-md hover:scale-[1.05]"
                        style={{ backgroundColor: COLORS.accent, color: COLORS.cardBg }}
                        onClick={() => onEdit(ad.id)}
                    >
                        <i className="fas fa-edit mr-2"></i> Edit Ad
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Helper StatBox Component ---
const StatBox = ({ icon, label, value, color }) => (
    <div className="flex flex-col items-center">
        <i className={`${icon} text-xl mb-1`} style={{ color }}></i>
        <strong className="text-xl font-bold" style={{ color: COLORS.text }}>{value}</strong>
        <span className="text-xs" style={{ color: COLORS.muted }}>{label}</span>
    </div>
);

// --- EmptyState Component ---
const EmptyState = ({ filter, handleCreateNewAd }) => (
    <div className="text-center p-12 rounded-3xl shadow-lg" style={{ backgroundColor: COLORS.cardBg }}>
        <i className="fas fa-clipboard-list text-6xl mb-4" style={{ color: COLORS.muted }}></i>
        <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.text }}>
            No {filter} Listings Found
        </h3>
        {filter === 'All' ? (
            <p className="text-base mb-6" style={{ color: COLORS.muted }}>
                It looks like you haven't created any boarding advertisements yet. Start now!
            </p>
        ) : (
            <p className="text-base mb-6" style={{ color: COLORS.muted }}>
                You currently have no listings in the **{filter}** status.
            </p>
        )}
        <button 
            className="px-8 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg"
            style={{ backgroundColor: COLORS.primary, color: COLORS.cardBg }}
            onClick={handleCreateNewAd}
        >
            <i className="fas fa-plus mr-2"></i> Create Your First Ad
        </button>
    </div>
);

export default MyAdsPage;