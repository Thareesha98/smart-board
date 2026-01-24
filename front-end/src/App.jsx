import React, { useState } from 'react';
// Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminAds from './pages/AdminAds';
import AdminReports from './pages/AdminReports';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminSettings from './pages/AdminSettings';
import AdminThirdParty from './pages/AdminThirdParty'; // 1. Add this import

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'users':
        return <AdminUsers onNavigate={handleNavigate} />;
      case 'ads':
        return <AdminAds onNavigate={handleNavigate} />;
      case 'reports':
        return <AdminReports onNavigate={handleNavigate} />;
      case 'analytics':
        return <AdminAnalytics onNavigate={handleNavigate} />;
      case 'settings':
        return <AdminSettings onNavigate={handleNavigate} />;
      
      // 2. Add this case to handle the navigation
      case 'thirdparty':
        return <AdminThirdParty onNavigate={handleNavigate} />;
        
      default:
        return <AdminDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light selection:bg-accent/30 selection:text-white">
      {renderPage()}
    </div>
  );
};

export default App;