import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useContext(AuthContext);

  // 1. If no user -> redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If user exists but role not allowed -> redirect
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Authorized
  return <Outlet />;
}
