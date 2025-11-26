// src/pages/owner/MyAdsPage.jsx
import { Link } from "react-router-dom";
import OwnerAdCard from "../../components/OwnerAdCard/OwnerAdCard";
import "./MyAdsPage.css";

export default function MyAdsPage() {
  const ads = [
    {
      id: "A1",
      title: "Cozy Room in Colombo 07",
      location: "Colombo 07",
      price: 15000,
      status: "approved",
    },
    {
      id: "A2",
      title: "Shared Room for Girls",
      location: "Kandy",
      price: 10000,
      status: "pending",
    },
    {
      id: "A3",
      title: "Studio Room for Couples",
      location: "Galle",
      price: 22000,
      status: "rejected",
    },
  ];

  return (
    <div className="owner-myads-page">

      <div className="owner-myads-header">
        <h2>My Ads</h2>

        <Link to="/owner/create-ad" className="owner-myads-btn">
          + Create New Ad
        </Link>
      </div>

      <div className="owner-myads-list">
        {ads.map((ad) => (
          <OwnerAdCard
            key={ad.id}
            title={ad.title}
            location={ad.location}
            price={ad.price}
            status={ad.status}
            onEdit={() => alert(`Edit Ad ${ad.id}`)}
            onDelete={() => alert(`Delete Ad ${ad.id}`)}
            onBoost={() => alert(`Boost Ad ${ad.id}`)}
          />
        ))}
      </div>

    </div>
  );
}
