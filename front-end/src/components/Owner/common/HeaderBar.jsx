import React from "react";
import { Link } from "react-router-dom";

const HeaderBar = ({
  title,
  subtitle,
  notificationCount,
  userAvatar,
  userName,
  userProfilePath = "/ownerLayout/profile",
  children,
}) => {
  return (
    <header className="flex justify-between items-center p-6 rounded-report shadow-custom sticky top-6 z-10 bg-white/95 backdrop-blur-md">
      <div className="flex flex-col">
        <h1 className="text-[1.8rem] font-black leading-tight text-primary tracking-tight">
          {title}
        </h1>
        <p className="text-base font-medium text-muted">{subtitle}</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Custom Content Area (e.g., Action Buttons) */}
        {children}

        {/* Notification Bell */}
        <div className="relative cursor-pointer p-3 rounded-full bg-light text-text hover:bg-gray-200 transition-colors">
          <i className="fas fa-bell"></i>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 text-[0.75rem] flex items-center justify-center font-black rounded-full bg-error text-white shadow-sm">
              {notificationCount}
            </span>
          )}
        </div>

        {/* User Menu */}
        <Link to={userProfilePath} className="no-underline">
          <div className="flex items-center gap-3 cursor-pointer p-2 px-4 rounded-report transition-all duration-300 bg-light text-text hover:shadow-md border border-transparent hover:border-accent/20">
            <img
              src={userAvatar}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover border-2 border-accent shadow-sm"
            />
            <span className="font-bold tracking-tight">{userName}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default HeaderBar;
