// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/Layout/AdminLayout.jsx'; 
import DashboardPage from './pages/DashboardPage.jsx'; 
import UserManagementPage from './pages/UserManagementPage.jsx'; 
import AdApprovalsPage from './pages/AdApprovalsPage.jsx'; 
import ReportsPage from './pages/ReportsPage.jsx'; // Import the new page

const App = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/ads" element={<AdApprovalsPage />} />
          <Route path="/reports" element={<ReportsPage />} /> // Use the new page here
          {/* Add more routes here */}
          <Route path="*" element={<h1 className="text-text-dark">404 Not Found</h1>} />
        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default App;