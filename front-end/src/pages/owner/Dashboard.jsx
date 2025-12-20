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
    <div className="space-y-8 pt-4 pb-10 bg-light min-h-screen">
      <HeaderBar
        title={`Welcome back, ${userName}!`}
        subtitle="Manage your boarding properties efficiently"
        notificationCount={3}
        userAvatar={userAvatar}
        userName={userName}
      />

      {/* 1. Stats Overview - 4 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2">
        {/* 2. Quick Actions Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-primary flex items-center gap-2 uppercase tracking-tight">
            Quick Actions
          </h2>
          <div className="bg-card-bg p-6 rounded-report shadow-custom border border-light">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DashButton
                to="/ownerLayout/myAds/createAd"
                icon="fas fa-plus"
                label="Add New Ad"
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
                to="/ownerLayout/payment"
                icon="fas fa-credit-card"
                label="View Payments"
              />
            </div>
          </div>
        </section>

        {/* 3. Recent Appointments Section */}
        <DashboardSection
          title="Recent Appointments"
          badge={`${dashboardData.newAppointmentsCount} New`}
        >
          <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
            {recentAppointments.map((app) => (
              <AppointmentItem key={app.id} appointment={app} />
            ))}
          </div>
        </DashboardSection>
      </div>

      {/* 4. Recent Activity - Full Width */}
      <div className="px-2">
        <DashboardSection title="Recent Activity">
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index} data={activity} />
            ))}
          </div>
        </DashboardSection>
      </div>
    </div>
  );
}
