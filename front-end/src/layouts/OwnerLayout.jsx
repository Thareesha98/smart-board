import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const ownerNavigation = [
  { name: "Dashboard", path: "/owner/dashboard", icon: "fas fa-home" },
  { name: "My Ads", path: "/owner/myAds", icon: "fas fa-bullhorn" },
  {
    name: "Appointments",
    path: "/owner/appointments",
    icon: "fas fa-calendar-alt",
  },
  {
    name: "My Boardings",
    path: "/owner/myboardings",
    icon: "fas fa-dog",
  },
  { name: "Utility", path: "/owner/utility", icon: "fas fa-cogs" },
  { name: "Payment", path: "/owner/payment", icon: "fas fa-credit-card" },
  { name: "Reports", path: "/owner/reports", icon: "fas fa-file-alt" },
];

const BASE_LINK_CLASSES =
  "mx-3 my-1 p-3 flex items-center gap-3 transition-all duration-300 rounded-[12px] no-underline text-base font-medium";

export default function OwnerLayout() {
  const { pathname: currentPath } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userName = "Mr. Silva";

  // Close sidebar automatically when changing routes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [currentPath]);

  const activePath = (() => {
    if (currentPath.includes("/owner/myAds")) return "/owner/myAds";
    if (currentPath.includes("/owner/profile"))
      return "/owner/profile";
    return (
      ownerNavigation.find((item) => currentPath.startsWith(item.path))?.path ||
      "/owner/dashboard"
    );
  })();

  const getLinkClasses = (path) => {
    const isActive = activePath === path;
    const isLogout = path === "logout";
    const base = isLogout
      ? `${BASE_LINK_CLASSES} text-accent hover:bg-white/10`
      : BASE_LINK_CLASSES;

    return `${base} ${
      isActive
        ? "bg-white text-primary shadow-lg"
        : "text-white hover:bg-white/10"
    }`;
  };

  return (
    <div className="flex min-h-screen bg-light flex-col lg:flex-row">
      {/* 1. Mobile Top Bar - Only visible on small screens */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-primary text-white sticky top-0 z-50 shadow-md">
        <Link
          to="/"
          className="flex items-center gap-2 no-underline text-white"
        >
          <img src={Logo} alt="Logo" className="h-8 w-8 rounded-lg" />
          <span className="font-bold tracking-tight">SmartBoAD</span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl p-2 focus:outline-none"
        >
          <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </header>

      {/* 2. Sidebar - Hidden on mobile, Drawer on Tablet, Fixed on Desktop */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-[280px] bg-primary text-card-bg transition-transform duration-300 transform p-6 pt-0
        lg:translate-x-0 lg:static lg:block lg:m-6 lg:rounded-report lg:h-[calc(100vh-3rem)] lg:sticky lg:top-6
        ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}
      >
        {/* Sidebar Header (Hidden on Mobile Drawer) */}
        <div className="hidden lg:flex py-6 px-0 mb-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img
              src={Logo}
              alt="Logo"
              className="h-[50px] w-[50px] rounded-[15px] object-cover border-2 border-white/20"
            />
            <div className="flex flex-col text-white">
              <strong className="text-xl font-bold leading-[1.1]">
                SmartBoAD
              </strong>
              <small className="text-[0.75rem] text-white/70">
                Owner Dashboard
              </small>
            </div>
          </Link>
        </div>

        {/* Mobile Header (Only visible in Drawer) */}
        <div className="lg:hidden py-8 border-b border-white/10 mb-4">
          <p className="text-accent font-black uppercase tracking-widest text-[10px]">
            Menu
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          {ownerNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={getLinkClasses(item.path)}
            >
              <i className={`${item.icon} w-5 text-center text-lg`}></i>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-4 mt-auto border-t border-white/10">
          <Link
            to="/owner/profile"
            className={getLinkClasses("/owner/profile")}
          >
            <i className="fas fa-user w-5 text-center"></i>
            <span>{userName}</span>
          </Link>
          <a href="/" className={getLinkClasses("logout")}>
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* 3. Backdrop for Mobile Drawer */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-text/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 4. Main Content Area */}
      <main className="flex-1 p-4 md:p-8 pt-6 md:pt-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}
