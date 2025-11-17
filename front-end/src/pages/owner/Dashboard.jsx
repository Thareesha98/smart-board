import React from "react";
import { Link } from "react-router-dom";

// Exact colors and styling constants from the provided CSS files
const COLORS = {
  primary: "#D84C38",
  accent: "#FF7A00",
  text: "#332720",
  muted: "#665345",
  cardBg: "#FFFFFF",
  light: "#E8DBC7",
  radius: "25px",
  shadow: "0 6px 20px rgba(0,0,0,0.08)",
  success: "#10B981",
  error: "#EF4444",
  info: "#3B82F6",
  warning: "#F59E0B",
};

// Mock Data for the Dashboard
const dashboardData = {
  userName: "Rajesh K.",
  totalAds: 8,
  activeAds: 6,
  pendingAds: 2,
  totalTenants: 12,
  occupancyRate: "75%",
  monthlyRevenue: 2400,
  revenueGrowth: "+12%",
  avgRating: "4.2/5.0",
  newAppointmentsCount: 3,
};

// Mock Recent Appointments
const recentAppointments = [
  {
    id: "apt1",
    student: "Priya Sharma",
    property: "Sunshine Hostel",
    time: "Tomorrow 2:00 PM",
    status: "pending",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    isNew: true,
  },
  {
    id: "apt2",
    student: "Arun Kumar",
    property: "City View Apartments",
    time: "Dec 28, 3:30 PM",
    status: "confirmed",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    isNew: true,
  },
  {
    id: "apt3",
    student: "Meena Patel",
    property: "Green Valley Hostel",
    time: "Dec 29, 11:00 AM",
    status: "pending",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    isNew: false,
  },
  {
    id: "apt4",
    student: "Rahul Verma",
    property: "Sunshine Hostel",
    time: "Dec 27, 4:00 PM",
    status: "completed",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    isNew: false,
  },
];

// Mock Activity Feed
const recentActivity = [
  {
    icon: "fas fa-calendar-plus",
    text: "New appointment requested by",
    bold: "Priya Sharma",
    time: "2 hours ago",
  },
  {
    icon: "fas fa-credit-card",
    text: "Payment received from",
    bold: "Rohan Mehta - $250",
    time: "1 day ago",
  },
  {
    icon: "fas fa-tools",
    text: "Maintenance request submitted for",
    bold: "Room 5 plumbing",
    time: "2 days ago",
  },
  {
    icon: "fas fa-star",
    text: "New review received for",
    bold: "Sunshine Hostel - 5 stars",
    time: "3 days ago",
  },
];

// --- Reusable Components ---

const StatWidget = ({
  icon,
  title,
  mainValue,
  subValue,
  subLabel,
  hasButton = false,
}) => (
  <div
    className="stat-widget flex p-6 rounded-[25px] shadow-lg transition duration-300 hover:translate-y-[-5px] relative"
    style={{ backgroundColor: COLORS.cardBg, boxShadow: COLORS.shadow }}
  >
    <div
      className="widget-icon p-4 rounded-[15px] text-2xl flex-shrink-0"
      style={{ backgroundColor: COLORS.light, color: COLORS.accent }}
    >
      <i className={icon}></i>
    </div>
    <div className="widget-content ml-4 flex-1">
      <h3
        className="text-sm font-semibold mb-3"
        style={{ color: COLORS.muted }}
      >
        {title}
      </h3>
      <div className="widget-details flex flex-col gap-1">
        <strong className="text-xl font-bold" style={{ color: COLORS.text }}>
          {mainValue}
        </strong>
        <span className="text-sm" style={{ color: COLORS.muted }}>
          {subValue}
        </span>
      </div>
      {hasButton && (
        <Link
          to="/owner/billing"
          className="btn btn-primary view-earnings p-2 px-4 text-sm font-semibold rounded-[25px] mt-3 inline-block no-underline"
          style={{ backgroundColor: COLORS.accent, color: COLORS.cardBg }}
        >
          {subLabel}
        </Link>
      )}
    </div>
  </div>
);

const DashButton = ({ to, icon, label }) => (
  <Link
    to={to}
    className="dash-btn flex items-center gap-[0.75rem] p-3 px-4 font-semibold rounded-[25px] transition duration-200 shadow-sm"
    style={{
      backgroundColor: "transparent",
      borderColor: "rgba(0, 0, 0, 0.05)",
      color: COLORS.text,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    }}
    // Uses the complex hover styles defined in the prompt conversion
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = COLORS.accent;
      e.currentTarget.style.color = "white";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 122, 0, 0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.color = COLORS.text;
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
    }}
  >
    <i className={`${icon} w-5 text-center text-lg`}></i>
    <span>{label}</span>
  </Link>
);

const AppointmentItem = ({ appointment }) => {
  const statusColor =
    appointment.status === "pending"
      ? "#D97706"
      : appointment.status === "confirmed"
      ? "#065F46"
      : "#3730A3";
  const bgColor =
    appointment.status === "pending"
      ? "#FEF3C7"
      : appointment.status === "confirmed"
      ? "#D1FAE5"
      : "#E0E7FF";

  return (
    <div
      className={`appointment-item flex items-center gap-4 p-5 border-b relative transition duration-300 hover:bg-opacity-50 ${
        appointment.isNew ? "new" : ""
      }`}
      style={{
        borderColor: COLORS.light,
        backgroundColor: appointment.isNew
          ? "rgba(255, 122, 0, 0.05)"
          : COLORS.cardBg,
      }}
    >
      {appointment.isNew && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"
          style={{ backgroundColor: COLORS.accent }}
        ></div>
      )}

      <div className="appointment-avatar w-[45px] h-[45px] rounded-full overflow-hidden flex-shrink-0">
        <img
          src={appointment.avatar}
          alt={appointment.student}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="appointment-content flex-1">
        <p className="font-semibold mb-0.5" style={{ color: COLORS.text }}>
          <strong style={{ color: COLORS.primary }}>
            {appointment.student}
          </strong>{" "}
          - {appointment.property}
        </p>
        <span
          className="appointment-time text-sm block"
          style={{ color: COLORS.muted }}
        >
          {appointment.time}
        </span>
        <span
          className="appointment-status text-xs px-2 py-[0.2rem] rounded-[12px] font-semibold"
          style={{ backgroundColor: bgColor, color: statusColor }}
        >
          {appointment.status.toUpperCase()}
        </span>
      </div>

      <div className="appointment-actions flex gap-2 flex-shrink-0">
        <Link
          to={`/owner/appointments`}
          className="btn btn-primary btn-sm px-3 py-1.5 text-xs font-semibold rounded-[25px] no-underline"
          style={{ backgroundColor: COLORS.accent, color: COLORS.cardBg }}
        >
          View
        </Link>
      </div>
    </div>
  );
};

const ActivityItem = ({ data }) => (
  <div
    className="activity-item flex items-center gap-4 p-5 border-b transition duration-300 hover:bg-opacity-50"
    style={{ borderColor: COLORS.light }}
  >
    <div
      className="activity-icon w-[45px] h-[45px] p-3 rounded-[12px] text-lg flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: COLORS.light, color: COLORS.accent }}
    >
      <i className={data.icon}></i>
    </div>
    <div className="activity-content flex-1">
      <p className="mb-0.5" style={{ color: COLORS.text }}>
        {data.text}{" "}
        <strong style={{ color: COLORS.primary }}>{data.bold}</strong>
      </p>
      <span className="activity-time text-sm" style={{ color: COLORS.muted }}>
        {data.time}
      </span>
    </div>
  </div>
);

// --- Main Component ---
export default function Dashboard() {
  // Note: The Dashboard Header is assumed to be rendered by the OwnerLayout
  return (
    <div className="space-y-8 pt-4">
      {/* Header Placeholder (If OwnerLayout doesn't provide it) */}
      <header
        className="content-header flex justify-between items-center p-6 rounded-[25px] shadow-lg sticky top-[1.5rem] z-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(5px)",
          boxShadow: COLORS.shadow,
        }}
      >
        <div className="header-left flex flex-col">
          <h1
            className="text-[1.8rem] font-bold leading-tight"
            style={{ color: COLORS.primary }}
          >
            Welcome back, {dashboardData.userName.split(" ")[0]}!
          </h1>
          <p className="text-base" style={{ color: COLORS.muted }}>
            Manage your boarding properties efficiently
          </p>
        </div>
        {/* Notification/User Menu omitted, as they belong in OwnerLayout if sticky */}
      </header>

      {/* 1. Stats Overview */}
      <section className="stats-overview">
        <div className="widget-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatWidget
            icon="fas fa-building"
            title="Total Ads"
            mainValue={`${dashboardData.totalAds} Properties`}
            subValue={`${dashboardData.activeAds} Active, ${dashboardData.pendingAds} Pending`}
          />
          <StatWidget
            icon="fas fa-users"
            title="Active Tenants"
            mainValue={`${dashboardData.totalTenants} Students`}
            subValue={`${dashboardData.occupancyRate} Occupancy`}
          />
          <StatWidget
            icon="fas fa-money-bill-wave"
            title="Monthly Revenue"
            mainValue={`$${dashboardData.monthlyRevenue.toLocaleString()}`}
            subValue={`${dashboardData.revenueGrowth} from last month`}
            hasButton
            subLabel="View Details"
          />
          <StatWidget
            icon="fas fa-star"
            title="Average Rating"
            mainValue={dashboardData.avgRating}
            subValue="From 45 reviews"
          />
        </div>
      </section>

      {/* 2. Quick Actions & Recent Appointments */}
      <section className="dashboard-section">
        <div className="two-column-layout grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions Column */}
          <div className="column">
            <h2
              className="text-[1.5rem] font-bold mb-4 flex items-center gap-2"
              style={{ color: COLORS.primary }}
            >
              Quick Actions
            </h2>
            <div
              className="quick-actions bg-white p-6 rounded-[25px] shadow-lg flex flex-wrap gap-4"
              style={{ boxShadow: COLORS.shadow }}
            >
              <div className="action-column flex flex-col flex-grow min-w-[250px] gap-3">
                <DashButton
                  to="/owner/create-ad"
                  icon="fas fa-plus"
                  label="Add New Boarding"
                />
                <DashButton
                  to="/owner/appointments"
                  icon="fas fa-calendar-check"
                  label="Manage Appointments"
                />
                <DashButton
                  to="/owner/utilities"
                  icon="fas fa-bolt"
                  label="Add Utility Costs"
                />
              </div>
              <div className="action-column flex flex-col flex-grow min-w-[250px] gap-3">
                <DashButton
                  to="/owner/subscriptions"
                  icon="fas fa-crown"
                  label="Boost Ads"
                />
                <DashButton
                  to="/owner/my-ads"
                  icon="fas fa-eye"
                  label="View Ads"
                />
                <DashButton
                  to="/owner/billing"
                  icon="fas fa-credit-card"
                  label="View Payments"
                />
              </div>
            </div>
          </div>

          {/* Recent Appointments Column */}
          <div className="column">
            <h2
              className="text-[1.5rem] font-bold mb-4 flex items-center gap-2"
              style={{ color: COLORS.primary }}
            >
              Recent Appointments
              <span
                className="badge text-[0.75rem] px-2 py-[0.25rem] rounded-[12px] font-semibold"
                style={{ backgroundColor: COLORS.accent, color: COLORS.cardBg }}
              >
                {dashboardData.newAppointmentsCount} New
              </span>
            </h2>
            <div
              className="appointments-feed bg-white rounded-[25px] shadow-lg overflow-hidden"
              style={{ boxShadow: COLORS.shadow }}
            >
              {recentAppointments.map((app) => (
                <AppointmentItem key={app.id} appointment={app} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Performance Analytics */}
      <section className="dashboard-section">
        <h2
          className="text-[1.5rem] font-bold mb-4 flex items-center gap-2"
          style={{ color: COLORS.primary }}
        >
          Performance Analytics
        </h2>
        <div className="analytics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Occupancy Rate Card */}
          <div
            className="analytics-card bg-white p-6 rounded-[25px] shadow-lg"
            style={{ boxShadow: COLORS.shadow }}
          >
            <div className="analytics-header flex justify-between items-center mb-4">
              <h3
                className="text-base font-semibold"
                style={{ color: COLORS.muted }}
              >
                Occupancy Rate
              </h3>
              <span
                className="analytics-value text-xl font-bold"
                style={{ color: COLORS.text }}
              >
                {dashboardData.occupancyRate}
              </span>
            </div>
            <div
              className="progress-bar rounded-lg h-2 mb-4"
              style={{ backgroundColor: COLORS.light }}
            >
              <div
                className="progress-fill h-full rounded-lg"
                style={{
                  width: dashboardData.occupancyRate,
                  backgroundColor: COLORS.success,
                }}
              ></div>
            </div>
            <div className="analytics-footer flex justify-between items-center">
              <span
                className="trend text-sm font-semibold"
                style={{ color: COLORS.success }}
              >
                +5% this month
              </span>
              <Link
                to="/owner/my-ads"
                className="text-sm font-semibold no-underline"
                style={{ color: COLORS.accent }}
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Revenue Trend Card */}
          <div
            className="analytics-card bg-white p-6 rounded-[25px] shadow-lg"
            style={{ boxShadow: COLORS.shadow }}
          >
            <div className="analytics-header flex justify-between items-center mb-4">
              <h3
                className="text-base font-semibold"
                style={{ color: COLORS.muted }}
              >
                Revenue Trend
              </h3>
              <span
                className="analytics-value text-xl font-bold"
                style={{ color: COLORS.text }}
              >
                ${dashboardData.monthlyRevenue.toLocaleString()}
              </span>
            </div>
            <div className="revenue-chart h-20 flex items-end gap-2 mb-4">
              <div className="chart-bars flex items-end gap-1 w-full h-full">
                <div
                  className="chart-bar flex-1 rounded-t"
                  style={{ height: "60%", backgroundColor: COLORS.accent }}
                ></div>
                <div
                  className="chart-bar flex-1 rounded-t"
                  style={{ height: "75%", backgroundColor: COLORS.accent }}
                ></div>
                <div
                  className="chart-bar flex-1 rounded-t"
                  style={{ height: "80%", backgroundColor: COLORS.accent }}
                ></div>
                <div
                  className="chart-bar flex-1 rounded-t"
                  style={{ height: "90%", backgroundColor: COLORS.accent }}
                ></div>
              </div>
            </div>
            <div className="analytics-footer flex justify-between items-center">
              <span
                className="trend text-sm font-semibold"
                style={{ color: COLORS.success }}
              >
                {dashboardData.revenueGrowth} growth
              </span>
              <Link
                to="/owner/billing"
                className="text-sm font-semibold no-underline"
                style={{ color: COLORS.accent }}
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Ad Performance Card */}
          <div
            className="analytics-card bg-white p-6 rounded-[25px] shadow-lg"
            style={{ boxShadow: COLORS.shadow }}
          >
            <div className="analytics-header flex justify-between items-center mb-4">
              <h3
                className="text-base font-semibold"
                style={{ color: COLORS.muted }}
              >
                Ad Performance
              </h3>
              <span
                className="analytics-value text-xl font-bold"
                style={{ color: COLORS.text }}
              >
                85%
              </span>
            </div>
            <div className="performance-stats flex flex-col gap-3">
              <div className="stat flex justify-between items-center">
                <span
                  className="stat-label text-sm"
                  style={{ color: COLORS.muted }}
                >
                  Views
                </span>
                <span
                  className="stat-value font-semibold"
                  style={{ color: COLORS.text }}
                >
                  1,245
                </span>
              </div>
              <div className="stat flex justify-between items-center">
                <span
                  className="stat-label text-sm"
                  style={{ color: COLORS.muted }}
                >
                  Appointments
                </span>
                <span
                  className="stat-value font-semibold"
                  style={{ color: COLORS.text }}
                >
                  28
                </span>
              </div>
              <div className="stat flex justify-between items-center">
                <span
                  className="stat-label text-sm"
                  style={{ color: COLORS.muted }}
                >
                  Conversion
                </span>
                <span
                  className="stat-value font-semibold"
                  style={{ color: COLORS.text }}
                >
                  2.2%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Recent Activity */}
      <section className="dashboard-section">
        <h2
          className="text-[1.5rem] font-bold mb-4 flex items-center gap-2"
          style={{ color: COLORS.primary }}
        >
          Recent Activity
        </h2>
        <div
          className="activity-feed bg-white rounded-[25px] shadow-lg overflow-hidden"
          style={{ boxShadow: COLORS.shadow }}
        >
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index} data={activity} />
          ))}
        </div>
      </section>
    </div>
  );
}
