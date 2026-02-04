import React, { useEffect, useState } from "react";
import api from "../../api/api";
import UtilityCard from "../../components/Owner/utilities/UtilityCard";
import HeaderBar from "../../components/Owner/common/HeaderBar";

export default function UtilityPage() {

  const [boardings, setBoardings] = useState([]);
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [utilities, setUtilities] = useState([]);

  const [form, setForm] = useState({
    month: "",
    electricity: "",
    water: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [bRes, uRes] = await Promise.all([
      api.get("boardings/owner"),
      api.get("/owner/utilities"),
    ]);

    setBoardings(bRes.data);
    setUtilities(uRes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/owner/utilities", {
      boardingId: selectedBoarding.id,
      month: form.month,
      electricityAmount: form.electricity,
      waterAmount: form.water,
    });

    setSelectedBoarding(null);
    loadData();
  };

  return (
    <div className="p-6">
      <HeaderBar title="Utility Management" />

      <div className="grid grid-cols-3 gap-6">
        {boardings.map(b => (
          <UtilityCard
  key={b.id}
  boarding={b}
  utility={utilities.find(u => u.boardingId === b.id)}
  onSaved={loadData}
/>

        ))}
      </div>

      {selectedBoarding && (
        <form onSubmit={handleSubmit} className="modal">
          <h3>{selectedBoarding.title}</h3>

          <input type="month"
            value={form.month}
            onChange={e => setForm({ ...form, month: e.target.value })}
          />

          <input type="number"
            placeholder="Electricity"
            value={form.electricity}
            onChange={e => setForm({ ...form, electricity: e.target.value })}
          />

          <input type="number"
            placeholder="Water"
            value={form.water}
            onChange={e => setForm({ ...form, water: e.target.value })}
          />

          <button type="submit">Save Utilities</button>
        </form>
      )}
    </div>
  );
}
