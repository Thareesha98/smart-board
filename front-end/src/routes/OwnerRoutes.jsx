import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/student/common/ProtectedRoute";

/* Layout */
import OwnerLayout from "../layouts/OwnerLayout";

/* Pages */
import Dashboard from "../pages/owner/Dashboard";
import MyBoardingsPage from "../pages/owner/MyBoardingsPage";
import AppointmentsPage from "../pages/owner/AppointmentsPage";
import UtilityPage from "../pages/owner/UtilityPage";
import ProfilePage from "../pages/owner/ProfilePage";
import MyAdsPage from "../pages/owner/MyAdsPage";
import CreateAdPage from "../pages/owner/CreateAdPage";
import EditAdPage from "../pages/owner/EditAdPage";
import SubscriptionPlanPage from "../pages/owner/SubscriptionPlanPage";
import PaymentPage from "../pages/owner/PaymentPage";
import ReportsPage from "../pages/owner/ReportsPage";
import ReportStudentPage from "../pages/owner/AddReportPage";

export default function OwnerRoutes() {
  return (
    <Routes>
      {/* 🔒 ALL OWNER ROUTES ARE PROTECTED */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["OWNER"]}>
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        {/* Default owner route */}
        <Route index element={<Dashboard />} />

        {/* Core routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="myboardings" element={<MyBoardingsPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="utility" element={<UtilityPage />} />
        <Route path="profile" element={<ProfilePage />} />

        {/* Ads */}
        <Route path="myAds" element={<MyAdsPage />} />
        <Route path="myAds/createAd" element={<CreateAdPage />} />
        <Route path="myAds/editAd/:adId" element={<EditAdPage />} />

        {/* Subscription & payments */}
        <Route path="subscriptions/:adId" element={<SubscriptionPlanPage />} />
        <Route path="payment" element={<PaymentPage />} />

        {/* Reports */}
        <Route path="reports" element={<ReportsPage />} />
        <Route path="reports/add" element={<ReportStudentPage />} />

        {/* Owner 404 */}
        <Route
          path="*"
          element={
            <h1 className="text-3xl text-red-500 p-8">
              Owner Page Not Found
            </h1>
          }
        />
      </Route>

      {/* Safety fallback */}
      <Route path="*" element={<Navigate to="/ownerLayout/dashboard" replace />} />
    </Routes>
  );
}
