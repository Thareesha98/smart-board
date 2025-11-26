import "./BillingCard.css";

export default function BillingCard({
  month,
  rent,
  utilities,
  total,
  status,
  onPay,
  onDownload,
}) {
  return (
    <div className="bill-card">

      {/* Left section */}
      <div className="bill-info">
        <h3 className="bill-month">{month}</h3>
        <p className="bill-line">Rent: LKR {rent}</p>
        <p className="bill-line">Utilities: LKR {utilities}</p>
        <p className="bill-total">Total: <strong>LKR {total}</strong></p>
      </div>

      {/* Status */}
      <span className={`bill-status ${status}`}>{status}</span>

      {/* Actions */}
      <div className="bill-actions">
        {status === "unpaid" && (
          <button className="bill-btn pay" onClick={onPay}>
            Pay Now
          </button>
        )}

        <button className="bill-btn download" onClick={onDownload}>
          Invoice
        </button>
      </div>

    </div>
  );
}
