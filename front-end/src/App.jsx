import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/Layout/AdminLayout.jsx'; 
import DashboardPage from './pages/DashboardPage.jsx'; 
import UserManagementPage from './pages/UserManagementPage.jsx'; 
import AdApprovalsPage from './pages/AdApprovalsPage.jsx'; // Import the new page

// Placeholder pages for other modules
const ReportsPage = () => <div className="text-text-dark">Reports & Moderation</div>;

const App = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/ads" element={<AdApprovalsPage />} /> // Use the new page here
          <Route path="/reports" element={<ReportsPage />} />
          {/* Add more routes here */}
          <Route path="*" element={<h1 className="text-text-dark">404 Not Found</h1>} />
        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default App;