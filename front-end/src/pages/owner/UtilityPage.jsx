import React, { useState } from "react";
import UtilityCard from "../../components/Owner/utilities/UtilityCard";
import { INITIAL_BOARDINGS_DATA, ownerData } from "../../data/mockData.js";
import HeaderBar from "../../components/Owner/common/HeaderBar.jsx";
import {
  BillingSummary,
  NiceInput,
} from "../../components/Owner/utilities/UtilityModals.jsx";

export default function UtilityPage() {
  const [boardings, setBoardings] = useState(INITIAL_BOARDINGS_DATA);
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [formData, setFormData] = useState({
    electricity: "",
    water: "",
    period: "",
  });

  const totalUtility =
    (Number(formData.electricity) || 0) + (Number(formData.water) || 0);
  const totalMonthly = (selectedBoarding?.baseRent || 0) + totalUtility;

  const handleSubmit = (e) => {
    e.preventDefault();
    setBoardings((prev) =>
      prev.map((b) =>
        b.id === selectedBoarding.id
          ? {
              ...b,
              electricityCost: +formData.electricity,
              waterCost: +formData.water,
              lastUpdated: formData.period,
            }
          : b
      )
    );
    setSelectedBoarding(null);
  };

  return (
    <div className="pt-4 space-y-8 min-h-screen bg-light pb-12">
      <HeaderBar
        title="Utility Tracker"
        subtitle="Manage monthly consumption costs per property."
        notificationCount={1}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      {/* Main Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
        {boardings.map((b) => (
          <UtilityCard
            key={b.id}
            boarding={b}
            onOpenModal={() => {
              setSelectedBoarding(b);
              setFormData({
                electricity: b.electricityCost,
                water: b.waterCost,
                period: new Date().toISOString().substring(0, 7),
              });
            }}
          />
        ))}
      </section>

      {/* Nice Modal Overlay */}
      {selectedBoarding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-text/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-[480px] bg-card-bg rounded-report shadow-2xl overflow-hidden border border-light">
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4 flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-text tracking-tight uppercase">
                  Update Bills
                </h3>
                <p className="text-[11px] font-bold text-muted uppercase tracking-widest">
                  {selectedBoarding.name}
                </p>
              </div>
              <button
                onClick={() => setSelectedBoarding(null)}
                className="w-10 h-10 rounded-full bg-light flex items-center justify-center text-muted hover:bg-error/10 hover:text-error transition-all active:scale-90"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">
                  Billing Month
                </label>
                <input
                  type="month"
                  value={formData.period}
                  onChange={(e) =>
                    setFormData({ ...formData, period: e.target.value })
                  }
                  className="w-full p-4 bg-light/30 rounded-2xl border border-light outline-none font-black text-text focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <NiceInput
                  label="Electricity"
                  icon="fa-bolt"
                  value={formData.electricity}
                  onChange={(e) =>
                    setFormData({ ...formData, electricity: e.target.value })
                  }
                />
                <NiceInput
                  label="Water"
                  icon="fa-tint"
                  value={formData.water}
                  onChange={(e) =>
                    setFormData({ ...formData, water: e.target.value })
                  }
                />
              </div>

              <BillingSummary
                totalUtility={totalUtility}
                totalMonthly={totalMonthly}
                baseRent={selectedBoarding.baseRent}
              />

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-accent text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-accent/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all"
                >
                  Save & Update Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
