import React from 'react';

const Header = ({ 
  title = "Welcome back, Alex!", 
  subtitle = "Manage your platform efficiently" 
}) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/70 backdrop-blur-sm py-8 px-10 rounded-[25px] shadow-custom sticky top-6 z-40">
      
      <div className="mb-4 md:mb-0 text-center md:text-left">
        {/* These now use the props passed from the Page */}
        <h1 className="text-primary text-2xl font-bold mb-2">{title}</h1>
        <p className="text-text-muted text-sm">{subtitle}</p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
        <div className="hidden sm:flex gap-4">
          <div className="bg-background-light px-4 py-2 rounded-[15px] text-center">
            <span className="block text-xs text-text-muted">Online Users</span>
            <span className="block font-bold text-text-dark">247</span>
          </div>
          <div className="bg-background-light px-4 py-2 rounded-[15px] text-center">
            <span className="block text-xs text-text-muted">System Status</span>
            <span className="block font-bold text-success">Online</span>
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative p-3 rounded-full bg-background-light hover:bg-accent hover:text-white transition-colors cursor-pointer group">
          <i className="fas fa-bell text-lg"></i>
          <span className="absolute -top-1 -right-1 bg-red-alert text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
            5
          </span>
        </div>

        {/* Profile Tag */}
        <div className="flex items-center gap-3 px-4 py-2 bg-background-light rounded-[25px] cursor-pointer hover:bg-accent hover:text-white transition-colors group">
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-accent object-cover" />
          <div className="hidden md:flex flex-col">
            <span className="font-bold text-sm leading-tight">Alex Morgan</span>
            <span className="text-xs opacity-70">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;