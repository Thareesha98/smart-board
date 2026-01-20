import React, { useState, useEffect } from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatWidget from "../../components/Owner/dashboard/StatWidget";
import SkeletonWidget from "../../components/Owner/dashboard/SkeletonWidget";
import HeroAction from "../../components/Owner/dashboard/HeroAction"; // New Component
import DashboardSection from "../../components/Owner/dashboard/DashboardSection";
import AppointmentItem from "../../components/Owner/dashboard/AppointmentItem";
import ActivityItem from "../../components/Owner/dashboard/ActivityItem";
import DashButton from "../../components/Owner/dashboard/DashButton";
import {
  dashboardData,
  recentAppointments,
  recentActivity,
  ownerData,
} from "../../data/mockData.js";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="min-h-screen pb-12 bg-light/30">
      <HeaderBar
        title={`Welcome, ${ownerData.firstName}`}
        subtitle="Here is what's happening with your properties today."
        // ... other props
      />

      <div className="px-4 py-8 mx-auto space-y-8 max-w-7xl sm:px-6">
        {/* 1. Stats Row - Always visible at top */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            // Show 4 skeletons while loading
            [...Array(4)].map((_, i) => <SkeletonWidget key={i} />)
          ) : (
            <>
              <StatWidget
                icon="fas fa-money-bill-wave"
                title="Total Revenue"
                mainValue="$12,450"
                subValue="Last 30 days"
                trend={{ value: "12%", isPositive: true }}
              />
              <StatWidget
                icon="fas fa-users"
                title="Occupancy"
                mainValue="92%"
                subValue="45/49 Beds"
                trend={{ value: "2%", isPositive: true }}
              />
              <StatWidget
                icon="fas fa-star"
                title="Rating"
                mainValue="4.8"
                subValue="Top Rated Owner"
              />
              <StatWidget
                icon="fas fa-clipboard-list"
                title="Active Ads"
                mainValue="3"
                subValue="1 Expiring soon"
                trend={{ value: "Low", isPositive: false }}
              />
            </>
          )}
        </div>

        {/* 2. Asymmetric Grid Layout (2/3 + 1/3) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN (Main Content) */}
          <div className="space-y-8 lg:col-span-2">
            {/* Chart Placeholder (Future Recharts Integration) */}
            <div className="flex items-center justify-center p-6 border shadow-sm bg-card-bg rounded-xl border-light h-80 text-muted">
              <div className="text-center">
                <i className="mb-2 text-4xl fas fa-chart-area opacity-20"></i>
                <p>Revenue Analytics Chart</p>
              </div>
            </div>

            <DashboardSection title="Upcoming Appointments" badge="3 Pending">
              <div className="divide-y divide-light">
                {recentAppointments.map((app) => (
                  <AppointmentItem key={app.id} appointment={app} />
                ))}
              </div>
            </DashboardSection>
          </div>

          {/* RIGHT COLUMN (Sidebar / Actions) */}
          <div className="space-y-6">
            {/* Hero Action for Primary Task */}
            <HeroAction />

            {/* Secondary Actions Grid */}
            <div className="p-5 border shadow-sm bg-card-bg rounded-xl border-light">
              <h3 className="mb-4 text-xs font-black tracking-widest uppercase text-muted/50">
                Quick Management
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <DashButton to="/utility" icon="fas fa-bolt" label="Utility" />
                <DashButton to="/ads" icon="fas fa-eye" label="View Ads" />
                <DashButton
                  to="/payment"
                  icon="fas fa-credit-card"
                  label="Payments"
                />
                <DashButton to="/profile" icon="fas fa-cog" label="Settings" />
              </div>
            </div>

            <DashboardSection title="Recent Activity">
              <div className="max-h-[400px] overflow-y-auto pr-2">
                {recentActivity.map((act, i) => (
                  <ActivityItem key={i} data={act} />
                ))}
              </div>
            </DashboardSection>
          </div>
        </div>
      </div>
    </div>
  );
}
