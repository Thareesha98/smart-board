import "./AdminAdApprovalCard.css";

export default function AdminAdApprovalCard({
  title,
  location,
  description,
  price,
  gender,
  onApprove,
  onReject,
}) {
  return (
    <div className="sbms-approve-card">

      {/* Title */}
      <h3 className="sbms-approve-title">{title}</h3>

      {/* Location */}
      <p className="sbms-approve-location">{location}</p>

      {/* Details */}
      <div className="sbms-approve-details">
        <p className="sbms-approve-label">
          <strong>Price:</strong> {price} LKR
        </p>
        <p className="sbms-approve-label">
          <strong>Gender:</strong> {gender}
        </p>
      </div>

      {/* Description */}
      <p className="sbms-approve-desc">{description}</p>

      {/* ACTION BUTTONS */}
      <div className="sbms-approve-actions">
        <button className="sbms-approve-btn approve" onClick={onApprove}>
          Approve
        </button>
        <button className="sbms-approve-btn reject" onClick={onReject}>
          Reject
        </button>
      </div>

    </div>
  );
}
