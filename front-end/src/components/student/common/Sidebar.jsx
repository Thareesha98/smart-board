import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaCalendarAlt,
  FaBuilding,
  FaCreditCard,
  FaTools,
  FaFlag,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from '../../../context/AuthContext';

const navItems = [
  { path: "/", icon: FaHome, label: "Dashboard", key: "Dashboard" },
  {
    path: "/appointmentpage",
    icon: FaCalendarAlt,
    label: "My Appointments",
    key: "My Appointments",
  },
  {
    path: "/search-boardings",
    icon: FaSearch,
    label: "Search Boardings",
    key: "Search Boardings",
  },
  {
    path: "/my-boardings",
    icon: FaBuilding,
    label: "My Boardings",
    key: "My Boardings",
  },
  {
    path: "/billing",
    icon: FaCreditCard,
    label: "Billing & Payments",
    key: "Billing",
  },
  {
    path: "/maintenance",
    icon: FaTools,
    label: "Maintenance",
    key: "Maintenance",
  },
  { 
    path: "/reports", 
    icon: FaFlag, 
    label: "Report Issues", 
    key: "Reports" 
  },
];

const SidebarItem = ({ path, Icon, label, currentPath }) => {
  const isActive = currentPath === path.replace(/^\/|\/$/g, "").toLowerCase();

  return (
    <Link
      to={path}
      className={`
        flex items-center gap-3 p-3 mx-3 my-1 rounded-btn transition-all duration-300
        ${
          isActive
            ? "bg-card-bg text-primary shadow-lg transform scale-[1.01]"
            : "text-white hover:bg-white/20"
        }
      `}
    >
      <Icon className="w-5 text-center text-xl" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const currentPath = location.pathname.replace(/^\/|\/$/g, "").toLowerCase();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      window.location.href = '/login';
    }
  };

  // ✅ Check if profile page is active
  const isProfileActive = currentPath === "profile";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
        hidden lg:flex flex-col flex-shrink-0 
        bg-primary w-70 text-white p-6 
        rounded-large m-6 shadow-custom 
        sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto z-20
      "
      >
        <div className="pb-6 mb-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 text-white">
            <img
              src="/logo.jpg"
              alt="SmartBoAD Logo"
              className="w-10 h-10 rounded-lg object-cover border-2 border-white/20"
            />
            <div className="flex flex-col">
              <strong className="text-xl font-bold leading-tight">
                SmartBoAD
              </strong>
              <small className="text-xs opacity-80 mt-0.5">
                Student Dashboard
              </small>
            </div>
          </Link>
        </div>

        <nav className="flex-1">
          <h3 className="px-6 pb-2 pt-1 uppercase text-xs tracking-wider text-accent border-b border-white/10 mb-2 font-semibold">
            MAIN NAVIGATION
          </h3>
          {navItems.map((item) => (
            <SidebarItem
              key={item.key}
              currentPath={currentPath}
              path={item.path}
              Icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>

        {/* ✅ FIXED: Profile section with active state */}
        <div className="pt-4 mt-auto border-t border-white/10">
          <Link
            to="/profile"
            className={`
              flex items-center gap-3 p-3 rounded-btn transition-all duration-300
              ${
                isProfileActive
                  ? "bg-card-bg text-primary shadow-lg transform scale-[1.01]"
                  : "text-white hover:bg-white/10"
              }
            `}
          >
            <img 
              src={currentUser?.avatar || 'https://randomuser.me/api/portraits/women/50.jpg'} 
              alt={currentUser?.firstName || 'User'}
              className={`
                w-8 h-8 rounded-full object-cover border-2 transition-colors duration-300
                ${isProfileActive ? "border-primary" : "border-accent"}
              `}
            />
            <span className="font-medium">
              {currentUser ? `${currentUser.firstName} ${currentUser.lastName.charAt(0)}.` : 'Guest U.'}
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-btn text-accent hover:bg-white/10 transition-colors duration-300 mt-1 w-full text-left"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Navigation - ✅ Centered when fits, scrollable when overflow */}
      <nav
        className="
          lg:hidden w-full bg-primary text-white shadow-lg sticky top-0 z-50 
          overflow-x-auto scrollbar-hide
        "
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex justify-center min-w-full">
          <div className="flex gap-1 p-3 px-4">
            {navItems.map((item) => {
              const isActive = currentPath === item.path.replace(/^\/|\/$/g, "").toLowerCase();
              const IconComponent = item.icon; 

              return (
                <Link
                  key={`mobile-${item.key}`}
                  to={item.path}
                  className={`
                    flex flex-col items-center justify-center p-2 min-w-[70px] flex-shrink-0
                    text-center transition-all duration-300 rounded-lg
                    ${
                      isActive
                        ? "bg-card-bg text-primary shadow-lg scale-105"
                        : "hover:bg-white/10 text-white/90"
                    }
                  `}
                >
                  <IconComponent className="text-xl mb-1" />
                  <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Hide scrollbar styling */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;