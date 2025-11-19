import React from 'react';
import { FaBell } from 'react-icons/fa';

const Header = ({ title, subtitle, rightContent }) => {

  // IMPORTANT: Replaced alert() with console.log as alerts are forbidden
  const handleNotificationClick = () => {
    console.log('Notifications panel would open here'); 
    // In a real app, this would toggle a notification dropdown component.
  }

  // IMPORTANT: Replaced alert() with console.log as alerts are forbidden
  const handleUserMenuClick = () => {
    console.log('User menu would open here');
    // In a real app, this would toggle a user profile dropdown menu.
  }

  return (
    <header className="
      flex flex-col md:flex-row justify-between items-center 
      mb-8 bg-white/70 backdrop-blur-sm p-6 rounded-large 
      shadow-custom sticky top-6 z-10 transition-all duration-500
      hover:shadow-xl
    ">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h1 className="text-primary text-2xl md:text-3xl font-bold mb-1">
          {title || "Welcome back, Priya!"}
        </h1>
        <p className="text-text-muted">{subtitle || "Here's your boarding overview"}</p>
      </div>
      
      <div className="flex items-center gap-6">
        
        {/* If custom content is provided, render it here */}
        {rightContent && <div className="hidden sm:block">{rightContent}</div>}

        {/* Notification Bell with Animated Hover */}
        <div 
          className="relative cursor-pointer p-3 rounded-full bg-background-light text-text-dark transition-all duration-300 hover:bg-accent hover:text-white group"
          onClick={handleNotificationClick}
        >
          <FaBell className="text-xl group-hover:animate-pulse" />
          <span className="
            absolute -top-1.5 -right-1.5 bg-red-alert text-white 
            rounded-full w-5 h-5 text-xs font-semibold flex items-center justify-center 
            border-2 border-white
          ">
            3
          </span>
        </div>
        
        {/* User Menu with Animated Hover */}
        <div 
          className="flex items-center gap-3 cursor-pointer p-2 pr-4 rounded-large bg-background-light text-text-dark transition-all duration-300 hover:bg-accent hover:text-white group"
          onClick={handleUserMenuClick}
        >
          <img 
            src="https://randomuser.me/api/portraits/women/50.jpg" 
            alt="Priya" 
            className="w-10 h-10 rounded-full object-cover border-2 border-accent group-hover:border-white transition-colors duration-300"
          />
          <span className="font-semibold text-sm">Priya S.</span>
        </div>
      </div>
    </header>
  );
};

export default Header;