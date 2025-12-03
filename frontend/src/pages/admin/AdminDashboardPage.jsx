// src/pages/admin/AdminDashboardPage.jsx
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  return (
    <div className="admin-dash-page">

      <h2 className="admin-dash-title">Admin Dashboard</h2>

      {/* Overview */}
      <div className="admin-dash-overview">
        <OverviewCard label="Total Users" value="152" />
        <OverviewCard label="Total Ads" value="87" />
        <OverviewCard label="Pending Reports" value="5" />
        <OverviewCard label="Monthly Revenue" value="LKR 42,500" />
      </div>

      {/* Grid: Reports + Analytics */}
      <div className="admin-dash-grid">

        {/* Recent Reports */}
        <div className="admin-dash-card">
          <h3 className="admin-dash-card-title">Recent Reports</h3>

          <div className="admin-dash-report">
            <p><strong>Spam Ad</strong> — Reported by Student</p>
            <span className="report-pending">Pending</span>
          </div>

          <div className="admin-dash-report">
            <p><strong>Harassment Issue</strong> — Reported by Owner</p>
            <span className="report-reviewing">Under Review</span>
          </div>

          <div className="admin-dash-report">
            <p><strong>Fake Image</strong> — Reported by Student</p>
            <span className="report-resolved">Resolved</span>
          </div>
        </div>

        {/* Analytics Preview */}
        <div className="admin-dash-card">
          <h3 className="admin-dash-card-title">System Analytics</h3>

          <p className="admin-dash-subtext">
            Analytics charts coming soon (Occupancy, Revenue, User Growth, Ad Stats)
          </p>

          <div className="admin-dash-analytics-placeholder">
            <span>📊 Charts Placeholder</span>
          </div>
        </div>

      </div>

    </div>
  );
}
