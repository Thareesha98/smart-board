import React from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatWidget from "../../components/Owner/dashboard/StatWidget";
import DashButton from "../../components/Owner/dashboard/DashButton";
import DashboardSection from "../../components/Owner/dashboard/DashboardSection";
import AppointmentItem from "../../components/Owner/dashboard/AppointmentItem";
import ActivityItem from "../../components/Owner/dashboard/ActivityItem";
import {
  dashboardData,
  recentAppointments,
  recentActivity,
  ownerData,
} from "../../data/mockData.js";

export default function Dashboard() {
  const { firstName: userName, avatar: userAvatar } = ownerData;

  return (
    <div className="space-y-8 pt-4 pb-10">
      <HeaderBar
        title={`Welcome back, ${userName}!`}
        subtitle="Manage your boarding properties efficiently"
        notificationCount={3}
        userAvatar={userAvatar}
        userName={userName}
      />

      {/* 1. Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget
          icon="fas fa-building"
          title="Total Ads"
          mainValue={`${dashboardData.totalAds} Properties`}
          subValue={`${dashboardData.activeAds} Active`}
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
          subValue={`${dashboardData.revenueGrowth} growth`}
        />
        <StatWidget
          icon="fas fa-star"
          title="Average Rating"
          mainValue={dashboardData.avgRating}
          subValue="From 45 reviews"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🌟 Restored Quick Actions Bar */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-(--primary) flex items-center gap-2">
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
        </section>

        {/* 2. Recent Appointments Column */}
        <DashboardSection
          title="Recent Appointments"
          badge={`${dashboardData.newAppointmentsCount} New`}
        >
          <div className="max-h-[380px] overflow-y-auto">
            {recentAppointments.map((app) => (
              <AppointmentItem key={app.id} appointment={app} />
            ))}
          </div>
        </DashboardSection>
      </div>

      {/* 3. Recent Activity */}
      <DashboardSection title="Recent Activity">
        <div className="max-h-[400px] overflow-y-auto">
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index} data={activity} />
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
