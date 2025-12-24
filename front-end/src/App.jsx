import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/student/AuthContext.jsx';
import ScrollToTop from './ScrollToTop';

import OwnerLayout from "./layouts/OwnerLayout";
import Dashboard from "./pages/owner/Dashboard";
import MyBoardingsPage from "./pages/owner/MyBoardingsPage";
import AppointmentsPage from "./pages/owner/AppointmentsPage";
import UtilityPage from "./pages/owner/UtilityPage";
import ProfilePage from "./pages/owner/ProfilePage";
import MyAdsPage from "./pages/owner/MyAdsPage";
import CreateAdPage from "./pages/owner/CreateAdPage";
import EditAdPage from "./pages/owner/EditAdPage";
import SubscriptionPlanPage from "./pages/owner/SubscriptionPlanPage";
import PaymentPage from "./pages/owner/PaymentPage";
import ReportsPage from "./pages/owner/ReportsPage";
import ReportStudentPage from "./pages/owner/AddReportPage";

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />

      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/ownerLayout/dashboard" replace />} />

        {/* Owner layout */}
        <Route path="ownerLayout" element={<OwnerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="myboardings" element={<MyBoardingsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="utility" element={<UtilityPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="myAds" element={<MyAdsPage />} />
          <Route path="myAds/createAd" element={<CreateAdPage />} />
          <Route path="myAds/editAd/:adId" element={<EditAdPage />} />
          <Route path="subscriptions/:adId" element={<SubscriptionPlanPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="reports/add" element={<ReportStudentPage />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>

        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
