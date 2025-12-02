import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaCalendarAlt, FaCreditCard, 
  FaTools, FaFlag, FaUserCog 
} from 'react-icons/fa';

const actionButtons = [
  { path: "/search-boardings", icon: FaSearch, label: "Search Boardings" },
  { path: "/appointmentpage", icon: FaCalendarAlt, label: "View Appointments" },
  { path: "/billing", icon: FaCreditCard, label: "Pay Bills" },
];

const manageButtons = [
  { path: "/maintenance", icon: FaTools, label: "Maintenance Requests" },
  { path: "/reports", icon: FaFlag, label: "Report Issues" },
  { path: "/profile", icon: FaUserCog, label: "Profile Settings" },
];

const QuickActionButton = ({ path, icon: Icon, label, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 + index * 0.1 }}
  >
    <Link
      to={path}
      className="bg-white border border-gray-100 text-text-dark p-3 sm:p-3.5 rounded-large flex items-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow-accent-hover hover:bg-accent hover:text-white hover:transform hover:-translate-y-0.5"
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  </motion.div>
);

const QuickActionsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-6 sm:mb-8"
    >
      <h2 className="text-primary text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
        Quick Actions
      </h2>
      <div className="bg-card-bg p-4 sm:p-6 rounded-large shadow-custom flex flex-col lg:flex-row gap-6 lg:gap-8 transition-shadow duration-300 hover:shadow-xl">
        {/* Find & Book Column */}
        <div className="flex-1 min-w-0">
          <h3 className="text-secondary-accent text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Find & Book
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {actionButtons.map((btn, index) => (
              <QuickActionButton 
                key={index} 
                path={btn.path} 
                icon={btn.icon} 
                label={btn.label} 
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Divider - Responsive */}
        <div className="w-full h-px lg:w-px lg:h-auto bg-primary/25 lg:self-stretch"></div>

        {/* Manage Column */}
        <div className="flex-1 min-w-0">
          <h3 className="text-secondary-accent text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Manage
          </h3>
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {manageButtons.map((btn, index) => (
              <QuickActionButton 
                key={index} 
                path={btn.path} 
                icon={btn.icon} 
                label={btn.label} 
                index={index + 3}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default QuickActionsSection;