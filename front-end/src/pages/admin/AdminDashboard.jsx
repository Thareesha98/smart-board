import React from "react";
import { useAdminAuth } from "../../context/admin/AdminAuthContext.jsx";

export default function AdminDashboard() {
  const { currentAdmin } = useAdminAuth();

  const getDisplayName = () => {
    if (!currentAdmin?.fullName) return "Admin";
    return currentAdmin.fullName;
  };

  return (
    <div className="pt-4 space-y-8 min-h-screen pb-12">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/70 backdrop-blur-sm p-6 rounded-large shadow-custom transition-all duration-500 hover:shadow-xl">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-primary text-2xl md:text-3xl font-bold mb-1">
            Welcome back, {getDisplayName()}!
          </h1>
          <p className="text-text-muted">Admin Control Panel</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-large shadow-custom p-6 border-t-4 border-accent">
          <h3 className="text-lg font-bold text-text mb-2">Subscription Plans</h3>
          <p className="text-text-muted text-sm">
            Manage subscription plans that owners and students can view and subscribe to.
          </p>
        </div>
      </div>
    </div>
  );
}
