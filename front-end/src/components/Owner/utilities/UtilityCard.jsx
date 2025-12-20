import React from "react";

const formatCost = (cost) => `LKR ${Math.round(cost).toLocaleString()}`;

const UtilityCard = ({ boarding, onOpenModal }) => {
  const totalUtilityCost = boarding.electricityCost + boarding.waterCost;
  const totalMonthlyBill = boarding.baseRent + totalUtilityCost;
  const isUpdated = boarding.lastUpdated !== "N/A";

  return (
    <div className="flex flex-col p-6 rounded-report shadow-custom transition-all duration-300 hover:-translate-y-1 relative bg-card-bg border border-light">
      {/* Image Section */}
      <div className="mb-4 w-full h-[100px] overflow-hidden rounded-card">
        <img
          src={boarding.image}
          alt={boarding.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="flex-1 w-full">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1">
          {boarding.name}
        </h3>

        {/* Total Monthly Bill (Rent + Utility Share) */}
        <div className="text-3xl font-black text-primary tracking-tighter leading-none mb-1">
          {formatCost(totalMonthlyBill)}
        </div>

        <span className="text-[11px] font-black uppercase tracking-widest text-accent mb-4 block">
          Total Monthly Bill (Est.)
        </span>

        {/* Utility Breakdown */}
        <div className="space-y-1 mt-4">
          <div className="flex justify-between text-xs font-bold text-muted border-b border-light pb-1">
            <span>Base Rent</span>
            <span className="text-text">{formatCost(boarding.baseRent)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-muted border-b border-light pb-1">
            <span>Utilities</span>
            <span className="text-text">{formatCost(totalUtilityCost)}</span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-muted/50">
              Last Period: {boarding.lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-6 pt-4 border-t border-light w-full">
        <button
          className={`
            w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-full 
            transition-all duration-300 shadow-md active:scale-95 flex items-center justify-center gap-2
            ${isUpdated ? "bg-accent text-white" : "bg-success text-white"}
          `}
          onClick={() => onOpenModal(boarding)}
        >
          <i className={`fas ${isUpdated ? "fa-pencil-alt" : "fa-plus"}`}></i>
          {isUpdated ? "Edit Latest Costs" : "Add Costs"}
        </button>
      </div>
    </div>
  );
};

export default UtilityCard;
