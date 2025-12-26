import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/student/common/ProtectedRoute';

// Auth Pages
import LoginPage from '../pages/student/auth/LoginPage';
import SignupPage from '../pages/student/auth/SignupPage';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import AppointmentsPage from '../pages/student/AppointmentsPage';
import SearchBoardingsPage from '../pages/student/SearchBoardingsPage';
import BoardingDetailsPage from '../pages/student/BoardingDetailsPage';
import MyBoardingsPage from '../pages/student/MyBoardingsPage';
import BillingPage from '../pages/student/BillingPage';
import MaintenancePage from '../pages/student/MaintenancePage';
import ReportsPage from '../pages/student/ReportsPage';
import ProfilePage from '../pages/student/ProfilePage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />

      {/* ==================== PROTECTED ROUTES ==================== */}
      

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointmentpage"
        element={
          <ProtectedRoute>
            <AppointmentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search-boardings"
        element={
          <ProtectedRoute>
            <SearchBoardingsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/boarding-details/:id"
        element={
          <ProtectedRoute>
            <BoardingDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-boardings"
        element={
          <ProtectedRoute>
            <MyBoardingsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/billing"
        element={
          <ProtectedRoute>
            <BillingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance"
        element={
          <ProtectedRoute>
            <MaintenancePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* ==================== FALLBACK ROUTE ==================== */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;