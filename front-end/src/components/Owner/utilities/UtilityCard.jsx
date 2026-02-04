import { useState } from "react";
import api from "../../../api/api";

const UtilityCard = ({ boarding, utility, onSaved }) => {
  const [month, setMonth] = useState(
    utility?.month || new Date().toISOString().slice(0, 7)
  );
  const [electricity, setElectricity] = useState(
    utility?.electricityAmount || ""
  );
  const [water, setWater] = useState(
    utility?.waterAmount || ""
  );
  const [loading, setLoading] = useState(false);

  const studentCount = boarding.currentStudents || 0;
  const baseRent = boarding.pricePerMonth || 0;

  const totalUtility =
    Number(electricity || 0) + Number(water || 0);

  const perStudentUtility =
    studentCount > 0 ? totalUtility / studentCount : 0;

  const handleSave = async () => {
    if (!month || electricity === "" || water === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/owner/utilities", {
        boardingId: boarding.id,
        month,
        electricityAmount: Number(electricity),
        waterAmount: Number(water),
      });

      onSaved();
    } catch (err) {
      console.error(err);
      alert("Failed to save utility data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card-bg border border-light rounded-xl p-4 space-y-4 shadow-sm">

      {/* HEADER */}
      <div>
        <h3 className="text-sm font-bold text-text">
          {boarding.title /* adjust if DTO uses another field */}
        </h3>

        <h5 className="text-sm font-bold text-text">
          {boarding.address /* adjust if DTO uses another field */}
        </h5>
        <p className="text-xs text-muted">
          Base Rent: LKR {baseRent.toLocaleString()}
        </p>
        <p className="text-xs text-muted">
          Students: {studentCount}
        </p>
      </div>

      {/* INPUTS */}
      <div className="space-y-3">

        <div>
          <label className="text-xs font-semibold">Billing Month</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Electricity (LKR)</label>
          <input
            type="number"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Water (LKR)</label>
          <input
            type="number"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-light/40 rounded-lg p-3 text-xs">
        <div className="flex justify-between">
          <span>Total Utility</span>
          <span>LKR {totalUtility.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-accent">
          <span>Per Student</span>
          <span>LKR {perStudentUtility.toFixed(2)}</span>
        </div>
      </div>

      {/* ACTION */}
      <button
        onClick={handleSave}
        disabled={loading}
        className={`w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition ${
          loading
            ? "bg-gray-300"
            : "bg-accent text-white hover:bg-primary"
        }`}
      >
        {utility ? "Update Utilities" : "Save Utilities"}
      </button>
    </div>
  );
};

export default UtilityCard;
