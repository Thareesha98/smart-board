import React from 'react';
import { motion } from 'framer-motion';
import { FaSlidersH, FaCog } from 'react-icons/fa';

const PreferencesSection = ({ preferences = {}, onPreferenceChange, onSettings }) => {
  const preferenceItems = [
    {
      id: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive updates about bookings, payments, and promotions',
    },
    {
      id: 'smsNotifications',
      title: 'SMS Notifications',
      description: 'Get important alerts via text message',
    },
    {
      id: 'marketingEmails',
      title: 'Marketing Emails',
      description: 'Receive offers and news from SmartBoAD',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card-bg rounded-large shadow-custom p-6"
    >
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
          <FaSlidersH />
          Preferences
        </h3>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSettings}
          className="flex items-center gap-2 px-4 py-2 rounded-large font-semibold text-sm bg-background-light text-text-dark hover:bg-accent hover:text-white transition-all duration-300"
        >
          <FaCog />
          Settings
        </motion.button>
      </div>

      <div className="space-y-4">
        {preferenceItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-background-light rounded-large"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-text-dark mb-1">{item.title}</h4>
              <p className="text-sm text-text-muted">{item.description}</p>
            </div>
            
            <ToggleSwitch
              checked={preferences[item.id]}
              onChange={(checked) => onPreferenceChange(item.id, checked)}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="relative inline-block w-16 h-8 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only peer"
    />
    <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-accent transition-colors duration-300"></div>
    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-8"></div>
  </label>
);

export default PreferencesSection;