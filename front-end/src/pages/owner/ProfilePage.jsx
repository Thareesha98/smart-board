import React, { useState } from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import ProfileStatItem from "../../components/Owner/common/ProfileStatItem";
import InfoItem from "../../components/Owner/common/InfoItem";
import ToggleSwitch from "../../components/Owner/common/ToggleSwitch";

import { ownerData } from "../../data/mockData.js";

// --- Sub-Component: ProfileSection ---
const ProfileSection = ({ title, icon, children, onEdit }) => (
  <section className="bg-card-bg p-6 rounded-report shadow-custom border border-light transition-all duration-300">
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-light">
      <h3 className="text-xl font-black text-primary flex items-center gap-2 uppercase tracking-tight">
        <i className={`${icon} text-accent/60`}></i>
        {title}
      </h3>
      {onEdit && (
        <button
          className="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full bg-light text-text hover:bg-gray-200 transition-all flex items-center gap-2"
          onClick={onEdit}
        >
          <i className="fas fa-edit text-[8px]"></i> Edit
        </button>
      )}
    </div>
    {children}
  </section>
);

export default function ProfilePage() {
  const [isEditBusinessModalOpen, setIsEditBusinessModalOpen] = useState(false);

  return (
    <div className="pt-4 space-y-8 bg-light min-h-screen pb-12">
      <HeaderBar
        title="My Profile"
        subtitle="Manage your business and personal account settings"
        notificationCount={2}
        userAvatar={ownerData.avatar}
        userName={`${ownerData.firstName} ${ownerData.lastName}`}
      />

      {/* Profile Overview Section */}
      <section className="px-4">
        <div className="bg-card-bg p-8 rounded-report shadow-custom flex flex-col xl:flex-row justify-between items-center xl:items-start gap-8 border border-light">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="relative shrink-0">
              <img
                src={ownerData.avatar}
                alt="Owner Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-accent shadow-lg"
              />
              <button
                className="absolute bottom-1 right-1 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-md active:scale-95"
                onClick={() => alert("Opening Change Avatar Modal")}
              >
                <i className="fas fa-camera text-sm"></i>
              </button>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-text tracking-tight uppercase">
                {ownerData.businessName}
              </h2>
              <p className="text-lg font-medium text-muted/80">
                {ownerData.email}
              </p>
              <p className="font-black text-accent uppercase tracking-[0.2em] text-sm">
                {ownerData.role}
              </p>
              <div className="flex gap-2 flex-wrap justify-center md:justify-start pt-2">
                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-green-100 text-green-700 border border-green-200">
                  <i className="fas fa-check-circle mr-1"></i>{" "}
                  {ownerData.verificationStatus}
                </span>
                <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                  <i className="fas fa-star mr-1"></i> Partner since{" "}
                  {ownerData.joined.split(" ")[1]}
                </span>
              </div>
            </div>
          </div>

          {/* Owner Stats */}
          <div className="grid grid-cols-2 gap-4 w-full xl:w-auto">
            <ProfileStatItem
              number={ownerData.totalAds}
              label="Active Listings"
            />
            <ProfileStatItem
              number={ownerData.activeTenants}
              label="Current Tenants"
            />
            <ProfileStatItem
              number={ownerData.appointmentsCompleted}
              label="Visits Completed"
            />
            <ProfileStatItem number={ownerData.rating} label="Avg. Rating" />
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 1. Information Columns */}
        <div className="lg:col-span-2 space-y-8">
          <ProfileSection
            title="Business & Contact Details"
            icon="fas fa-building"
            onEdit={() => setIsEditBusinessModalOpen(true)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <InfoItem
                label="Official Business Name"
                value={ownerData.businessName}
              />
              <InfoItem
                label="Primary Contact Name"
                value={`${ownerData.firstName} ${ownerData.lastName}`}
              />
              <InfoItem label="Phone Number" value={ownerData.phone} />
              <InfoItem label="Email Address" value={ownerData.email} />
              <InfoItem
                label="Main Boarding Address"
                value={ownerData.contactAddress}
                fullWidth
              />
            </div>
          </ProfileSection>

          <ProfileSection title="Account Management" icon="fas fa-key">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <InfoItem label="Registration Date" value={ownerData.joined} />
              <InfoItem
                label="Verification Status"
                value={ownerData.verificationStatus}
              />
              <InfoItem
                label="Primary Payment Account"
                value={ownerData.paymentAcc}
              />
              <InfoItem label="Last Password Change" value="6 months ago" />
            </div>
          </ProfileSection>
        </div>

        {/* 2. Preferences Column */}
        <div className="lg:col-span-1 space-y-8">
          <ProfileSection title="Preferences" icon="fas fa-sliders-h">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-xl bg-light/30 border border-light">
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-text">
                    Appointment Alerts
                  </h4>
                  <p className="text-[10px] font-medium text-muted italic leading-tight">
                    Instant visit requests.
                  </p>
                </div>
                <ToggleSwitch
                  id="apptAlerts"
                  checked={true}
                  onChange={() => {}}
                />
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl bg-light/30 border border-light">
                <div className="space-y-1">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-text">
                    Auto-Confirmation
                  </h4>
                  <p className="text-[10px] font-medium text-muted italic leading-tight">
                    Sync with open slots.
                  </p>
                </div>
                <ToggleSwitch
                  id="autoConfirm"
                  checked={false}
                  onChange={() => {}}
                />
              </div>
            </div>
          </ProfileSection>
        </div>
      </div>

      {/* Business Edit Modal */}
      {isEditBusinessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-card-bg rounded-boarding shadow-2xl w-full max-w-[500px] overflow-hidden border border-light">
            <div className="flex justify-between items-center p-6 border-b border-light bg-light/20">
              <h3 className="text-xl font-black text-primary uppercase tracking-tight">
                Edit Business
              </h3>
              <button
                onClick={() => setIsEditBusinessModalOpen(false)}
                className="text-muted hover:text-text transition-all text-3xl"
              >
                &times;
              </button>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-xs font-medium text-muted italic">
                Update your primary boarding brand and contact info.
              </p>
              <div className="flex justify-end gap-3 pt-6 border-t border-light">
                <button
                  className="px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full bg-light text-muted hover:text-text transition-all"
                  onClick={() => setIsEditBusinessModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-full bg-accent text-white shadow-lg shadow-accent/20 active:scale-95 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
