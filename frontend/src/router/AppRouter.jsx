// src/router/AppRouter.jsx
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import StudentLayout from "../layouts/StudentLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import SignupPage from "../pages/public/SignupPage";
import SearchBoardingsPage from "../pages/public/SearchBoardingsPage";
import BoardingDetailsPage from "../pages/public/BoardingDetailsPage";

// Student Pages
import StudentDashboardPage from "../pages/student/StudentDashboardPage";
import MyBoardingsPage from "../pages/student/MyBoardingsPage";
import MyAppointmentsPage from "../pages/student/MyAppointmentsPage";
import BillingPage from "../pages/student/BillingPage";
import ProfilePage from "../pages/student/ProfilePage";

// Owner Pages
import OwnerDashboardPage from "../pages/owner/OwnerDashboardPage";
import MyAdsPage from "../pages/owner/MyAdsPage";
import CreateAdPage from "../pages/owner/CreateAdPage";
import EditAdPage from "../pages/owner/EditAdPage";
import OwnerAppointmentsPage from "../pages/owner/OwnerAppointmentsPage";
import OwnerProfilePage from "../pages/owner/OwnerProfilePage";

// Admin Pages
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ManageAdsPage from "../pages/admin/ManageAdsPage";
import ManageUsersPage from "../pages/admin/ManageUsersPage";
import ManageReportsPage from "../pages/admin/ManageReportsPage";
import ManageThirdPartyAdsPage from "../pages/admin/ManageThirdPartyAdsPage";
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";

export default function AppRouter() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchBoardingsPage />} />
        <Route path="/boarding/:id" element={<BoardingDetailsPage />} />
      </Route>

      {/* STUDENT ROUTES */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboardPage />} />
        <Route path="my-boardings" element={<MyBoardingsPage />} />
        <Route path="appointments" element={<MyAppointmentsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* OWNER ROUTES */}
      <Route path="/owner" element={<OwnerLayout />}>
        <Route path="dashboard" element={<OwnerDashboardPage />} />
        <Route path="my-ads" element={<MyAdsPage />} />
        <Route path="create-ad" element={<CreateAdPage />} />
        <Route path="edit-ad/:id" element={<EditAdPage />} />
        <Route path="appointments" element={<OwnerAppointmentsPage />} />
        <Route path="profile" element={<OwnerProfilePage />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="manage-ads" element={<ManageAdsPage />} />
        <Route path="manage-users" element={<ManageUsersPage />} />
        <Route path="manage-reports" element={<ManageReportsPage />} />
        <Route path="manage-ads-3p" element={<ManageThirdPartyAdsPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
      </Route>

    </Routes>
  );
}
