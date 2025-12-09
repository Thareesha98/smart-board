import React from "react";
import { Link } from "react-router-dom";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatWidget from "../../components/Owner/dashboard/StatWidget";
import DashButton from "../../components/Owner/dashboard/DashButton";
// Import other Dashboard-specific components as needed (ActivityItem, AppointmentItem)

// Import centralized data
import {
  dashboardData,
  recentAppointments,
  recentActivity,
  ownerData, // Reusing ownerData for user details
} from "../../data/mockData.js";

// --- Mock Data is now imported ---
const userName = ownerData.firstName; 
const userAvatar = ownerData.avatar;
const notificationCount = 3;


// Helper components (ActivityItem, AppointmentItem) are kept local or moved to components/dashboard/

const ActivityItem = ({ data }) => (
  <div
    className="activity-item flex items-center gap-4 p-5 border-b transition duration-300 hover:bg-opacity-50"
    style={{ borderColor: 'var(--light)' }}
  >
    <div
      className="activity-icon w-[45px] h-[45px] p-3 rounded-xl text-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: 'var(--light)', color: 'var(--accent)' }}
    >
      <i className={data.icon}></i>
    </div>
    <div className="activity-content flex-1">
      <p className="mb-0.5" style={{ color: 'var(--text)' }}>
        {data.text}{" "}
        <strong style={{ color: 'var(--primary)' }}>{data.bold}</strong>
      </p>
      <span className="activity-time text-sm" style={{ color: 'var(--muted)' }}>
        {data.time}
      </span>
    </div>
  </div>
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
        borderColor: 'var(--light)',
        backgroundColor: appointment.isNew
          ? "rgba(255, 122, 0, 0.05)"
          : 'var(--card-bg)',
      }}
    >
      {appointment.isNew && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"
          style={{ backgroundColor: 'var(--accent)' }}
        ></div>
      )}

      <div className="appointment-avatar w-[45px] h-[45px] rounded-full overflow-hidden shrink-0">
        <img
          src={appointment.avatar}
          alt={appointment.student}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="appointment-content flex-1">
        <p className="font-semibold mb-0.5" style={{ color: 'var(--text)' }}>
          <strong style={{ color: 'var(--primary)' }}>
            {appointment.student}
          </strong>{" "}
          - {appointment.property}
        </p>
        <span
          className="appointment-time text-sm block"
          style={{ color: 'var(--muted)' }}
        >
          {appointment.time}
        </span>
        <span
          className="appointment-status text-xs px-2 py-[0.2rem] rounded-xl font-semibold"
          style={{ backgroundColor: bgColor, color: statusColor }}
        >
          {appointment.status.toUpperCase()}
        </span>
      </div>

    </div>
  );
};

// --- Main Component ---
export default function Dashboard() {
  return (
    <div className="space-y-8 pt-4">
      <HeaderBar
        title={`Welcome back, ${userName}!`}
        subtitle="Manage your boarding properties efficiently"
        notificationCount={notificationCount}
        userAvatar={userAvatar}
        userName={userName}
      />

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
                  to="/ownerLayout/myAds"
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
      
      {/* 3. Performance Analytics (Keeping the rest as is for brevity) */}
      {/* ... (Performance Analytics) ... */}

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