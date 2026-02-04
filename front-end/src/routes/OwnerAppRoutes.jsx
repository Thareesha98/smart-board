import { Routes, Route, Navigate } from "react-router-dom";

// Auth Components (Login/Signup removed from here)
import OwnerProtectedRoute from "../components/Owner/common/OwnerProtectedRoute.jsx";

// Owner Pages
import CreateAdPage from "../pages/owner/CreateAdPage";
import EditAdPage from "../pages/owner/EditAdPage";
import MyAdsPage from "../pages/owner/MyAdsPage";
import OwnerLayout from "../layouts/OwnerLayout";
import Dashboard from "../pages/owner/Dashboard";
import AppointmentsPage from "../pages/owner/AppointmentsPage";
import ProfilePage from "../pages/owner/ProfilePage";
import MyBoardingsPage from "../pages/owner/MyBoardingsPage";
import UtilityPage from "../pages/owner/UtilityPage";
import ReportsPage from "../pages/owner/ReportsPage";
import ReportStudentPage from "../pages/owner/AddReportPage";
import SubscriptionPlanPage from "../pages/owner/SubscriptionPlanPage";
import PaymentPage from "../pages/owner/PaymentPage";
import MaintenancePage from "../pages/owner/MaintenancePage.jsx";
import RegistrationPage from "../pages/owner/RegistrationPage.jsx";

const OwnerAppRoutes = () => {
  return (
    <Routes>
      {/* ==================== PROTECTED OWNER ROUTES ==================== */}
      <Route element={<OwnerProtectedRoute />}>
        <Route path="/" element={<OwnerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="myAds" element={<MyAdsPage />} />
          <Route path="myAds/createAd" element={<CreateAdPage />} />
          <Route path="myAds/editAd/:adId" element={<EditAdPage />} />

          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="registrations" element={<RegistrationPage />} />
          <Route path="myboardings" element={<MyBoardingsPage />} />
          <Route path="utility" element={<UtilityPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="payment" element={<PaymentPage />} />

          <Route path="reports" element={<ReportsPage />} />
          <Route path="reports/add" element={<ReportStudentPage />} />

          <Route
            path="subscriptions/:adId"
            element={<SubscriptionPlanPage />}
          />
        </Route>
      </Route>

      {/* ==================== FALLBACK ROUTE ==================== */}
      {/* Redirects to global login if user is not authenticated or path is wrong */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default OwnerAppRoutes;
