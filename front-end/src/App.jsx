import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/Layout/AdminLayout.jsx'; // Changed from .tsx
import DashboardPage from './pages/DashboardPage.jsx'; // Changed from .tsx
import UserManagementPage from './pages/UserManagementPage.jsx'; // Changed from .tsx

// Placeholder pages for other modules
const AdsPage = () => <div className="text-text-dark">Advertisements Management</div>;
const ReportsPage = () => <div className="text-text-dark">Reports & Moderation</div>;

const App = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          {/* Add more routes here */}
          <Route path="*" element={<h1 className="text-text-dark">404 Not Found</h1>} />
        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default App;