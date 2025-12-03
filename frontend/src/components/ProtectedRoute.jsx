import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function ProtectedRoute({ children, allowedRoles = [] }){
  const { user } = useContext(AuthContext);
  if(!user) return <Navigate to="/login" replace />

  // if backend includes role as 'role' or 'roles' adjust here:
  const roles = user?.roles || (user?.role ? [user.role] : []);
  const allowed = allowedRoles.length === 0 || roles.some(r => allowedRoles.includes(r));
  if(!allowed) return <div className="card">Access denied</div>;
  return children;
}
