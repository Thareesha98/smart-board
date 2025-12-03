import "./OwnerAdCard.css";

export default function OwnerAdCard({
  title,
  location,
  price,
  status,
  onEdit,
  onDelete,
  onBoost,
}) {
  return (
    <div className="ownerad-card">

      <div className="ownerad-info">
        <h3 className="ownerad-title">{title}</h3>
        <p className="ownerad-location">{location}</p>
        <p className="ownerad-price">LKR {price}</p>
      </div>

      <span className={`ownerad-status ${status}`}>{status}</span>

      <div className="ownerad-actions">
        <button className="ownerad-btn edit" onClick={onEdit}>
          Edit
        </button>
        <button className="ownerad-btn delete" onClick={onDelete}>
          Delete
        </button>
        {onBoost && (
          <button className="ownerad-btn boost" onClick={onBoost}>
            Boost
          </button>
        )}
      </div>

    </div>
  );
}
