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
      className="bg-white border border-gray-100 text-text-dark p-3 rounded-large flex items-center gap-3 font-semibold transition-all duration-300 shadow-sm hover:shadow-accent-hover hover:bg-accent hover:text-white hover:transform hover:-translate-y-0.5"
    >
      <Icon className="w-5 text-center text-lg" />
      {label}
    </Link>
  </motion.div>
);

const QuickActionsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-8"
    >
      <h2 className="text-primary text-2xl font-bold mb-4">Quick Actions</h2>
      <div className="bg-card-bg p-6 rounded-large shadow-custom flex flex-col md:flex-row gap-6 md:gap-8 justify-between transition-shadow duration-300 hover:shadow-xl">
        {/* Find & Book Column */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-secondary-accent text-xl font-semibold mb-4">Find & Book</h3>
          <div className="grid grid-cols-1 gap-3">
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

        {/* Divider */}
        <div className="w-full h-px md:w-px md:h-auto bg-primary/25 md:self-stretch my-4 md:my-0"></div>

        {/* Manage Column */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-secondary-accent text-xl font-semibold mb-4">Manage</h3>
          <div className="grid grid-cols-1 gap-3">
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