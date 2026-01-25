import React from "react";
import UtilityCard from "../../components/Owner/utilities/UtilityCard";
import StatsOverview from "../../components/Owner/utilities/StatsOverview";
import FilterBar from "../../components/Owner/utilities/FilterBar";
import HeaderBar from "../../components/Owner/common/HeaderBar.jsx";
import {
  BillingSummary,
  NiceInput,
} from "../../components/Owner/utilities/UtilityModals.jsx";
import { ownerData } from "../../data/mockData.js";
import { useUtilityLogic } from "../../hooks/owner/useUtilityLogic.js"; // Import the hook

export default function UtilityPage() {
  // Use the Custom Hook
  const {
    boardings,
    filteredBoardings,
    selectedBoarding,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    totalUtility,
    totalMonthly,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
  } = useUtilityLogic();

  return (
    <div className="min-h-screen pt-4 pb-12 space-y-8 bg-light">
      <HeaderBar
        title="Utility Tracker"
        subtitle="Manage monthly consumption costs per property."
        notificationCount={1}
        userAvatar={ownerData.avatar}
        userName={ownerData.firstName}
      />

      {/* Stats Dashboard */}
      <StatsOverview boardings={boardings} />

      {/* Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {/* Main Grid */}
      <section className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBoardings.map((b) => (
          <UtilityCard
            key={b.id}
            boarding={b}
            onOpenModal={() => handleOpenModal(b)}
          />
        ))}
        {filteredBoardings.length === 0 && (
          <div className="py-12 text-center col-span-full text-muted">
            <i className="mb-3 text-2xl fas fa-search opacity-20"></i>
            <p className="text-xs font-bold tracking-widest uppercase">
              No properties found
            </p>
          </div>
        )}
      </section>

      {/* --- SCROLLABLE MODAL --- */}
      {selectedBoarding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-text/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-[480px] max-h-[85vh] flex flex-col bg-card-bg rounded-report shadow-2xl overflow-hidden border border-light">
            {/* Header (Fixed) */}
            <div className="z-20 flex items-start justify-between px-8 pt-8 pb-4 border-b shrink-0 bg-card-bg border-light/50">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tight uppercase text-text">
                  Update Bills
                </h3>
                <p className="text-[11px] font-bold text-muted uppercase tracking-widest">
                  {selectedBoarding.name}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="flex items-center justify-center w-10 h-10 transition-all rounded-full bg-light text-muted hover:bg-error/10 hover:text-error active:scale-90"
              >
                <i className="text-lg fas fa-times"></i>
              </button>
            </div>

            {/* Scrollable Form Area */}
            <form
              onSubmit={handleSubmit}
              className="p-8 pt-6 space-y-6 overflow-y-auto custom-scrollbar"
            >
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
                  className="w-full p-4 font-black transition-all border outline-none bg-light/30 rounded-2xl border-light text-text focus:ring-4 focus:ring-accent/10 focus:border-accent"
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

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-[0.2em] ml-1">
                  Attach Bill Evidence
                </label>
                <div className="flex flex-col items-center justify-center p-4 text-center transition-all border-2 border-dashed cursor-pointer border-light rounded-xl hover:bg-light/30 hover:border-accent/50 group">
                  <div className="flex items-center justify-center w-10 h-10 mb-2 transition-colors rounded-full bg-light group-hover:bg-accent/10 group-hover:text-accent">
                    <i className="fas fa-camera text-muted group-hover:text-accent"></i>
                  </div>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
                    Click to upload photo
                  </p>
                </div>
              </div>

              <BillingSummary
                totalUtility={totalUtility}
                totalMonthly={totalMonthly}
                baseRent={selectedBoarding.baseRent}
                tenantCount={selectedBoarding.tenantCount || 4}
              />

              <div className="flex gap-4 pt-2 pb-2">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-accent text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-accent/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all"
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