import React, { useState, useEffect } from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import StatWidget from "../../components/Owner/dashboard/StatWidget";
import SkeletonWidget from "../../components/Owner/dashboard/SkeletonWidget";
import HeroAction from "../../components/Owner/dashboard/HeroAction";
import DashButton from "../../components/Owner/dashboard/DashButton";
import AppointmentItem from "../../components/Owner/dashboard/AppointmentItem";
import DashboardSection from "../../components/Owner/dashboard/DashboardSection";
import RecentTransactions from "../../components/Owner/dashboard/RecentTransactions"; // Imported new component
import { recentAppointments, ownerData } from "../../data/mockData.js";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching from backend
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pb-12 bg-light/30">
      <HeaderBar
        title={`Welcome back, ${ownerData.firstName}!`}
        subtitle="Here is your daily property overview."
        notificationCount={3}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      {/* FULL WIDTH CONTAINER (Removes gaps) */}
      <div className="w-full px-4 py-8 space-y-8 sm:px-6 md:px-8">
        {/* 1. STATS ROW - 4 Columns */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
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
                subValue="45/49 Beds Filled"
                trend={{ value: "2%", isPositive: true }}
              />
              <StatWidget
                icon="fas fa-star"
                title="Avg Rating"
                mainValue="4.8"
                subValue="Top Rated Owner"
              />
              <StatWidget
                icon="fas fa-bullhorn"
                title="Active Ads"
                mainValue="3"
                subValue="1 Expiring Soon"
                trend={{ value: "Low", isPositive: false }}
              />
            </>
          )}
        </div>

        {/* 2. MAIN LAYOUT - Asymmetric Grid (2/3 + 1/3) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN (Wide): Financials & Deep Data */}
          <div className="space-y-8 lg:col-span-2">
            {/* Revenue Analytics Chart Area */}
            <div className="bg-card-bg rounded-xl border border-light p-6 shadow-sm min-h-[350px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text">
                  Revenue Analytics
                </h3>
                <select className="text-xs font-bold tracking-wide uppercase rounded-lg border-light text-muted bg-light/30">
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
              </div>

              {/* Placeholder for Recharts - Replace with actual chart later */}
              <div className="relative flex items-center justify-center flex-1 overflow-hidden border border-dashed rounded-lg bg-light/20 border-light/50 text-muted group">
                <div className="z-10 text-center">
                  <i className="mb-3 text-5xl fas fa-chart-area opacity-20"></i>
                  <p className="text-sm font-medium">
                    Chart Visualization Loading...
                  </p>
                </div>
                {/* Decorative background for professional feel */}
                <div className="absolute inset-0 opacity-50 bg-gradient-to-t from-light/40 to-transparent"></div>
              </div>
            </div>

            {/* Recent Transactions Table (Replaces Activity) */}
            <RecentTransactions />
          </div>

          {/* RIGHT COLUMN (Sidebar): Actions & Lists */}
          <div className="space-y-6">
            {/* Hero Action (Primary Call to Action) */}
            <HeroAction />

            {/* Quick Actions Grid */}
            <div className="p-5 border shadow-sm bg-card-bg rounded-xl border-light">
              <h3 className="mb-4 text-xs font-black tracking-widest uppercase text-muted/50">
                Management
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <DashButton
                  to="/ownerLayout/utility"
                  icon="fas fa-bolt"
                  label="Utility"
                />
                <DashButton
                  to="/ownerLayout/myAds"
                  icon="fas fa-eye"
                  label="View Ads"
                />
                <DashButton
                  to="/ownerLayout/payment"
                  icon="fas fa-credit-card"
                  label="Payments"
                />
                <DashButton
                  to="/ownerLayout/profile"
                  icon="fas fa-cog"
                  label="Settings"
                />
              </div>
            </div>

            {/* Upcoming Appointments List */}
            <DashboardSection
              title="Appointments"
              badge={`${recentAppointments.filter((a) => a.status === "pending").length} Pending`}
            >
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar divide-y divide-light">
                {recentAppointments.map((app) => (
                  <AppointmentItem key={app.id} appointment={app} />
                ))}

                {recentAppointments.length === 0 && (
                  <div className="p-8 text-sm text-center text-muted">
                    No upcoming appointments
                  </div>
                )}
              </div>
            </DashboardSection>
          </div>
        </div>
      </div>
    </div>
  );
}
