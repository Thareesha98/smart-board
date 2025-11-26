// src/pages/admin/AdminAnalyticsPage.jsx
import "./AdminAnalyticsPage.css";

export default function AdminAnalyticsPage() {
  return (
    <div className="analytics-page">
      <h2 className="analytics-title">Analytics Overview</h2>

      {/* Top Stats Cards */}
      <div className="analytics-stats">
        <div className="analytics-card">
          <h3>Total Revenue</h3>
          <p className="analytics-value">LKR 245,000</p>
        </div>

        <div className="analytics-card">
          <h3>New Users (This Month)</h3>
          <p className="analytics-value">32</p>
        </div>

        <div className="analytics-card">
          <h3>Active Boardings</h3>
          <p className="analytics-value">78</p>
        </div>

        <div className="analytics-card">
          <h3>Monthly Visits</h3>
          <p className="analytics-value">12,430</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="analytics-grid">

        <div className="analytics-chart-card">
          <h3>Revenue Growth</h3>
          <div className="analytics-chart-placeholder">📊 Chart Placeholder</div>
        </div>

        <div className="analytics-chart-card">
          <h3>User Growth</h3>
          <div className="analytics-chart-placeholder">📈 Chart Placeholder</div>
        </div>

        <div className="analytics-chart-card">
          <h3>Boarding Occupancy</h3>
          <div className="analytics-chart-placeholder">📉 Chart Placeholder</div>
        </div>

        <div className="analytics-chart-card">
          <h3>Most Popular Locations</h3>
          <div className="analytics-chart-placeholder">🗺️ Chart Placeholder</div>
        </div>

      </div>
    </div>
  );
}
