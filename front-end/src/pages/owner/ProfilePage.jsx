import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// Mock Data for the Boarding Owner
const ownerData = {
    firstName: 'Mr.',
    lastName: 'Silva',
    businessName: 'Sunshine Hostels & Rooms',
    email: 'sunshinehostels@gmail.com',
    role: 'Boarding Owner',
    avatar: 'https://randomuser.me/api/portraits/men/57.jpg', // Using male avatar for owner
    totalAds: 4,
    activeTenants: 15,
    appointmentsCompleted: 78,
    rating: '4.7 / 5',
    phone: '+94 77 123 4567',
    contactAddress: '123 University Avenue, Matara',
    joined: 'January 2023',
    verificationStatus: 'University Verified',
    paymentAcc: 'BOC Account **** 5678',
};

// --- Reusable Components (Adapted for Owner) ---

const ProfileStatItem = ({ number, label }) => (
    <div className="stat-item text-center p-4 rounded-xl" style={{ backgroundColor: "var(--light)" }}>
        <div className="stat-number text-3xl font-bold mb-0.5" style={{ color: "var(--primary)" }}>
            {number}
        </div>
        <div className="stat-label text-sm" style={{ color: "var(--muted)" }}>
            {label}
        </div>
    </div>
);

const InfoItem = ({ label, value, fullWidth = false }) => (
    <div className={`info-item flex flex-col gap-1 p-4 rounded-xl transition duration-300 ${fullWidth ? 'col-span-full' : ''}`}
         style={{ transitionProperty: 'background-color' }}
         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(232, 219, 199, 0.3)'}
         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
        <label className="font-semibold text-sm" style={{ color: "var(--muted)" }}>{label}</label>
        <p className="text-base" style={{ color: "var(--text)" }}>{value}</p>
    </div>
);

const ProfileSection = ({ title, icon, children, onEdit }) => (
    <section className="profile-section bg-white p-6 rounded-[25px] shadow-xl transition duration-300" style={{ boxShadow: "var(--shadow)" }}>
        <div className="section-header-with-edit flex justify-between items-center mb-4 pb-4 border-b" style={{ borderColor: "var(--light)" }}>
            <h3 className="text-[1.3rem] font-semibold flex items-center gap-2" style={{ color: "var(--primary)" }}>
                <i className={icon}></i>
                {title}
            </h3>
            {onEdit && (
                <button className="btn btn-secondary btn-sm px-3 py-2 text-sm font-semibold flex items-center gap-1 rounded-[25px] transition duration-300" 
                        style={{ backgroundColor: "var(--light)", color: "var(--text)" }}
                        onClick={onEdit}>
                    <i className="fas fa-edit text-xs"></i> Edit
                </button>
            )}
        </div>
        {children}
    </section>
);


// --- Main Owner Profile Component ---

export default function ProfilePage() {
    // State management for modals (simplified)
    const [isEditBusinessModalOpen, setIsEditBusinessModalOpen] = useState(false);
    
    // Mock Header Data (assuming the OwnerLayout is NOT rendering its own header bar)
    const notificationCount = 2; 

    return (
        <div className="pt-4 space-y-6">
            
            {/* Horizontal Header (Replicated from CreateAdPage for consistency) */}
            <header 
                className="content-header flex justify-between items-center p-6 rounded-[25px] shadow-lg sticky top-0 z-10"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    boxShadow: "var(--shadow)",
                }}
            >
                <div className="header-left flex flex-col">
                    <h1 className="text-[1.8rem] font-bold leading-tight" style={{ color: "var(--primary)" }}>
                        My Profile
                    </h1>
                    <p className="text-base" style={{ color: "var(--muted)" }}>
                        Manage your business and personal account settings
                    </p>
                </div>
                
                <div className="header-right flex items-center gap-6">
                    <div className="notification-bell relative cursor-pointer p-3 rounded-full"
                          style={{ backgroundColor: "var(--light)", color: "var(--text)" }}>
                        <i className="fas fa-bell"></i>
                        <span className="notification-count absolute top-[-5px] right-[-5px] w-5 h-5 text-[0.75rem] flex items-center justify-center font-bold rounded-full"
                              style={{ backgroundColor: "var(--error)", color: 'white' }}>
                            {notificationCount}
                        </span>
                    </div>

                    <div className="user-menu flex items-center gap-3 cursor-pointer p-2 px-4 rounded-[25px] transition duration-300"
                         style={{ backgroundColor: "var(--light)", color: "var(--text)" }}>
                        <img src={ownerData.avatar} alt={ownerData.firstName} className="user-avatar w-10 h-10 rounded-full object-cover" 
                            style={{ border: `2px solid ${"var(--accent)"}` }} />
                        <span>{ownerData.firstName} {ownerData.lastName}</span>
                    </div>
                </div>
            </header>

            {/* Profile Overview Section */}
            <section className="dashboard-section">
                <div className="profile-header bg-white p-8 rounded-[25px] shadow-xl flex justify-between items-start gap-8" style={{ boxShadow: "var(--shadow)" }}>
                    <div className="profile-avatar-section flex gap-6 items-start">
                        <div className="avatar-container relative shrink-0">
                            <img src={ownerData.avatar} alt="Owner Avatar" className="profile-avatar w-[120px] h-[120px] rounded-full object-cover" style={{ border: `4px solid ${"var(--accent)"}` }} />
                            <button className="avatar-edit-btn absolute bottom-1 right-1 w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center transition duration-300 hover:scale-110" 
                                    style={{ backgroundColor: "var(--accent)" }} 
                                    onClick={() => alert('Opening Change Avatar Modal')}>
                                <i className="fas fa-camera text-sm"></i>
                            </button>
                        </div>
                        <div className="avatar-info">
                            <h2 className="text-[1.8rem] font-semibold mb-1" style={{ color: "var(--text)" }}>{ownerData.businessName}</h2>
                            <p className="profile-email text-lg" style={{ color: "var(--muted)" }}>{ownerData.email}</p>
                            <p className="profile-role font-semibold mb-3" style={{ color: "var(--accent)" }}>{ownerData.role}</p>
                            <div className="profile-badges flex gap-2 flex-wrap">
                                <span className="badge verified px-3 py-1 text-xs font-semibold rounded-full" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                                    <i className="fas fa-check-circle mr-1"></i> {ownerData.verificationStatus}
                                </span>
                                <span className="badge member px-3 py-1 text-xs font-semibold rounded-full" style={{ background: '#FEF3C7', color: '#D97706' }}>
                                    <i className="fas fa-star mr-1"></i> Partner since {ownerData.joined.split(' ')[1]}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Owner Stats */}
                    <div className="profile-stats grid grid-cols-2 gap-4">
                        <ProfileStatItem number={ownerData.totalAds} label="Active Listings" />
                        <ProfileStatItem number={ownerData.activeTenants} label="Current Tenants" />
                        <ProfileStatItem number={ownerData.appointmentsCompleted} label="Visits Completed" />
                        <ProfileStatItem number={ownerData.rating} label="Avg. Rating" />
                    </div>
                </div>
            </section>

            {/* Profile Information & Account Settings */}
            <div className="profile-content grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Business & Contact Information (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    <ProfileSection 
                        title="Business & Contact Information" 
                        icon="fas fa-building" 
                        onEdit={() => setIsEditBusinessModalOpen(true)}
                    >
                        <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            <InfoItem label="Official Business Name" value={ownerData.businessName} />
                            <InfoItem label="Primary Contact Name" value={`${ownerData.firstName} ${ownerData.lastName}`} />
                            <InfoItem label="Phone Number" value={ownerData.phone} />
                            <InfoItem label="Email Address" value={ownerData.email} />
                            <InfoItem label="Main Boarding Address" value={ownerData.contactAddress} fullWidth />
                        </div>
                    </ProfileSection>

                    <ProfileSection 
                        title="Account Management" 
                        icon="fas fa-key" 
                        onEdit={() => alert('Opening Edit Account Modal')}
                    >
                        <div className="info-grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            <InfoItem label="Registration Date" value={ownerData.joined} />
                            <InfoItem label="Verification Status" value={ownerData.verificationStatus} />
                            <InfoItem label="Primary Payment Account" value={ownerData.paymentAcc} />
                            <InfoItem label="Last Password Change" value="6 months ago" />
                        </div>
                    </ProfileSection>
                </div>

                {/* 2. Preferences (1/3 width) */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* Preferences */}
                    <ProfileSection 
                        title="Preferences & Notifications" 
                        icon="fas fa-sliders-h" 
                        onEdit={() => alert('Opening Settings Modal')}
                    >
                        <div className="preferences-grid flex flex-col gap-3">
                            <div className="preference-item flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: "var(--light)" }}>
                                <div className="preference-info">
                                    <h4 className="font-semibold" style={{ color: "var(--text)" }}>New Appointment Alerts</h4>
                                    <p className="text-sm" style={{ color: "var(--muted)" }}>Receive instant alerts for student visit requests.</p>
                                </div>
                                <ToggleSwitch id="apptAlerts" checked={true} onChange={() => {}} />
                            </div>
                            <div className="preference-item flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: "var(--light)" }}>
                                <div className="preference-info">
                                    <h4 className="font-semibold" style={{ color: "var(--text)" }}>Auto-Confirmation</h4>
                                    <p className="text-sm" style={{ color: "var(--muted)" }}>Automatically confirm visits if slot is open.</p>
                                </div>
                                <ToggleSwitch id="autoConfirm" checked={false} onChange={() => {}} />
                            </div>
                        </div>
                    </ProfileSection>
                </div>
            </div>

            {/* Placeholder for Modals (Business Info Edit Modal) */}
            {isEditBusinessModalOpen && (
                 <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center p-4 z-50" 
                      style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-content bg-white rounded-[25px] shadow-2xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
                        <div className="modal-header flex justify-between items-center p-6 border-b" style={{ borderColor: "var(--light)" }}>
                            <h3 className="text-xl font-bold" style={{ color: "var(--primary)" }}>Edit Business Details</h3>
                            <button className="modal-close text-3xl cursor-pointer" style={{ color: "var(--muted)" }} onClick={() => setIsEditBusinessModalOpen(false)}>&times;</button>
                        </div>
                        <div className="modal-body p-6">
                            <p style={{ color: "var(--muted)" }}>This modal would contain the form fields to update the business name, address, and primary contact information.</p>
                            <div className="form-actions flex justify-end gap-3 pt-4 border-t" style={{ borderColor: "var(--light)" }}>
                                <button className="btn btn-secondary px-4 py-2 rounded-[25px] font-semibold" onClick={() => setIsEditBusinessModalOpen(false)}>Cancel</button>
                                <button className="btn btn-primary px-4 py-2 rounded-[25px] font-semibold" style={{ backgroundColor: "var(--accent)", color: 'white' }}>
                                    <i className="fas fa-save mr-1"></i> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper: Toggle Switch component (moved outside main function)
const ToggleSwitch = ({ id, checked, onChange }) => (
    <label className="toggle-switch relative inline-block w-[60px] h-[34px]">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className="opacity-0 w-0 h-0" />
        <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full"
              style={{ backgroundColor: checked ? "var(--accent)" : '#ccc', transition: '.4s' }}>
            <span className="absolute content-none h-[26px] w-[26px] left-1 bottom-1 bg-white rounded-full"
                  style={{ transition: '.4s', transform: checked ? 'translateX(26px)' : 'translateX(0)' }}>
            </span>
        </span>
    </label>
);