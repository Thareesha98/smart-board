import {
  Route,
  Routes,
} from "react-router-dom";
import { StudentAuthProvider } from "./context/student/StudentAuthContext.jsx";
import ScrollToTop from "./ScrollToTop";
// Import your two Route files
import StudentAppRoutes from "./routes/StudentAppRoutes.jsx";
import OwnerAppRoutes from "./routes/OwnerAppRoutes";
import { OwnerAuthProvider } from "./context/owner/OwnerAuthContext.jsx";
import Home from "./Home.jsx";

function App() {
  return (
    <>
      <StudentAuthProvider>
        <OwnerAuthProvider>
          
            <ScrollToTop />
            <Routes>
              {/* Delegate to Student routes if path starts with /student or is root */}
              <Route path="/student/*" element={<StudentAppRoutes />} />

              {/* Delegate to Owner routes if path starts with /ownerLayout */}
              <Route path="/owner/*" element={<OwnerAppRoutes />} />
              {/* Default Landing Logic */}
              <Route path="/" element={<Home />} />
            </Routes>
          
        </OwnerAuthProvider>
      </StudentAuthProvider>
    </>
  );
}

export default App;