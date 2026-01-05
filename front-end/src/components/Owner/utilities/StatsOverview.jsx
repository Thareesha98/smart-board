import React from "react";

const StatsCard = ({ title, value, subtext, icon, colorClass, bgClass }) => (
  <div className="flex-1 bg-card-bg p-6 rounded-report border border-light shadow-custom hover:-translate-y-1 transition-all duration-300">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
          {title}
        </p>
        <h2 className={`text-3xl font-black ${colorClass} tracking-tighter`}>
          {value}
        </h2>
        {subtext && (
          <p className="text-[10px] font-bold text-muted/60 mt-1">{subtext}</p>
        )}
      </div>
      <div
        className={`w-12 h-12 rounded-2xl ${bgClass} flex items-center justify-center shadow-sm`}
      >
        <i className={`fas ${icon} text-lg`}></i>
      </div>
    </div>
  </div>
);

const StatsOverview = ({ boardings }) => {
  // 1. Calculate Total Utility Cost (All properties)
  const totalUtility = boardings.reduce(
    (acc, curr) => acc + curr.electricityCost + curr.waterCost,
    0
  );

  // 2. Find the Highest Single Bill
  const highestBillValue = Math.max(
    ...boardings.map((b) => b.electricityCost + b.waterCost),
    0
  );

  // 3. Count Properties with "N/A" (Pending Updates)
  const pendingUpdates = boardings.filter(
    (b) => b.lastUpdated === "N/A"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {/* Total Utilities Card */}
      <StatsCard
        title="Total Utilities (Nov)"
        value={`LKR ${totalUtility.toLocaleString()}`}
        subtext={`${boardings.length} Active Properties`}
        icon="fa-coins"
        colorClass="text-text"
        bgClass="bg-accent/10 text-accent"
      />

      {/* Highest Consumer Card */}
      <StatsCard
        title="Highest Single Bill"
        value={`LKR ${highestBillValue.toLocaleString()}`}
        subtext="Peak Consumption"
        icon="fa-chart-line"
        colorClass="text-error"
        bgClass="bg-error/10 text-error"
      />

      {/* Pending Action Card */}
      <StatsCard
        title="Pending Updates"
        value={pendingUpdates}
        subtext={pendingUpdates > 0 ? "Requires Attention" : "All up to date"}
        icon="fa-clipboard-list"
        colorClass={pendingUpdates > 0 ? "text-primary" : "text-success"}
        bgClass={
          pendingUpdates > 0
            ? "bg-primary/10 text-primary"
            : "bg-success/10 text-success"
        }
      />
    </div>
  );
};

export default StatsOverview;
