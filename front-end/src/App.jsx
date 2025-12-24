import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/student/AuthContext";
import ScrollToTop from "./ScrollToTop";

import OwnerLayout from "./layouts/OwnerLayout";
import OwnerRoutes from "./routes/OwnerRoutes";
import StudentRoutes from "./routes/StudentRoutes";

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />

      <Routes>
        {/* Default landing */}
        <Route path="/" element={<Navigate to="/student/login" replace />} />

        {/* Student routes */}
        <Route path="/student/*" element={<StudentRoutes />} />

        {/* Owner routes */}
        <Route path="/ownerLayout/*" element={<OwnerRoutes />} />

        {/* Global fallback */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
