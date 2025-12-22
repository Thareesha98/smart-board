import React, { useState } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminAds from './pages/AdminAds';
import AdminReports from './pages/AdminReports'; // 1. Import the Reports page

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'users':
        return <AdminUsers onNavigate={handleNavigate} />;
      case 'ads':
        return <AdminAds onNavigate={handleNavigate} />;
      case 'reports': // 2. Add this case to handle the "reports" ID
        return <AdminReports onNavigate={handleNavigate} />;
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