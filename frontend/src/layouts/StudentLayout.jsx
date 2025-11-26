import { Link, Outlet, useLocation } from "react-router-dom";
import "./StudentLayout.css";

export default function StudentLayout() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <div className="sbms-studentlayout">

      {/* Sidebar */}
      <aside className="sbms-student-sidebar">
        <h2 className="sbms-student-sidebar-title">Student</h2>

        <nav className="sbms-student-nav">

          <Link
            to="/student/dashboard"
            className={current.includes("/dashboard") ? "active" : ""}
          >
            Dashboard
          </Link>

          <Link
            to="/student/my-boardings"
            className={current.includes("/my-boardings") ? "active" : ""}
          >
            My Boardings
          </Link>

          <Link
            to="/student/appointments"
            className={current.includes("/appointments") ? "active" : ""}
          >
            Appointments
          </Link>

          <Link
            to="/student/billing"
            className={current.includes("/billing") ? "active" : ""}
          >
            Billing
          </Link>

          <Link
            to="/student/profile"
            className={current.includes("/profile") ? "active" : ""}
          >
            Profile
          </Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="sbms-student-main">
        <Outlet />
      </main>

    </div>
  );
}
