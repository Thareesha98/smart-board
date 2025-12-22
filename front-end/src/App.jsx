import React, { useState } from 'react';
// Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminAds from './pages/AdminAds';
import AdminReports from './pages/AdminReports';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminSettings from './pages/AdminSettings';

const App = () => {
  // Central state for navigation
  const [activePage, setActivePage] = useState('dashboard');

  /**
   * handleNavigate
   * @param {string} pageId - The ID of the page to switch to
   * This function is passed to Sidebar, Header, and QuickActions 
   * to allow navigation from anywhere in the app.
   */
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    
    // Smooth scroll to top on every "page" change
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * renderPage
   * Conditional rendering logic to determine which component to show
   */
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
        
      default:
        return <AdminDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light selection:bg-accent/30 selection:text-white">
      {/* The renderPage function injects the specific view. 
        Each page component uses AdminLayout internally to stay 
        wrapped within the Sidebar and Header structure.
      */}
      {renderPage()}
    </div>
  );
};

export default App;