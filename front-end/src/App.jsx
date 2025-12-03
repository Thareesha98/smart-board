import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/student/common/ProtectedRoute";

// ScrollTop
import ScrollToTop from "./ScrollToTop";

// Auth Pages
import LoginPage from "./pages/student/auth/LoginPage";
import SignupPage from "./pages/student/auth/SignupPage";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import AppointmentsPage from "./pages/student/AppointmentsPage";
import SearchBoardingsPage from "./pages/student/SearchBoardingsPage";
import BoardingDetailsPage from "./pages/student/BoardingDetailsPage";
import MyBoardingsPage from "./pages/student/MyBoardingsPage";
import BillingPage from "./pages/student/BillingPage";
import MaintenancePage from "./pages/student/MaintenancePage";
import ReportsPage from "./pages/student/ReportsPage";
import ProfilePage from "./pages/student/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ==================== PUBLIC ROUTES ==================== */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* ==================== PROTECTED ROUTES ==================== */}
          
          {/* Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Appointments */}
          <Route
            path="/appointmentpage"
            element={
              <ProtectedRoute>
                <AppointmentsPage />
              </ProtectedRoute>
            }
          />

          {/* Search Boardings */}
          <Route
            path="/search-boardings"
            element={
              <ProtectedRoute>
                <SearchBoardingsPage />
              </ProtectedRoute>
            }
          />

          {/* Boarding Details */}
          <Route
            path="/boarding-details/:id"
            element={
              <ProtectedRoute>
                <BoardingDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* My Boardings */}
          <Route
            path="/my-boardings"
            element={
              <ProtectedRoute>
                <MyBoardingsPage />
              </ProtectedRoute>
            }
          />

          {/* Billing & Payments */}
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <BillingPage />
              </ProtectedRoute>
            }
          />

          {/* Maintenance */}
          <Route
            path="/maintenance"
            element={
              <ProtectedRoute>
                <MaintenancePage />
              </ProtectedRoute>
            }
          />

          {/* Reports */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* ==================== FALLBACK ROUTE ==================== */}
          {/* Redirect any unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;