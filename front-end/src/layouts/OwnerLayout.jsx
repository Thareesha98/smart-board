import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpg";

const ownerNavigation = [
  { name: "Dashboard", path: "/ownerLayout/dashboard", icon: "fas fa-home" },
  { name: "My Ads", path: "/ownerLayout/myAds", icon: "fas fa-bullhorn" },
  {
    name: "Appointments",
    path: "/ownerLayout/appointments",
    icon: "fas fa-calendar-alt",
  },
  {
    name: "My Boardings",
    path: "/ownerLayout/myboardings",
    icon: "fas fa-dog",
  },
  { name: "Utility", path: "/ownerLayout/utility", icon: "fas fa-cogs" },
  { name: "Payment", path: "/ownerLayout/payment", icon: "fas fa-credit-card" },
  { name: "Reports", path: "/ownerLayout/reports", icon: "fas fa-file-alt" },
];

const BASE_LINK_CLASSES =
  "mx-3 my-1 p-3 flex items-center gap-3 transition duration-300 rounded-[12px] no-underline text-base font-medium";

export default function OwnerLayout() {
  const { pathname: currentPath } = useLocation();
  const userName = "Mr. Silva";

  const activePath = (() => {
    if (currentPath.includes("/ownerLayout/myAds")) return "/ownerLayout/myAds";
    if (currentPath.includes("/ownerLayout/profile"))
      return "/ownerLayout/profile";

    const normalizedPath =
      currentPath === "/owner" || currentPath === "/owner/"
        ? "/ownerLayout/dashboard"
        : currentPath;

    const foundItem = ownerNavigation.find(
      (item) => item.path === normalizedPath
    );
    if (foundItem) return foundItem.path;

    for (const item of ownerNavigation) {
      if (normalizedPath.startsWith(item.path + "/")) return item.path;
    }
    return "";
  })();

  const getLinkClasses = (path) => {
    const isActive = activePath === path;
    const isLogout = path === "logout";

    if (isLogout)
      return `${BASE_LINK_CLASSES} mt-1 text-white hover:text-primary hover:bg-white`;

    return `${BASE_LINK_CLASSES} ${
      isActive
        ? "bg-white text-primary"
        : "text-white hover:text-primary hover:bg-white"
    }`;
  };

  return (
    <div className="flex min-h-screen bg-light">
      {/* 1. Vertical Sidebar */}
      <aside className="flex flex-col shrink-0 w-[280px] p-6 pt-0 m-6 overflow-y-auto bg-primary text-card-bg rounded-report shadow-custom sticky top-6 h-[calc(100vh-3rem)]">
        {/* Sidebar Header */}
        <div className="py-6 px-0 mb-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img
              src={Logo}
              alt="SmartBoAD Logo"
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

        {/* Navigation Links */}
        <nav className="flex-1">
          <h3 className="px-6 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent border-b border-white/10">
            Main Navigation
          </h3>

          <div className="pt-2">
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
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-4 mt-auto border-t border-white/10">
          <Link
            to="/ownerLayout/profile"
            className={getLinkClasses("/ownerLayout/profile")}
          >
            <i className="fas fa-user w-5 text-center"></i>
            <span>{userName}</span>
          </Link>

          <a
            href="/"
            className={getLinkClasses("logout")}
            style={{ color: "var(--accent)" }}
          >
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-8 pt-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
