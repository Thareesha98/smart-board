import React, { useState } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminAds from './pages/AdminAds';
import AdminReports from './pages/AdminReports';
import AdminAnalytics from './pages/AdminAnalytics'; // Import the new page

const App = () => {
  // The state that controls which view is currently visible
  const [activePage, setActivePage] = useState('dashboard');

  /**
   * Central navigation handler
   * Passed as a prop to Sidebar, QuickActions, and Layout components
   */
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Conditional Rendering Logic
   * Determines which "Smart Component" to mount based on activePage ID
   */
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      
      case 'analytics':
        // This handles navigation from both Sidebar and QuickActions
        return <AdminAnalytics onNavigate={handleNavigate} />;
      
      case 'users':
        return <AdminUsers onNavigate={handleNavigate} />;
      
      case 'ads':
        return <AdminAds onNavigate={handleNavigate} />;
      
      case 'reports':
        return <AdminReports onNavigate={handleNavigate} />;
        
      case 'settings':
        // Placeholder for Settings if not yet created
        return (
          <div className="flex items-center justify-center h-screen text-text-muted">
            Settings Page Coming Soon...
            <button 
              onClick={() => handleNavigate('dashboard')}
              className="ml-4 text-accent underline"
            >
              Back to Dashboard
            </button>
          </div>
        );

      default:
        return <AdminDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light selection:bg-accent/30">
      {/* The renderPage function injects the specific view. 
          All pages are wrapped in AdminLayout inside their own files 
          to keep the Sidebar and Header consistent.
      */}
      {renderPage()}
    </div>
  );
};

export default App;