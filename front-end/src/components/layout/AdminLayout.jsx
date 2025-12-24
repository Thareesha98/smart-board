import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = ({ children, onNavigate, activePage, title, subtitle, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: 'fa-tachometer-alt' },
    { id: 'users', label: 'Users', icon: 'fa-users' },
    { id: 'ads', label: 'Ads', icon: 'fa-home' },
    { id: 'reports', label: 'Reports', icon: 'fa-flag' },
    { id: 'settings', label: 'Settings', icon: 'fa-cogs' },
  ];

  return (
    <div className="flex min-h-screen bg-background-light font-sans text-text-dark">
      <Sidebar 
        onNavigate={onNavigate} 
        activePage={activePage} 
        onLogout={onLogout} 
      />
      
      {/* Main Content: Scale slightly on mobile for a 'tighter' look */}
      <main className="w-full p-3 pb-28 lg:p-10 lg:ml-[320px] lg:pb-10 pt-4 transform scale-[0.98] lg:scale-100 origin-top transition-transform duration-300">
        <Header 
          title={title} 
          subtitle={subtitle} 
          onNavigate={onNavigate} 
        />
        <div className="mt-4 lg:mt-6">
           {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Tab Bar */}
      <nav className="lg:hidden fixed bottom-5 left-4 right-4 bg-primary text-white h-14 rounded-[20px] shadow-2xl flex items-center justify-around px-1 z-50 border border-white/10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg transition-all ${
              activePage === item.id 
                ? 'bg-white/15 text-white scale-105' 
                : 'text-white/50'
            }`}
          >
            <i className={`fas ${item.icon} text-base`}></i>
            <span className="text-[9px] mt-0.5 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminLayout;