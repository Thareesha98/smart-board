// src/components/Layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', icon: 'tachometer-alt', label: 'Dashboard' },
  { to: '/users', icon: 'users', label: 'Users' },
  { to: '/ads', icon: 'ad', label: 'Advertisements' },
  { to: '/reports', icon: 'exclamation-triangle', label: 'Reports' },
  { to: '/analytics', icon: 'chart-bar', label: 'Analytics' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const baseClasses = "flex items-center p-3 my-1 rounded-card text-white hover:bg-white/10 transition-colors";
  
  return (
    <>
      {/* Backdrop for mobile view */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={toggleSidebar} 
        />
      )}

      <aside
        className={`bg-primary text-white w-[280px] fixed z-30 h-full overflow-y-auto transform transition-transform duration-300 shadow-custom ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-primary-dark">
          <Link to="/dashboard" className="flex items-center">
            <div className="font-bold text-2xl tracking-wide">SmartBoAD</div>
          </Link>
        </div>
        
        <nav className="p-4 pt-6">
          <h3 className="text-xs font-semibold text-white/70 mb-3 ml-3">ADMIN NAVIGATION</h3>
          {navItems.map(item => (
            <Link 
              key={item.to}
              to={item.to}
              className={`${baseClasses} ${location.pathname === item.to ? 'bg-primary-dark shadow-inner' : ''}`}
              onClick={window.innerWidth < 768 ? toggleSidebar : undefined} // Close sidebar on mobile click
            >
              <i className={`fas fa-${item.icon} w-6 mr-3`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;