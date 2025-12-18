import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentLayout from '../../components/student/common/StudentLayout';
import useProfileLogic from '../../hooks/student/useProfileLogic.js';
import ProfileHeader from '../../components/student/profile/ProfileHeader';
import PersonalInfoSection from '../../components/student/profile/PersonalInfoSection';
import AccountInfoSection from '../../components/student/profile/AccountInfoSection';
import PreferencesSection from '../../components/student/profile/PreferencesSection';
import EditProfileModal from '../../components/student/profile/EditProfileModal';
import EditPersonalInfoModal from '../../components/student/profile/EditPersonalInfoModal';
import ChangeAvatarModal from '../../components/student/profile/ChangeAvatarModal';
import UserDropdown from '../../components/student/profile/UserDropdown';
import Notification from '../../components/student/maintenance/Notification';
import { FaBell, FaChevronDown } from 'react-icons/fa';

const ProfilePage = () => {
  const {
    userData,
    updatePersonalInfo,
    updateProfile,
    updateAvatar,
    updatePreferences,
  } = useProfileLogic();

  const [notification, setNotification] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditPersonalInfoOpen, setIsEditPersonalInfoOpen] = useState(false);
  const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdatePersonalInfo = (data) => {
    updatePersonalInfo(data);
    setIsEditPersonalInfoOpen(false);
    showNotification('Personal information updated successfully!', 'success');
  };

  const handleUpdateProfile = (data) => {
    updateProfile(data);
    setIsEditProfileOpen(false);
    showNotification('Profile updated successfully!', 'success');
  };

  const handleUpdateAvatar = (avatarUrl) => {
    updateAvatar(avatarUrl);
    setIsChangeAvatarOpen(false);
    showNotification('Profile picture updated successfully!', 'success');
  };

  const handlePreferenceChange = (preference, value) => {
    updatePreferences(preference, value);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      showNotification('Logging out...', 'info');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  const customHeader = (
    <div className="flex items-center gap-6">
      <div
        onClick={() => showNotification('You have 2 unread notifications', 'info')}
        className="relative cursor-pointer p-3 rounded-full bg-background-light text-text-dark transition-all duration-300 hover:bg-accent hover:text-white group"
      >
        <FaBell className="text-xl group-hover:animate-pulse" />
        <span className="absolute -top-1.5 -right-1.5 bg-red-alert text-white rounded-full w-5 h-5 text-xs font-semibold flex items-center justify-center border-2 border-white">
          2
        </span>
      </div>

      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          className="flex items-center gap-3 cursor-pointer p-2 pr-4 rounded-large bg-background-light text-text-dark transition-all duration-300 hover:bg-accent hover:text-white group"
        >
          <img
            src={userData.avatar}
            alt={`${userData.firstName} ${userData.lastName}`}
            className="w-10 h-10 rounded-full object-cover border-2 border-accent group-hover:border-white transition-colors duration-300"
          />
          <span className="font-semibold text-sm">{userData.firstName} S.</span>
          <motion.div
            animate={{ rotate: showUserDropdown ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronDown className="text-sm" />
          </motion.div>
        </motion.div>

        <UserDropdown
          isOpen={showUserDropdown}
          onClose={() => setShowUserDropdown(false)}
          onEditProfile={() => {
            setIsEditProfileOpen(true);
            setShowUserDropdown(false);
          }}
          onSettings={() => {
            showNotification('Settings page coming soon!', 'info');
            setShowUserDropdown(false);
          }}
          onSecurity={() => {
            showNotification('Security settings coming soon!', 'info');
            setShowUserDropdown(false);
          }}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );

  return (
    <StudentLayout
      title="My Profile"
      subtitle="Manage your personal information and account settings"
    >
      <ProfileHeader
        userData={userData}
        onChangeAvatar={() => setIsChangeAvatarOpen(true)}
      />

      <div className="space-y-6 mt-8">
        <PersonalInfoSection
          userData={userData}
          onEdit={() => setIsEditPersonalInfoOpen(true)}
        />

        <AccountInfoSection
          userData={userData}
          onSecurity={() => showNotification('Security settings coming soon!', 'info')}
        />

        <PreferencesSection
          preferences={userData.preferences}
          onPreferenceChange={handlePreferenceChange}
          onSettings={() => showNotification('Settings page coming soon!', 'info')}
        />
      </div>

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        userData={userData}
        onSubmit={handleUpdateProfile}
      />

      <EditPersonalInfoModal
        isOpen={isEditPersonalInfoOpen}
        onClose={() => setIsEditPersonalInfoOpen(false)}
        userData={userData}
        onSubmit={handleUpdatePersonalInfo}
      />

      <ChangeAvatarModal
        isOpen={isChangeAvatarOpen}
        onClose={() => setIsChangeAvatarOpen(false)}
        currentAvatar={userData.avatar}
        onSubmit={handleUpdateAvatar}
      />

      <Notification notification={notification} />
    </StudentLayout>
  );
};

export default ProfilePage;