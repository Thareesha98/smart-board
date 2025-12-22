import React, { useState } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminAds from './pages/AdminAds'; // 1. Import the new page

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo(0, 0);
  };

  // The logic that swaps the pages
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'users':
        return <AdminUsers onNavigate={handleNavigate} />;
      case 'ads': // 2. Add the case for Ad Approvals
        return <AdminAds onNavigate={handleNavigate} />;
      default:
        return <AdminDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      {renderPage()}
    </div>
  );
};

export default App;