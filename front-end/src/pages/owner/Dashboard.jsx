import React from "react";
import { Link } from "react-router-dom";
import { StatWidget } from "../../components/Owner/StatWidget";
import { DashButton } from "../../components/Owner/DashButton";
import { AppointmentItem } from "../../components/Owner/AppointmentItem";
import { ActivityItem } from "../../components/Owner/ActivityItem";

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

// Mock Data for Header (Owner)
const userName = "Mr. Silva";
const userAvatar = "https://randomuser.me/api/portraits/men/57.jpg";
const notificationCount = 3;

export default function Dashboard() {
  return (
    <div className="space-y-8 pt-4">
      <header
        className="content-header flex justify-between items-center p-6 rounded-[25px] shadow-lg sticky top-6 z-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(5px)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div className="header-left flex flex-col">
          <h1
            className="text-[1.8rem] font-bold leading-tight"
            style={{ color: "var(--primary)" }}
          >
            Welcome back, {dashboardData.userName.split(" ")[0]}!
          </h1>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Manage your boarding properties efficiently
          </p>
        </div>
        {/* Header Right (Quick Action, Notification, User Menu) */}
        <div className="header-right flex items-center gap-6">
          {/* Notification Bell */}
          <div
            className="notification-bell relative cursor-pointer p-3 rounded-full transition duration-300"
            style={{ backgroundColor: "var(--light)", color: "var(--text)" }}
          >
            <i className="fas fa-bell"></i>
            {notificationCount > 0 && (
              <span
                className="notification-count absolute top-[-5px] right-[-5px] w-5 h-5 text-[0.75rem] flex items-center justify-center font-bold rounded-full"
                style={{ backgroundColor: "var(--error)", color: "white" }}
              >
                {notificationCount}
              </span>
            )}
          </div>

          {/* User Menu  */}
          <Link to="/ownerLayout/profile">
            <div
              className="user-menu flex items-center gap-3 cursor-pointer p-2 px-4 rounded-[25px] transition duration-300"
              style={{ backgroundColor: "var(--light)", color: "var(--text)" }}
            >
              <img
                src={userAvatar}
                alt={userName}
                className="user-avatar w-10 h-10 rounded-full object-cover"
                style={{ border: `2px solid ${"var(--accent)"}` }}
              />
              <span>{userName}</span>
            </div>
          </Link>
        </div>
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
              style={{ color: "var(--primary)" }}
            >
              Quick Actions
            </h2>
            <div
              className="quick-actions bg-white p-6 rounded-[25px] shadow-lg flex flex-wrap gap-4"
              style={{ boxShadow: "var(--shadow)" }}
            >
              <div className="action-column flex flex-col grow min-w-[250px] gap-3">
                <DashButton
                  to="/ownerLayout/createAd"
                  icon="fas fa-plus"
                  label="Add New Boarding"
                />
                <DashButton
                  to="/ownerLayout/appointments"
                  icon="fas fa-calendar-check"
                  label="Manage Appointments"
                />
                <DashButton
                  to="/ownerLayout/utility"
                  icon="fas fa-bolt"
                  label="Add Utility Costs"
                />
              </div>
              <div className="action-column flex flex-col grow min-w-[250px] gap-3">
                <DashButton
                  to="/ownerLayout/subscriptions"
                  icon="fas fa-crown"
                  label="Boost Ads"
                />
                <DashButton
                  to="/ownerLayout/myAds"
                  icon="fas fa-eye"
                  label="View Ads"
                />
                <DashButton
                  to="/ownerLayout/payments"
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
              style={{ color: "var(--primary)" }}
            >
              Recent Appointments
              <span
                className="badge text-[0.75rem] px-2 py-1 rounded-xl font-semibold"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--card-bg)",
                }}
              >
                {dashboardData.newAppointmentsCount} New
              </span>
            </h2>
            <div
              className="appointments-feed bg-white rounded-[25px] shadow-lg overflow-hidden"
              style={{ boxShadow: "var(--shadow)" }}
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
          style={{ color: "var(--primary)" }}
        >
          Performance Analytics
        </h2>
        <div className="analytics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Occupancy Rate Card */}
          <div
            className="analytics-card bg-white p-6 rounded-[25px] shadow-lg"
            style={{ boxShadow: "var(--shadow)" }}
          >
            <div className="analytics-header flex justify-between items-center mb-4">
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--muted)" }}
              >
                Occupancy Rate
              </h3>
              <span
                className="analytics-value text-xl font-bold"
                style={{ color: "var(--text)" }}
              >
                {dashboardData.occupancyRate}
              </span>
            </div>
            <div
              className="progress-bar rounded-lg h-2 mb-4"
              style={{ backgroundColor: "var(--light)" }}
            >
              <div
                className="progress-fill h-full rounded-lg"
                style={{
                  width: dashboardData.occupancyRate,
                  backgroundColor: "var(--success)",
                }}
              ></div>
            </div>
            <div className="analytics-footer flex justify-between items-center">
              <span
                className="trend text-sm font-semibold"
                style={{ color: "var(--success)" }}
              >
                +5% this month
              </span>
              <Link
                to="/owner/my-ads"
                className="text-sm font-semibold no-underline"
                style={{ color: "var(--accent)" }}
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Revenue Trend Card */}
          <div
            className="analytics-card bg-white p-6 rounded-[25px] shadow-lg"
            style={{ boxShadow: "var(--shadow)" }}
          >
            <div className="analytics-header flex justify-between items-center mb-4">
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--muted)" }}
              >
                Revenue Trend
              </h3>
              <span
                className="analytics-value text-xl font-bold"
                style={{ color: "var(--text)" }}
              >
                ${dashboardData.monthlyRevenue.toLocaleString()}
              </span>
            </div>
            <div className="revenue-chart h-20 flex items-end gap-2 mb-4">
              <div className="chart-bars flex items-end gap-1 w-full h-full">
                <div
                  className="chart-bar flex-1 rounded-t"
                  style={{ height: "60%", backgroundColor: "var(--accent)" }}
                ></div>
                <div
                  className="chart-bar flex-1 rounded-t"
                  style={{ height: "75%", backgroundColor: "var(--accent)" }}
                ></div>
                <div
                  className="chart-bar flex-1 rounded-t"
                  style={{ height: "80%", backgroundColor: "var(--accent)" }}
                ></div>
                <div
                  className="chart-bar flex-1 rounded-t"
                  style={{ height: "90%", backgroundColor: "var(--accent)" }}
                ></div>
              </div>
            </div>
            <div className="analytics-footer flex justify-between items-center">
              <span
                className="trend text-sm font-semibold"
                style={{ color: "var(--success)" }}
              >
                {dashboardData.revenueGrowth} growth
              </span>
              <Link
                to="/owner/billing"
                className="text-sm font-semibold no-underline"
                style={{ color: "var(--accent)" }}
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Ad Performance Card */}
          <div
            className="analytics-card bg-white p-6 rounded-[25px] shadow-lg"
            style={{ boxShadow: "var(--shadow)" }}
          >
            <div className="analytics-header flex justify-between items-center mb-4">
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--muted)" }}
              >
                Ad Performance
              </h3>
              <span
                className="analytics-value text-xl font-bold"
                style={{ color: "var(--text)" }}
              >
                85%
              </span>
            </div>
            <div className="performance-stats flex flex-col gap-3">
              <div className="stat flex justify-between items-center">
                <span
                  className="stat-label text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  Views
                </span>
                <span
                  className="stat-value font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  1,245
                </span>
              </div>
              <div className="stat flex justify-between items-center">
                <span
                  className="stat-label text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  Appointments
                </span>
                <span
                  className="stat-value font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  28
                </span>
              </div>
              <div className="stat flex justify-between items-center">
                <span
                  className="stat-label text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  Conversion
                </span>
                <span
                  className="stat-value font-semibold"
                  style={{ color: "var(--text)" }}
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
          style={{ color: "var(--primary)" }}
        >
          Recent Activity
        </h2>
        <div
          className="activity-feed bg-white rounded-[25px] shadow-lg overflow-hidden"
          style={{ boxShadow: "var(--shadow)" }}
        >
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index} data={activity} />
          ))}
        </div>
      </section>
    </div>
  );
}
