// src/pages/admin/ManageAdsPage.jsx
import "./ManageAdsPage.css";

export default function ManageAdsPage() {
  const ads = [
    {
      id: "ad1",
      title: "Cozy Room in Colombo 07",
      owner: "Lakshan Perera",
      status: "pending",
      price: 15000,
    },
    {
      id: "ad2",
      title: "Shared Room for Girls",
      owner: "Anjali Silva",
      status: "approved",
      price: 10000,
    },
    {
      id: "ad3",
      title: "Studio Apartment for Couples",
      owner: "Kevin Perera",
      status: "rejected",
      price: 22000,
    },
  ];

  return (
    <div className="manage-ads-page">

      <h2 className="manage-ads-title">Manage Boarding Ads</h2>

      <div className="manage-ads-list">
        {ads.map((ad) => (
          <div key={ad.id} className="manage-ads-card">

            {/* Title */}
            <div>
              <h3 className="manage-ads-ad-title">{ad.title}</h3>
              <p className="manage-ads-owner">Owner: {ad.owner}</p>
              <p className="manage-ads-price">LKR {ad.price}</p>
            </div>

            {/* Status */}
            <span className={`manage-ads-status ${ad.status}`}>
              {ad.status}
            </span>

            {/* Actions */}
            <div className="manage-ads-actions">
              {ad.status === "pending" && (
                <>
                  <button
                    className="manage-ads-btn approve"
                    onClick={() => alert(`Approved ${ad.id}`)}
                  >
                    Approve
                  </button>

                  <button
                    className="manage-ads-btn reject"
                    onClick={() => alert(`Rejected ${ad.id}`)}
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                className="manage-ads-btn remove"
                onClick={() => alert(`Removed ${ad.id}`)}
              >
                Remove
              </button>

              <button
                className="manage-ads-btn view"
                onClick={() => alert("Open Ad Details")}
              >
                View
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
