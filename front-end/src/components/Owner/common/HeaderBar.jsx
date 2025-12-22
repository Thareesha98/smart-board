import React from "react";
import { FaBell, FaPlus } from "react-icons/fa"; // Added FaPlus for icon consistency
import { useNavigate } from "react-router-dom";
import { useOwnerAuth } from "../../../context/owner/OwnerAuthContext.jsx";

// Added navBtnText and navBtnPath props
const Header = ({ title, subtitle, rightContent, navBtnText, navBtnPath,onNavBtnClick }) => {
  const { currentUser } = useOwnerAuth();
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    console.log("Notifications panel would open here");
  };

  const handleUserMenuClick = () => {
    navigate("/owner/profile");
  };

  // Fallback values
  const userFirstName = currentUser?.firstName || "Partner";
  const userLastNameInitial = currentUser?.lastName
    ? currentUser.lastName.charAt(0) + "."
    : "";
  const userAvatar =
    currentUser?.avatar || "https://randomuser.me/api/portraits/men/32.jpg";

    const handlePrimaryAction = () => {
    if (onNavBtnClick) {
      onNavBtnClick(); // Open the modal
    } else if (navBtnPath) {
      navigate(navBtnPath); // Navigate to page
    }
  };

  return (
    <header
      className="
      flex flex-col md:flex-row justify-between items-center 
      mb-8 bg-white/70 backdrop-blur-sm p-6 rounded-large 
      shadow-custom sticky top-7 z-10 transition-all duration-500
      hover:shadow-xl
    "
    >
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h1 className="text-primary text-2xl md:text-3xl font-bold mb-1">
          {title || `Welcome back, Mr. ${currentUser?.lastName || "Partner"}!`}
        </h1>
        <p className="text-text-muted">
          {subtitle || "Here's your property overview"}
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* 🔥 NEW: Dynamic Navigation Button */}
        {/* Only renders if both text and path are provided */}
        {navBtnText && (navBtnPath || onNavBtnClick) && (
          <button
            onClick={handlePrimaryAction}
            className="
              hidden sm:flex items-center gap-2 
              bg-accent text-white px-5 py-2.5 rounded-3xl 
              font-medium shadow-md transition-all duration-300 
              hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5
            "
          >
            <FaPlus className="text-sm" /> {/* Optional Icon */}
            {navBtnText}
          </button>
        )}

        {/* Existing Custom Content (if you need something other than a button) */}
        {rightContent && <div className="hidden sm:block">{rightContent}</div>}

        {/* Notification Bell */}
        <div
          className="relative cursor-pointer p-3 rounded-full bg-background-light text-text-dark transition-all duration-300 hover:bg-accent hover:text-white group"
          onClick={handleNotificationClick}
        >
          <FaBell className="text-xl group-hover:animate-pulse" />
          <span
            className="
            absolute -top-1.5 -right-1.5 bg-red-alert text-white 
            rounded-full w-5 h-5 text-xs font-semibold flex items-center justify-center 
            border-2 border-white
          "
          >
            3
          </span>
        </div>

        {/* User Menu */}
        <div
          className="flex items-center gap-3 cursor-pointer p-2 pr-4 rounded-large bg-background-light text-text-dark transition-all duration-300 hover:bg-accent hover:text-white group"
          onClick={handleUserMenuClick}
        >
          <img
            src={userAvatar}
            alt="Owner Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-accent group-hover:border-white transition-colors duration-300"
          />
          <span className="font-semibold text-sm">
            {userFirstName} {userLastNameInitial}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
