import { Link, Outlet, useLocation } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="sbms-adminlayout">

      {/* Sidebar */}
      <aside className="sbms-admin-sidebar">

        <h2 className="sbms-admin-sidebar-title">Admin</h2>

        <nav className="sbms-admin-nav">

          <Link
            to="/admin/dashboard"
            className={current.includes("/dashboard") ? "active" : ""}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/manage-ads"
            className={current.includes("/manage-ads") ? "active" : ""}
          >
            Manage Boarding Ads
          </Link>

          <Link
            to="/admin/manage-users"
            className={current.includes("/manage-users") ? "active" : ""}
          >
            Manage Users
          </Link>

          <Link
            to="/admin/manage-reports"
            className={current.includes("/manage-reports") ? "active" : ""}
          >
            Reports
          </Link>

          <Link
            to="/admin/manage-ads-3p"
            className={current.includes("/manage-ads-3p") ? "active" : ""}
          >
            Third-Party Ads
          </Link>

          <Link
            to="/admin/analytics"
            className={current.includes("/analytics") ? "active" : ""}
          >
            Analytics
          </Link>

        </nav>
      </aside>

      {/* Page Content */}
      <main className="sbms-admin-main">
        <Outlet />
      </main>

    </div>
  );
}
