import React from 'react';

const Header = ({ title = "Welcome back, Alex!", subtitle = "Manage your platform efficiently", onNavigate }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/70 backdrop-blur-sm py-4 px-6 lg:py-8 lg:px-10 rounded-[25px] shadow-custom sticky top-4 z-40 border border-white/20">
      
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h1 className="text-primary text-lg lg:text-2xl font-bold mb-0.5 lg:mb-2 leading-tight">{title}</h1>
        <p className="text-text-muted text-[10px] lg:text-sm">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* MOBILE ONLY: Third Party Ads Shortcut */}
        <button 
          onClick={() => onNavigate?.('thirdparty')}
          className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full border border-accent/20 active:scale-95 transition-transform"
        >
          <i className="fas fa-ad text-xs"></i>
          <span className="text-[10px] font-bold uppercase">Ads</span>
        </button>

        <div className="hidden sm:flex gap-3">
          <div className="bg-background-light px-4 py-2 rounded-[15px] text-center border border-white/50">
            <span className="block text-[10px] text-text-muted uppercase font-bold tracking-wider">Online</span>
            <span className="block font-bold text-sm lg:text-base text-text-dark">247</span>
          </div>
        </div>

        <div className="relative p-2.5 lg:p-3 rounded-full bg-background-light hover:bg-accent hover:text-white transition-colors cursor-pointer group shadow-sm">
          <i className="fas fa-bell text-sm lg:text-xl"></i>
          <span className="absolute -top-1 -right-1 bg-red-alert text-white rounded-full w-4 h-4 lg:w-5 lg:h-5 text-[9px] lg:text-[10px] flex items-center justify-center font-bold shadow-md">5</span>
        </div>

        <div className="flex items-center gap-3 p-1.5 lg:px-4 lg:py-2 bg-background-light rounded-full lg:rounded-[25px] cursor-pointer hover:bg-accent hover:text-white transition-colors group shadow-sm border border-white/50">
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-accent object-cover" />
          <div className="hidden md:flex flex-col">
            <span className="font-bold text-sm leading-tight text-inherit">Alex Morgan</span>
            <span className="text-[10px] opacity-60 uppercase font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;