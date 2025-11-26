import { Link, Outlet, useLocation } from "react-router-dom";
import "./OwnerLayout.css";

export default function OwnerLayout() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="sbms-ownerlayout">

      {/* Sidebar */}
      <aside className="sbms-owner-sidebar">
        <h2 className="sbms-owner-sidebar-title">Owner</h2>

        <nav className="sbms-owner-nav">

          <Link
            to="/owner/dashboard"
            className={current.includes("/dashboard") ? "active" : ""}
          >
            Dashboard
          </Link>

          <Link
            to="/owner/my-ads"
            className={current.includes("/my-ads") ? "active" : ""}
          >
            My Ads
          </Link>

          <Link
            to="/owner/create-ad"
            className={current.includes("/create-ad") ? "active" : ""}
          >
            Create Ad
          </Link>

          <Link
            to="/owner/appointments"
            className={current.includes("/appointments") ? "active" : ""}
          >
            Appointments
          </Link>

          <Link
            to="/owner/profile"
            className={current.includes("/profile") ? "active" : ""}
          >
            Profile
          </Link>

        </nav>
      </aside>

      {/* Page content */}
      <main className="sbms-owner-main">
        <Outlet />
      </main>

    </div>
  );
}
