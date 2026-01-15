import React, { useState } from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import Notification from "../../components/student/maintenance/Notification";

import ChangeAvatarModal from "../../components/student/profile/ChangeAvatarModal";
import PreferencesSection from "../../components/student/profile/PreferencesSection";
import ProfileHeader from "../../components/Owner/profile/ProfileHeader";
import BusinessInfoSection from "../../components/Owner/profile/BusinessInfoSection";
import AccountSection from "../../components/Owner/profile/AccountSection";
import EditBusinessModal from "../../components/Owner/profile/EditBusinessModal";

import useProfileLogic from "../../hooks/owner/useProfileLogic";

const ProfilePage = () => {
  const {
    ownerData,
    isLoading,
    error,
    updateBusinessInfo,
    updateAvatar,
    updatePreferences,
  } = useProfileLogic();

  const [notification, setNotification] = useState(null);
  const [isEditBusinessOpen, setIsEditBusinessOpen] = useState(false);
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdateBusiness = async (data) => {
    try {
      await updateBusinessInfo(data);
      setIsEditBusinessOpen(false);
      showNotification("Business information updated successfully!", "success");
    } catch (err) {
      showNotification("Failed to update information.", "error");
    }
  };

  const handleUpdateAvatar = async (avatarUrl) => {
    try {
      await updateAvatar(avatarUrl);
      setIsChangeAvatarOpen(false);
      showNotification("Profile picture updated successfully!", "success");
    } catch (err) {
      showNotification("Failed to update profile picture.", "error");
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen pt-4 pb-12 space-y-6 bg-light">
      <HeaderBar
        title="My Profile"
        subtitle="Manage your business identity and account settings"
        userAvatar={ownerData.avatar}
        userName={ownerData.fullName}
      />

      <div className="px-4 max-w-[1600px] mx-auto space-y-6 mt-8">
        {/* Profile Header 
            Note: ownerData no longer contains 'stats', so the "Active Tabs" 
            (Active Ads, Tenants) should disappear or show blank, depending on your component.
        */}
        <ProfileHeader
          ownerData={ownerData}
          onChangeAvatar={() => setIsChangeAvatarOpen(true)}
        />

        <div className="space-y-6">
          {/* Business Info Section */}
          <BusinessInfoSection
            ownerData={{
              ...ownerData,
              businessName: ownerData.fullName,
            }}
            onEdit={() => setIsEditBusinessOpen(true)}
          />

          {/* Account Section */}
          <AccountSection
            ownerData={{
              ...ownerData,
              paymentMethod: ownerData.accNo,
            }}
            onSecurity={() =>
              showNotification("Security settings coming soon!", "info")
            }
          />

          {/* Preferences Section */}
          <PreferencesSection
            preferences={ownerData.preferences}
            onPreferenceChange={updatePreferences}
            onSettings={() => showNotification("Settings coming soon!", "info")}
          />
        </div>
      </div>

      <EditBusinessModal
        isOpen={isEditBusinessOpen}
        onClose={() => setIsEditBusinessOpen(false)}
        ownerData={{
          ...ownerData,
          businessName: ownerData.fullName,
          paymentMethod: ownerData.accNo,
        }}
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
