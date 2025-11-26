import "./AdminThirdPartyAdCard.css";

export default function AdminThirdPartyAdCard({
  title,
  image,
  company,
  onEdit,
  onDelete,
}) {
  return (
    <div className="sbms-third-card">

      <img
        src={image || "/placeholder-ad.jpg"}
        alt={title}
        className="sbms-third-img"
      />

      <div className="sbms-third-content">
        <h3 className="sbms-third-title">{title}</h3>
        <p className="sbms-third-company">{company}</p>

        <div className="sbms-third-actions">
          <button className="sbms-third-btn edit" onClick={onEdit}>
            Edit
          </button>
          <button className="sbms-third-btn delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
