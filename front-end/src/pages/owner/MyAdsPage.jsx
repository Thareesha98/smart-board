import React, { useState } from 'react';
import { StatusTab } from '../../components/Owner/StatusTab';
import { EmptyState } from '../../components/Owner/EmptyState';
import { AdCard } from '../../components/Owner/AdCard';
import { useNavigate } from 'react-router-dom';



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
        case 'Active': return { backgroundColor: 'var(--success)', color: 'white' };
        case 'Pending': return { backgroundColor: 'var(--info)', color: 'white' };
        case 'Draft': return { backgroundColor: 'var(--muted)', color: 'white' };
        case 'Inactive': return { backgroundColor: 'var(--error)', color: 'white' };
        default: return { backgroundColor: 'var(--light)', color: 'var(--text)' };
    }
};



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