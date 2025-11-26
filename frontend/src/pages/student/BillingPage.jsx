// src/pages/student/BillingPage.jsx
import "./BillingPage.css";

export default function BillingPage() {
  const bill = {
    month: "February 2025",
    room: "Cozy Room in Colombo 05",
    baseRent: 15000,
    electricity: 2200,
    water: 800,
  };

  const total = bill.baseRent + bill.electricity + bill.water;

  return (
    <div className="billing-page">

      <h2 className="billing-title">Billing</h2>

      {/* Bill Card */}
      <div className="billing-card">

        <h3 className="billing-month">{bill.month}</h3>
        <p className="billing-room">{bill.room}</p>

        <div className="billing-breakdown">

          <div className="billing-row">
            <span>Base Rent</span>
            <span>LKR {bill.baseRent}</span>
          </div>

          <div className="billing-row">
            <span>Electricity</span>
            <span>LKR {bill.electricity}</span>
          </div>

          <div className="billing-row">
            <span>Water</span>
            <span>LKR {bill.water}</span>
          </div>

          <div className="billing-total">
            <strong>Total</strong>
            <strong>LKR {total}</strong>
          </div>

        </div>

        <button
          className="billing-btn"
          onClick={() => alert("Stripe/PayHere integration coming soon")}
        >
          Pay Now
        </button>

      </div>

    </div>
  );
}
