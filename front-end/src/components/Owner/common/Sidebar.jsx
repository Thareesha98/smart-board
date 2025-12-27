import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png"; // Ensure this path is correct
import {
  FaHome,
  FaBullhorn,
  FaCalendarAlt,
  FaBuilding,
  FaCogs,
  FaCreditCard,
  FaFileAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useOwnerAuth } from "../../../context/owner/OwnerAuthContext.jsx";

// Mapped your previous navigation items to the new structure
const navItems = [
  {
    path: "/owner/dashboard",
    icon: FaHome,
    label: "Dashboard",
    key: "Dashboard",
  },
  { path: "/owner/myAds", icon: FaBullhorn, label: "My Ads", key: "My Ads" },
  {
    path: "/owner/appointments",
    icon: FaCalendarAlt,
    label: "Appointments",
    key: "Appointments",
  },
  {
    path: "/owner/myboardings",
    icon: FaBuilding,
    label: "My Boardings",
    key: "My Boardings",
  },
  { path: "/owner/utility", icon: FaCogs, label: "Utility", key: "Utility" },
  {
    path: "/owner/maintenance",
    icon: FaCogs,
    label: "Maintenance",
    key: "Maintenance",
  },
  {
    path: "/owner/payment",
    icon: FaCreditCard,
    label: "Payment",
    key: "Payment",
  },
  { path: "/owner/reports", icon: FaFileAlt, label: "Reports", key: "Reports" },
];

const SidebarItem = ({ path, Icon, label, currentPath }) => {
  // Checks if the current path starts with the item path (active state)
  const isActive =
    currentPath === path.replace(/^\/|\/$/g, "").toLowerCase() ||
    currentPath.startsWith(path.replace(/^\/|\/$/g, "").toLowerCase());

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
  const { currentUser, logout } = useOwnerAuth(); // Assuming you have currentUser in your context
  const currentPath = location.pathname.replace(/^\/|\/$/g, "").toLowerCase();

  const mobileNavRef = useRef(null);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      // Redirect handled by AuthContext or Router usually
    }
  };

  const isProfileActive = currentPath.includes("profile");

  // Auto-scroll active item into view on mobile
  useEffect(() => {
    if (mobileNavRef.current) {
      const activeLink = mobileNavRef.current.querySelector(".mobile-active");
      if (activeLink) {
        activeLink.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [currentPath]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col flex-shrink-0 bg-primary w-70 text-white p-6 rounded-large m-6 shadow-custom sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto z-20">
        <div className="pb-6 mb-4 border-b border-white/10">
          <Link
            to="/owner/dashboard"
            className="flex items-center gap-3 text-white"
          >
            <img
              src={logo}
              alt="SmartBoAD Logo"
              className="w-[70px] h-[70px] rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <strong className="text-xl font-bold leading-tight">
                SmartBoAD
              </strong>
              <small className="text-xs opacity-80 mt-0.5">
                Owner Dashboard
              </small>
            </div>
          </Link>
        </div>

        <nav className="flex-1">
          <h3 className="px-6 pb-2 pt-1 uppercase text-sm tracking-wider text-orange-200 border-b border-white/10 mb-2 font-semibold">
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

        <div className="pt-4 mt-auto border-t border-white/10">
          <Link
            to="/owner/profile"
            className={`flex items-center gap-3 p-3 rounded-btn transition-all duration-300 ${
              isProfileActive
                ? "bg-card-bg text-primary shadow-lg transform scale-[1.01]"
                : "text-white hover:bg-white/10"
            }`}
          >
            {/* Fallback avatar if currentUser is null or has no avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/20 border-2 transition-colors duration-300 ${
                isProfileActive
                  ? "border-primary text-primary bg-white"
                  : "border-accent text-white"
              }`}
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser className="text-sm" />
              )}
            </div>
            <span className="font-medium truncate">
              {/* Check if currentUser exists AND has a lastName */}
              {currentUser && currentUser.lastName
                ? `Mr. ${currentUser.lastName}`
                : "Owner"}
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

      {/* Mobile/Tablet Navigation (Horizontal Scroll) */}
      <nav
        ref={mobileNavRef}
        className="lg:hidden w-full bg-primary text-white shadow-lg fixed bottom-0 left-0 z-50 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex min-w-full px-2 md:justify-center">
          <div className="flex gap-2 p-2">
            {navItems.map((item) => {
              const isActive =
                currentPath ===
                  item.path.replace(/^\/|\/$/g, "").toLowerCase() ||
                currentPath.startsWith(
                  item.path.replace(/^\/|\/$/g, "").toLowerCase()
                );
              const IconComponent = item.icon;

              return (
                <Link
                  key={`mobile-${item.key}`}
                  to={item.path}
                  className={`
                    flex flex-col items-center justify-center p-2 min-w-[75px] flex-shrink-0
                    text-center transition-all duration-300 rounded-lg whitespace-nowrap
                    ${
                      isActive
                        ? "bg-card-bg text-primary shadow-lg scale-105 mobile-active"
                        : "hover:bg-white/10 text-white/90"
                    }
                  `}
                >
                  <IconComponent className="text-xl mb-1" />
                  <span className="text-[10px] font-medium leading-tight">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Hide scrollbar styling */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
