import React from "react";

const formatCost = (cost) => `LKR ${Math.round(cost).toLocaleString()}`;

const UtilityCard = ({ boarding, onOpenModal }) => {
  const totalUtilityCost = boarding.electricityCost + boarding.waterCost;
  const totalMonthlyBill = boarding.baseRent + totalUtilityCost;
  const isUpdated = boarding.lastUpdated !== "N/A";

  // New Feature: Tenant Logic (Default to 4 if not in data)
  const tenantCount = boarding.tenantCount || 4;
  const perStudentCost = totalMonthlyBill / tenantCount;

  // New Feature: Mock Trend Logic (For demo purposes)
  // In real backend, you'd compare current vs previous month
  const isHighConsumption = totalUtilityCost > 3000;

  return (
    <div className="relative flex flex-col p-5 transition-all duration-300 border rounded-report shadow-custom hover:-translate-y-1 bg-card-bg border-light group">
      {/* Status Badge (Top Right) */}
      <div className="absolute z-10 top-4 right-4">
        {isUpdated ? (
          <span className="bg-success/10 text-success text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-success/20">
            Updated
          </span>
        ) : (
          <span className="bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-primary/20 animate-pulse">
            Action Needed
          </span>
        )}
      </div>

      {/* Image Section */}
      <div className="mb-4 w-full h-[100px] overflow-hidden rounded-card relative">
        <img
          src={
            boarding.image || "https://via.placeholder.com/300?text=No+Image"
          }
          alt={boarding.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay Gradient for text readability if needed */}
        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100" />
      </div>

      <div className="flex-1 w-full space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1 truncate pr-16">
            {boarding.name}
          </h3>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-black leading-none tracking-tighter text-text">
              {formatCost(totalMonthlyBill)}
            </div>
            {/* Trend Indicator */}
            {isUpdated && (
              <div
                className={`text-[9px] font-bold mb-1 ${
                  isHighConsumption ? "text-error" : "text-success"
                }`}
              >
                <i
                  className={`fas fa-arrow-${
                    isHighConsumption ? "up" : "down"
                  } mr-1`}
                ></i>
                {isHighConsumption ? "12%" : "4%"}
              </div>
            )}
          </div>
          <span className="text-[10px] font-bold text-muted/60 block mt-1">
            Total Monthly Estimate
          </span>
        </div>

        {/* Smart Split Section (New) */}
        <div className="flex items-center justify-between p-3 border bg-light/30 rounded-xl border-light">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm text-muted">
              <i className="text-xs fas fa-user-friends"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase text-muted tracking-widest">
                Per Head
              </span>
              <span className="text-[10px] font-bold text-text">
                {tenantCount} Students
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-sm font-black tracking-tight text-accent">
              {formatCost(perStudentCost)}
            </span>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="pt-2 space-y-1">
          <div className="flex justify-between text-[11px] font-bold text-muted border-b border-light/50 pb-1">
            <span>Base Rent</span>
            <span className="text-text">{formatCost(boarding.baseRent)}</span>
          </div>
          <div className="flex justify-between text-[11px] font-bold text-muted border-b border-light/50 pb-1">
            <span>Utilities</span>
            <span className="text-text">{formatCost(totalUtilityCost)}</span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="w-full pt-0 mt-5">
        <button
          className={`
            w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-xl 
            transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center gap-2 border
            ${
              isUpdated
                ? "bg-white text-text border-light hover:border-accent hover:text-accent"
                : "bg-accent text-white border-transparent shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5"
            }
          `}
          onClick={() => onOpenModal(boarding)}
        >
          <i className={`fas ${isUpdated ? "fa-pencil-alt" : "fa-plus"}`}></i>
          {isUpdated ? "Edit Costs" : "Add Bill Data"}
        </button>
      </div>
    </div>
  );
};

export default UtilityCard;
