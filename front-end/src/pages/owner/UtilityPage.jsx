import React, { useState } from "react";
import UtilityCard from "../../components/Owner/utilities/UtilityCard"; // Import the reusable UtilityCard

import { INITIAL_BOARDINGS_DATA } from "../../data/mockData.js";


const formatCost = (cost) => `LKR ${Math.round(cost).toLocaleString()}`;


const calculateDynamicBill = (form, baseRent) => {
  const electricity = parseFloat(form.electricity) || 0;
  const water = parseFloat(form.water) || 0;

  const totalUtilityCost = electricity + water;

  if (totalUtilityCost < 0) {
    return {
      totalUtilityCost: 0,
      totalMonthlyBill: baseRent,
    };
  }

  const totalMonthlyBill = baseRent + totalUtilityCost;

  return {
    totalUtilityCost: totalUtilityCost,
    totalMonthlyBill: totalMonthlyBill,
  };
};


export default function UtilityPage() {
  const [boardings, setBoardings] = useState(INITIAL_BOARDINGS_DATA);
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [formData, setFormData] = useState({
    electricity: "",
    water: "",
    period: "",
  });

  const openModal = (boarding) => {
    setSelectedBoarding(boarding);
    setFormData({
      // Populate form with existing data for editing
      electricity: boarding.electricityCost.toString(),
      water: boarding.waterCost.toString(),
      period: new Date().toISOString().substring(0, 7),
    });
  };

  const closeModal = () => {
    setSelectedBoarding(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newElectricity = parseFloat(formData.electricity);
    const newWater = parseFloat(formData.water);
    const period = formData.period;

    if (newElectricity < 0 || newWater < 0) {
      alert("Costs cannot be negative.");
      return;
    }

    // 1. Update the component's state list (boardings)
    setBoardings((prevBoardings) =>
      prevBoardings.map((b) =>
        b.id === selectedBoarding.id
          ? {
              ...b,
              electricityCost: newElectricity,
              waterCost: newWater,
              lastUpdated: period,
            }
          : b
      )
    );

    alert(
      `Costs for ${selectedBoarding.name} updated successfully for ${period}. The cards have been updated.`
    );
    closeModal();
  };

  // Calculate dynamic results for the modal display
  const dynamicBill = selectedBoarding
    ? calculateDynamicBill(formData, selectedBoarding.baseRent)
    : {};

  return (
    <div className="pt-4 space-y-6">
      {/* Horizontal Header (content-header equivalent) */}
      <header
        className="content-header flex justify-between items-center p-6 rounded-[25px] shadow-lg sticky top-0 z-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(5px)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div className="header-left flex flex-col">
          <h1
            className="text-[1.8rem] font-bold leading-tight"
            style={{ color: "var(--primary)" }}
          >
            Utilities Management
          </h1>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Add and manage monthly water and electricity costs for your
            boardings.
          </p>
        </div>
      </header>

      {/* Utility Overview Cards */}
      <section className="billing-overview">
        <div className="overview-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Map over the state variable 'boardings' and use the imported UtilityCard */}
          {boardings.map((boarding) => (
            <UtilityCard
              key={boarding.id}
              boarding={boarding}
              onOpenModal={openModal}
            />
          ))}
        </div>
      </section>

      {/* Utility Cost Logging Modal */}
      {selectedBoarding && (
        <div
          id="utilityModal"
          className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center z-2000 p-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(5px)",
          }}
        >
          <div
            className="modal-content w-full max-w-[500px] rounded-[25px] shadow-2xl"
            style={{ backgroundColor: "var(--card-bg)" }}
          >
            <div
              className="modal-header flex justify-between items-center p-6 border-b"
              style={{ borderColor: "var(--light)" }}
            >
              <h3
                className="text-[1.3rem] font-bold"
                style={{ color: "var(--primary)" }}
              >
                Log Utility Costs: {selectedBoarding.name}
              </h3>
              <button
                className="close-modal text-3xl cursor-pointer p-1 rounded-sm"
                style={{ color: "var(--muted)" }}
                onClick={closeModal}
              >
                &times;
              </button>
            </div>

            <div className="modal-body p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label
                    className="font-semibold mb-1 block"
                    style={{ color: "var(--text)" }}
                  >
                    Billing Period
                  </label>
                  <input
                    type="month"
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full p-4 border-2 rounded-xl text-base"
                    style={{
                      borderColor: "var(--light)",
                      backgroundColor: "var(--card-bg)",
                    }}
                  />
                </div>

                <div className="form-group">
                  <label
                    className="font-semibold mb-1 block"
                    style={{ color: "var(--text)" }}
                  >
                    Electricity Cost (LKR)
                  </label>
                  <div className="amount-input relative flex items-center">
                    <span
                      className="currency absolute left-4 font-semibold z-10"
                      style={{ color: "var(--muted)" }}
                    >
                      LKR
                    </span>
                    <input
                      type="number"
                      name="electricity"
                      value={formData.electricity}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="Enter total electricity bill"
                      className="form-input w-full p-4 pl-14 border-2 rounded-xl text-lg font-semibold"
                      style={{
                        borderColor: "var(--light)",
                        backgroundColor: "var(--card-bg)",
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="font-semibold mb-1 block"
                    style={{ color: "var(--text)" }}
                  >
                    Water Cost (LKR)
                  </label>
                  <div className="amount-input relative flex items-center">
                    <span
                      className="currency absolute left-4 font-semibold z-10"
                      style={{ color: "var(--muted)" }}
                    >
                      LKR
                    </span>
                    <input
                      type="number"
                      name="water"
                      value={formData.water}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="Enter total water bill"
                      className="form-input w-full p-4 pl-14 border-2 rounded-xl text-lg font-semibold"
                      style={{
                        borderColor: "var(--light)",
                        backgroundColor: "var(--card-bg)",
                      }}
                    />
                  </div>
                </div>

                {/* 💡 LIVE BILLING SUMMARY */}
                <div
                  className="billing-summary bg-opacity-30 p-4 rounded-xl"
                  style={{
                    backgroundColor: "var(--light)",
                    borderLeft: `4px solid ${"var(--accent)"}`,
                  }}
                >
                  <h4
                    className="font-bold text-base mb-2"
                    style={{ color: "var(--primary)" }}
                  >
                    Live Calculation Summary
                  </h4>

                  <div
                    className="detail-row flex justify-between text-sm py-1"
                    style={{ borderBottom: `1px solid ${"var(--light)"}` }}
                  >
                    <span style={{ color: "var(--muted)" }}>
                      Total Utility Cost (LKR)
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--text)" }}
                    >
                      {formatCost(dynamicBill.totalUtilityCost || 0)}
                    </span>
                  </div>

                  <div className="detail-row flex justify-between text-base pt-2">
                    <strong style={{ color: "var(--text)" }}>
                      Total Monthly Bill (Est.)
                    </strong>
                    <strong
                      className="text-lg"
                      style={{ color: "var(--success)" }}
                    >
                      {formatCost(
                        dynamicBill.totalMonthlyBill ||
                          selectedBoarding.baseRent
                      )}
                    </strong>
                  </div>
                </div>
                {/* ------------------------------------ */}

                <div
                  className="form-actions flex justify-end gap-3 pt-4 border-t"
                  style={{ borderColor: "var(--light)" }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary px-4 py-2 rounded-[25px] font-semibold"
                    style={{
                      backgroundColor: "var(--light)",
                      color: "var(--text)",
                    }}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 rounded-[25px] font-semibold"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--card-bg)",
                    }}
                  >
                    <i className="fas fa-save"></i> Save Costs
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}