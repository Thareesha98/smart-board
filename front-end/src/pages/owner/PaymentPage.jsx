import React from "react";
import HeaderBar from "../../components/Owner/common/HeaderBar";
import { boardingsData, ownerData } from "../../data/mockData";
import {
  PropertyHeader,
  PaymentProgress,
  InfoBox,
} from "../../components/Owner/payment/PaymentUIComponents";

export default function PaymentPage() {
  const currentMonth = "December 2025";

  return (
    <div className="pt-4 space-y-8 min-h-screen pb-10 bg-light">
      <HeaderBar
        title="Revenue Tracker"
        subtitle={`Monthly property rental status for ${currentMonth}`}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {boardingsData.map((boarding) => {
          const isPaid = boarding.id !== "B001"; // Mock payment logic
          const monthlyRent = parseInt(boarding.rent.replace(/\D/g, ""));

          // Use your theme's charcoal/text color for settled headers
          const headerBg = isPaid ? "bg-text" : "bg-accent";

          return (
            <div
              key={boarding.id}
              className="bg-card-bg rounded-boarding shadow-custom border border-light overflow-hidden flex flex-col transition-all hover:shadow-xl group"
            >
              <PropertyHeader
                boarding={boarding}
                isPaid={isPaid}
                currentMonth={currentMonth}
                headerBg={headerBg}
              />

              <div className="p-8 space-y-8">
                {/* Financial Summary */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-muted uppercase tracking-widest block">
                      Fixed Monthly Rent
                    </span>
                    <p className="text-2xl font-black text-text">
                      LKR {monthlyRent.toLocaleString()}
                    </p>
                  </div>

                  <div
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      isPaid
                        ? "border-success/30 text-success bg-success/5"
                        : "border-accent/30 text-accent bg-accent/5"
                    }`}
                  >
                    {isPaid ? "Settled" : "Awaiting"}
                  </div>
                </div>

                <PaymentProgress isPaid={isPaid} progress={isPaid ? 100 : 0} />

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <InfoBox
                    label="Due Date"
                    value={`05 ${currentMonth.split(" ")[0]}`}
                  />
                  <InfoBox
                    label="Occupancy"
                    value={`${boarding.tenantsList?.length || 0} Residents`}
                  />
                </div>
              </div>

              {/* Action Footer */}
              <button
                className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all border-t border-light ${
                  isPaid
                    ? "text-muted/40 hover:text-text hover:bg-light/10"
                    : "text-accent bg-accent/5 hover:bg-accent/10"
                }`}
              >
                {isPaid ? "View Receipt" : "Notify Property Manager"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
