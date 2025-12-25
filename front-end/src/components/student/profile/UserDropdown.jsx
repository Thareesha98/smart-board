import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserEdit, FaCog, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';

const UserDropdown = ({ isOpen, onClose, onEditProfile, onSettings, onSecurity, onLogout }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 bg-white rounded-large shadow-xl min-w-[200px] overflow-hidden z-50"
        >
          <DropdownItem icon={FaUserEdit} label="Edit Profile" onClick={onEditProfile} />
          <DropdownItem icon={FaCog} label="Account Settings" onClick={onSettings} />
          <DropdownItem icon={FaShieldAlt} label="Security" onClick={onSecurity} />
          <div className="h-px bg-gray-200 my-1" />
          <DropdownItem
            icon={FaSignOutAlt}
            label="Logout"
            onClick={onLogout}
            className="text-error hover:bg-error/10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DropdownItem = ({ icon: Icon, label, onClick, className = '' }) => (
  <motion.button
    whileHover={{ x: 5 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-background-light ${className}`}
  >
    <Icon className="text-text-muted" />
    <span>{label}</span>
  </motion.button>
);

export default UserDropdown;