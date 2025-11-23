const formatCost = (cost, currency = "$", fixed = 0) =>
  `${currency}${Math.round(cost).toFixed(fixed).toLocaleString()}`;

const calculateTotalMonthlyBill = (property) => {
  if (
    property.totalTenants === 0 ||
    (property.electricityCost === 0 && property.waterCost === 0)
  ) {
    return property.baseRent;
  }

  const totalUtilityCostLKR = property.electricityCost + property.waterCost;
  const utilityShareLKR = totalUtilityCostLKR / property.totalTenants;

  // Assume fixed rate for display purposes: 1 USD = 300 LKR
  const LKR_TO_USD_RATE = 300;
  const utilityShareUSD = utilityShareLKR / LKR_TO_USD_RATE;

  return property.baseRent + utilityShareUSD;
};

export const UtilityCard = ({ boarding, onOpenModal }) => {
  // This call is now valid due to function hoisting
  const billPerTenant = calculateTotalMonthlyBill(boarding);
  const totalUtilityCost = boarding.electricityCost + boarding.waterCost;
  const isUpdated = boarding.lastUpdated !== "N/A";

  return (
    <div
      className="overview-card flex flex-col p-6 rounded-[25px] shadow-lg transition duration-300 hover:translate-y-[-5px] relative"
      style={{ backgroundColor: "var(--card-bg)", boxShadow: "var(--shadow)" }}
    >
      {/* Image Section */}
      <div className="mb-4 w-full h-[100px] overflow-hidden rounded-xl">
        <img
          src={boarding.image}
          alt={boarding.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="card-content flex-1 w-full">
        <h3
          className="text-base font-semibold mb-1"
          style={{ color: "var(--muted)" }}
        >
          {boarding.name}
        </h3>

        {/* Total Monthly Bill (Rent + Utility Share) */}
        <div
          className="amount text-3xl font-bold mb-1"
          style={{ color: "var(--primary)" }}
        >
          {formatCost(billPerTenant, "$")}
        </div>
        <span
          className="text-sm font-semibold mb-2 block"
          style={{ color: "var(--accent)" }}
        >
          Total Monthly Bill (Est.)
        </span>

        {/* Utility Breakdown */}
        <span
          className="due-date text-sm block"
          style={{ color: "var(--muted)" }}
        >
          Base Rent: {formatCost(boarding.baseRent)}
        </span>
        <span
          className="due-date text-sm block"
          style={{ color: "var(--muted)" }}
        >
          Total Utility Bill: {formatCost(totalUtilityCost, "LKR", 0)}
        </span>
        <span
          className="due-date text-xs block mt-1"
          style={{ color: "var(--muted)" }}
        >
          Last Period: {boarding.lastUpdated}
        </span>
      </div>

      <div
        className="mt-4 pt-4 border-t w-full"
        style={{ borderColor: "var(--light)" }}
      >
        <button
          className="btn btn-primary btn-full w-full py-2 text-sm rounded-[25px] font-semibold"
          style={{
            backgroundColor: isUpdated ? "var(--accent)" : "var(--success)",
            color: "var(--card-bg)",
          }}
          onClick={() => onOpenModal(boarding)}
        >
          <i className="fas fa-pencil-alt mr-1"></i>
          {isUpdated ? "Edit Latest Costs" : "Add Costs"}
        </button>
      </div>
    </div>
  );
};