import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Owner/common/Sidebar.jsx";

const OwnerLayout = ({ title, subtitle, headerRightContent }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background-light">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-6 lg:p-8 pt-4 w-full">


        {/* Page Content (Replaces <Outlet /> from your old file) */}
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;
