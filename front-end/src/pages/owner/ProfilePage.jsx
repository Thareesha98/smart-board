import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Imports ---
// 1. Common Components
import HeaderBar from '../../components/Owner/common/HeaderBar'; // Replaced StudentLayout with HeaderBar
import Notification from '../../components/student/maintenance/Notification';

// 2. Profile Components (Reusing generic logic/UI where possible)
import ChangeAvatarModal from '../../components/student/profile/ChangeAvatarModal';
import PreferencesSection from '../../components/student/profile/PreferencesSection';

// 3. Owner Specific Components
import ProfileHeader from '../../components/Owner/profile/ProfileHeader'; // Your Owner Header
import BusinessInfoSection from '../../components/Owner/profile/BusinessInfoSection';
import AccountSection from '../../components/Owner/profile/AccountSection'; // Renamed from OwnerAccountSection
import EditBusinessModal from '../../components/Owner/profile/EditBusinessModal';
import useProfileLogic from '../../hooks/owner/useProfileLogic'; // Your Owner Hook

const ProfilePage = () => {
  const {
    ownerData,
    updateBusinessInfo,
    updateAvatar,
    updatePreferences,
  } = useProfileLogic();

  const [notification, setNotification] = useState(null);
  const [isEditBusinessOpen, setIsEditBusinessOpen] = useState(false);
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);

  // --- Handlers ---
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdateBusiness = (data) => {
    updateBusinessInfo(data);
    setIsEditBusinessOpen(false);
    showNotification('Business information updated successfully!', 'success');
  };

  const handleUpdateAvatar = (avatarUrl) => {
    updateAvatar(avatarUrl);
    setIsChangeAvatarOpen(false);
    showNotification('Profile picture updated successfully!', 'success');
  };

  return (
    // Replaced StudentLayout with a standard div container
    <div className="pt-4 space-y-6 min-h-screen pb-12 bg-light">
      
      {/* 1. Top Header Bar (Standard for Owner Pages) */}
      <HeaderBar 
        title="My Profile" 
        subtitle="Manage your business identity and account settings"
        // If your HeaderBar supports user props, pass them here:
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName} 
      />

      {/* 2. Main Content Container */}
      <div className="px-4 max-w-[1600px] mx-auto space-y-6 mt-8">
        
        {/* Profile Header (Avatar + Stats) */}
        <ProfileHeader
          ownerData={ownerData}
          onChangeAvatar={() => setIsChangeAvatarOpen(true)}
        />

        {/* Sections Grid */}
        <div className="space-y-6">
          {/* Business Info */}
          <BusinessInfoSection
            ownerData={ownerData}
            onEdit={() => setIsEditBusinessOpen(true)}
          />

          {/* Account Info */}
          <AccountSection
            ownerData={ownerData}
            onSecurity={() => showNotification('Security settings coming soon!', 'info')}
          />

          {/* Preferences */}
          <PreferencesSection
            preferences={ownerData.preferences}
            onPreferenceChange={updatePreferences}
            onSettings={() => showNotification('Settings page coming soon!', 'info')}
          />
        </div>
      </div>

      {/* --- Modals --- */}
      <EditBusinessModal
        isOpen={isEditBusinessOpen}
        onClose={() => setIsEditBusinessOpen(false)}
        ownerData={ownerData}
        onSubmit={handleUpdateBusiness}
      />

      <ChangeAvatarModal
        isOpen={isChangeAvatarOpen}
        onClose={() => setIsChangeAvatarOpen(false)}
        currentAvatar={ownerData.avatar}
        onSubmit={handleUpdateAvatar}
      />

      <Notification notification={notification} />
    </div>
  );
};

export default ProfilePage;