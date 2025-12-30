import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Home from "./Home.jsx";

// --- CONTEXT PROVIDERS ---
import { StudentAuthProvider } from "./context/student/StudentAuthContext.jsx";
import { OwnerAuthProvider } from "./context/owner/OwnerAuthContext.jsx";

// --- ROUTE FILES ---
import StudentAppRoutes from "./routes/StudentAppRoutes.jsx";
import OwnerAppRoutes from "./routes/OwnerAppRoutes";

// --- NEW UNIFIED PAGES ---
// Ensure these paths match where you saved the files above
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

// Public Profile View
import PublicProfileView from "./pages/profile/PublicProfileView";

function App() {
  return (
    <>
      <StudentAuthProvider>
        <OwnerAuthProvider>
          <ScrollToTop />
          <Routes>
            {/* ==================== GLOBAL AUTH ROUTES ==================== */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* ==================== ROLE SPECIFIC ROUTES ==================== */}
            {/* Student routes (Dashboard, etc.) */}
            <Route path="/student/*" element={<StudentAppRoutes />} />

            {/* Owner routes (Dashboard, My Ads, etc.) */}
            <Route path="/owner/*" element={<OwnerAppRoutes />} />

            {/* Public Profile view */}
            <Route path="/profile/view/:id" element={<PublicProfileView />} />

            {/* ==================== LANDING PAGE ==================== */}
            <Route path="/" element={<Home />} />
          </Routes>
        </OwnerAuthProvider>
      </StudentAuthProvider>
    </>
  );
}

export default App;
