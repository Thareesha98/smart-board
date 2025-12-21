import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/student/AuthContext.jsx';
import ScrollToTop from './ScrollToTop';
import AppRoutes from './routes/AppRoutes'; // Import the new routes file


import { Routes, Route, Navigate } from "react-router-dom";
import CreateAdPage from "./pages/owner/CreateAdPage";
import EditAdPage from "./pages/owner/EditAdPage";
import MyAdsPage from "./pages/owner/MyAdsPage";
import OwnerLayout from "./layouts/OwnerLayout";
import AppointmentsPage from "./pages/owner/AppointmentsPage";
import ProfilePage from "./pages/owner/ProfilePage";
import Dashboard from "./pages/owner/Dashboard";
import MyBoardingsPage from "./pages/owner/MyBoardingsPage";
import UtilityPage from "./pages/owner/UtilityPage";
import ReportsPage from "./pages/owner/ReportsPage";
import ReportStudentPage from "./pages/owner/AddReportPage";
import SubscriptionPlanPage from "./pages/owner/SubscriptionPlanPage";
import PaymentPage from "./pages/owner/PaymentPage";

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </AuthProvider>
    
    <div className="min-h-screen flex flex-col">
        <div className="grow">
          <Routes>
            {/* 0. Redirect root path '/' to the default dashboard view */}
            <Route path="/" element={<Navigate to="/ownerLayout/dashboard" replace />} />

            {/* 1. Nested Route using OwnerLayout */}
            <Route path="ownerLayout" element={<OwnerLayout />}>  
              
              {/* Core Navigation Routes */}
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
              
              {/* Reports Management */}
              <Route path="reports" element={<ReportsPage />} />
              <Route path="reports/add" element={<ReportStudentPage />} />
              
              {/* Catch-all for 404 within the layout */}
              <Route path="*" element={<h1 className="text-3xl text-red-500 p-8">404 Not Found</h1>} />
            </Route >
            
            {/* Catch-all for 404 outside the layout */}
            <Route path="*" element={<h1 className="text-3xl text-red-500 p-8">404 Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;