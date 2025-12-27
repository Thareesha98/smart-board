import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Components
import OwnerProtectedRoute from '../components/Owner/common/OwnerProtectedRoute.jsx';
import LoginPage from '../pages/owner/auth/OwnerLoginPage.jsx';
import SignupPage from '../pages/owner/auth/OwnerSignupPage.jsx';

//Owner Pages
import CreateAdPage from "../pages/owner/CreateAdPage";
import EditAdPage from "../pages/owner/EditAdPage";
import MyAdsPage from "../pages/owner/MyAdsPage";
import OwnerLayout from "../layouts/OwnerLayout";
import AppointmentsPage from "../pages/owner/AppointmentsPage";
import ProfilePage from "../pages/owner/ProfilePage";
import Dashboard from "../pages/owner/Dashboard";
import MyBoardingsPage from "../pages/owner/MyBoardingsPage";
import UtilityPage from "../pages/owner/UtilityPage";
import ReportsPage from "../pages/owner/ReportsPage";
import ReportStudentPage from "../pages/owner/AddReportPage";
import SubscriptionPlanPage from "../pages/owner/SubscriptionPlanPage";
import PaymentPage from "../pages/owner/PaymentPage";

const OwnerAppRoutes = () => {
  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />

     
      {/* ==================== OWNER ROUTES ==================== */}
      <Route
        path="/"
        element={
          <OwnerProtectedRoute>
            <OwnerLayout />
          </OwnerProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="myAds" element={<MyAdsPage />} />
        <Route path="myAds/createAd" element={<CreateAdPage />} />
        <Route path="myAds/editAd/:adId" element={<EditAdPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="myboardings" element={<MyBoardingsPage />} />
        <Route path="utility" element={<UtilityPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="reports/add" element={<ReportStudentPage />} />
        <Route path="subscriptions/:adId" element={<SubscriptionPlanPage />} />
      </Route>

      {/* ==================== FALLBACK ROUTE ==================== */}
      <Route path="*" element={<Navigate to="/owner/login" replace />} />
    </Routes>
  );
};

export default OwnerAppRoutes;