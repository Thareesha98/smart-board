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
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 rounded-report shadow-custom sticky top-4 md:top-6 z-10 bg-white/95 backdrop-blur-md mx-2 md:mx-0 gap-4 md:gap-0">
      {/* 1. Title & Subtitle Section */}
      <div className="flex flex-col w-full md:w-auto">
        <h1 className="text-xl md:text-[1.8rem] font-black leading-tight text-primary tracking-tight truncate">
          {title}
        </h1>
        <p className="text-xs md:text-base font-medium text-muted line-clamp-1">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 md:gap-6">
        {/* Custom Content Area (e.g., Action Buttons) */}
        <div className="flex items-center gap-2">
          {children}
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Notification Bell */}
          <div className="relative cursor-pointer p-2.5 md:p-3 rounded-full bg-light text-text hover:bg-gray-200 transition-colors shrink-0">
            <i className="fas fa-bell text-sm md:text-base"></i>
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 text-[0.6rem] md:text-[0.75rem] flex items-center justify-center font-black rounded-full bg-error text-white shadow-sm">
                {notificationCount}
              </span>
            )}
          </div>

          {/* User Menu */}
          <Link to={userProfilePath} className="no-underline shrink-0">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer p-1.5 md:p-2 md:px-4 rounded-full md:rounded-report transition-all duration-300 bg-light text-text hover:shadow-md border border-transparent hover:border-accent/20">
              <img
                src={userAvatar}
                alt={userName}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-accent shadow-sm"
              />
              {/* Hide name on small mobile screens to save space */}
              <span className="hidden sm:block font-bold tracking-tight text-sm md:text-base">
                {userName}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;