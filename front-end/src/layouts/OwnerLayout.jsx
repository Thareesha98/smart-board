import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
// Assuming Logo is correctly imported based on your file structure
import Logo from '../assets/logo.jpg'; 

// Exact colors and styling constants from my-appointments.css
const COLORS = {
  primary: '#D84C38',
  accent: '#FF7A00',
  cardBg: '#FFFFFF',
  light: '#E8DBC7',
  radius: '25px',
  shadow: '0 6px 20px rgba(0,0,0,0.08)',
};

// Define the navigation items
const ownerNavigation = [
    { name: 'Dashboard', path: '/owner/dashboard', icon: 'fas fa-home' },
    { name: 'My Ads', path: '/owner/my-ads', icon: 'fas fa-bullhorn' },
    { name: 'Create Ad', path: '/owner/create-ad', icon: 'fas fa-plus-square' },
    { name: 'Appointments', path: '/owner/appointments', icon: 'fas fa-calendar-alt' },
    { name: 'Billing', path: '/owner/billing', icon: 'fas fa-credit-card' },
    { name: 'Analytics', path: '/owner/analytics', icon: 'fas fa-chart-line' },
];

// Reusable Tailwind classes for sidebar links
const BASE_LINK_CLASSES = "mx-3 my-1 p-3 flex items-center gap-3 transition duration-300 rounded-[12px] no-underline text-base font-medium";
const FOOTER_LINK_CLASSES = "flex items-center gap-3 p-3 text-white no-underline rounded-[12px] hover:bg-white hover:bg-opacity-10 transition duration-300";

export default function OwnerLayout() {
  const { pathname: currentPath } = useLocation();
  const userName = "Mr. Silva";

  // --- Path Matching Logic (simplified into a single function) ---
  const getActivePath = () => {
    // 1. Check for nested paths like /owner/edit-ad/123
    if (currentPath.includes('/owner/edit-ad/')) return '/owner/my-ads';
    
    // 2. Normalize current path for dashboard index route
    const normalizedPath = (currentPath === '/owner' || currentPath === '/owner/') 
                             ? '/owner/dashboard' 
                             : currentPath;
    
    // 3. Check for direct match
    const foundItem = ownerNavigation.find(item => item.path === normalizedPath);
    return foundItem ? foundItem.path : '';
  };
  const activePath = getActivePath();
  
  // Helper to determine the classes for a navigation link
  const getLinkClasses = (path) => {
    const isActive = activePath === path;
    
    return `${BASE_LINK_CLASSES} ${isActive 
        ? 'bg-white text-red-600' // Active: Matches .sidebar-nav a.active
        : 'text-white hover:bg-white hover:bg-opacity-10' // Inactive
    }`;
  };

  return (
    // Body and Dashboard Layout wrapper
    <div className="flex min-h-screen" style={{ backgroundColor: COLORS.light }}>
      
      {/* 1. Vertical Sidebar */}
      <aside 
          className="flex flex-col shrink-0 w-[280px] p-6 pt-0 m-6 overflow-y-auto"
          style={{ 
              backgroundColor: COLORS.primary, 
              color: COLORS.cardBg, 
              borderRadius: COLORS.radius, 
              boxShadow: COLORS.shadow,
              position: 'sticky',
              top: '1.5rem',
              height: 'calc(100vh - 3rem)'
          }}
      >
          {/* Sidebar Header */}
          <div className="py-6 px-0 mb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <Link to="/owner" className="flex items-center gap-3 no-underline">
                  <img src={Logo} alt="SmartBoAD Logo" className="h-[50px] w-[50px] rounded-[15px] object-cover" 
                      style={{ border: '2px solid rgba(255,255,255,0.2)' }}/>
                  <div className="flex flex-col text-white">
                      <strong className="text-xl font-bold leading-[1.1]">SmartBoAD</strong>
                      <small className="text-[0.75rem]" style={{ color: 'rgba(255,255,255,0.7)' }}>Owner Dashboard</small>
                  </div>
              </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
              <h3 className="px-6 pb-2 text-xs font-semibold uppercase tracking-wider border-b" 
                  style={{ color: COLORS.accent, borderColor: 'rgba(255,255,255,0.1)' }}>
                  MAIN NAVIGATION
              </h3>
              
              <div className="pt-2">
                {ownerNavigation.map((item) => (
                    <Link
                        key={item.name}
                        // Use /owner for the index route, otherwise use the path
                        to={item.path === '/owner/dashboard' ? '/owner' : item.path} 
                        className={getLinkClasses(item.path)}
                        style={{ color: activePath === item.path ? COLORS.primary : 'white' }}
                    >
                        <i className={`${item.icon} w-5 text-center text-lg`}></i>
                        <span>{item.name}</span>
                    </Link>
                ))}
              </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="pt-4 mt-auto border-t px-6" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <Link to="/owner/profile" className={FOOTER_LINK_CLASSES}>
                  <i className="fas fa-user-circle w-5 text-center"></i>
                  <span>{userName}</span>
              </Link>
              
              <a href="/" className={`${FOOTER_LINK_CLASSES} mt-1`} style={{ color: COLORS.accent }}>
                  <i className="fas fa-sign-out-alt w-5 text-center"></i>
                  <span>Logout</span>
              </a>
          </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-8 pt-4 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}