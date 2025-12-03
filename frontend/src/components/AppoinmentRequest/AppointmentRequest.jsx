import { useState } from "react";
import "./AppointmentRequest.css";

export default function AppointmentRequest({ onRequest }) {
  const [form, setForm] = useState({
    date: "",
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRequest) onRequest(form);
  };

  return (
    <section className="sbms-appt-card">
      <h3 className="sbms-appt-title">Request a Visit</h3>

      <form className="sbms-appt-form" onSubmit={handleSubmit}>
        <label className="sbms-appt-label">Preferred Date</label>
        <input
          type="date"
          className="sbms-appt-input"
          value={form.date}
          required
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <label className="sbms-appt-label">Preferred Time</label>
        <input
          type="time"
          className="sbms-appt-input"
          value={form.time}
          required
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <button type="submit" className="sbms-appt-btn">
          Send Request
        </button>
      </form>
    </section>
  );
}
