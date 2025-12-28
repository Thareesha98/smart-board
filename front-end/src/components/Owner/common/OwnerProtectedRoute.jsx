import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useOwnerAuth } from '../../../context/owner/OwnerAuthContext.jsx';

const OwnerProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useOwnerAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect to owner-specific login
  if (!isAuthenticated) {
    return <Navigate to="/owner/login" replace />;
  }

  return <Outlet />;
};

export default OwnerProtectedRoute;