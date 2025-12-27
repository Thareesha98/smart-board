import React from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { StudentAuthProvider } from "./context/student/AuthContext.jsx";
import ScrollToTop from "./ScrollToTop";

import OwnerLayout from "./layouts/OwnerLayout";
import OwnerRoutes from "./routes/OwnerRoutes";
import StudentRoutes from "./routes/StudentRoutes";

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
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          
        </OwnerAuthProvider>
      </StudentAuthProvider>
    </>
  );
}

export default App;
