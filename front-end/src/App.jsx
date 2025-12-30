import {
  Route,
  Routes,
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Home from "./Home.jsx";

// --- CONTEXT PROVIDERS ---
import { StudentAuthProvider } from "./context/student/StudentAuthContext.jsx";
import { OwnerAuthProvider } from "./context/owner/OwnerAuthContext.jsx";

// --- ROUTE FILES ---
import StudentAppRoutes from "./routes/StudentAppRoutes.jsx";
import OwnerAppRoutes from "./routes/OwnerAppRoutes";
import Home from "./Home.jsx";

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

            {/* ==================== LANDING PAGE ==================== */}
            <Route path="/" element={<Home />} />
          </Routes>
        </OwnerAuthProvider>
      </StudentAuthProvider>
    </>
  );
}

export default App;
