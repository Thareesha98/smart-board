import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/student/common/ProtectedRoute";

// Student Pages (Auth pages removed)
import StudentDashboard from "../pages/student/StudentDashboard";
import AppointmentsPage from "../pages/student/AppointmentsPage";
import SearchBoardingsPage from "../pages/student/SearchBoardingsPage";
import BoardingDetailsPage from "../pages/student/BoardingDetailsPage";
import MyBoardingsPage from "../pages/student/MyBoardingsPage";
import BillingPage from "../pages/student/BillingPage";
import MaintenancePage from "../pages/student/MaintenancePage";
import ReportsPage from "../pages/student/ReportsPage";
import ProfilePage from "../pages/student/ProfilePage";

const StudentAppRoutes = () => {
  return (
    <Routes>
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
      {/* Redirects to global login if user tries to access invalid student path */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default StudentAppRoutes;