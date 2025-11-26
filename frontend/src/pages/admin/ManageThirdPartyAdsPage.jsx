// src/pages/admin/ManageThirdPartyAdsPage.jsx
import { useState } from "react";
import "./ManageThirdPartyAdsPage.css";

export default function ManageThirdPartyAdsPage() {
  const [ads, setAds] = useState([
    {
      id: "tp1",
      company: "Redbull",
      image: "/thirdparty-redbull.jpg",
      status: "active",
    },
    {
      id: "tp2",
      company: "Coca Cola",
      image: "/thirdparty-coke.jpg",
      status: "pending",
    },
    {
      id: "tp3",
      company: "Dialog Internet",
      image: "/thirdparty-dialog.jpg",
      status: "expired",
    },
  ]);

  const [file, setFile] = useState(null);
  const [company, setCompany] = useState("");

  const handleUpload = () => {
    if (!file || !company) {
      alert("Please fill all fields");
      return;
    }
    alert(`Uploaded new Ad for ${company}`);
  };

  return (
    <div className="tpads-page">
      <h2 className="tpads-title">Manage Third-Party Ads</h2>

      {/* Upload Section */}
      <div className="tpads-upload-card">
        <h3 className="tpads-upload-title">Upload New Ad</h3>

        <label>Company Name</label>
        <input
          type="text"
          placeholder="e.g., Redbull"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <label>Banner Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button className="tpads-upload-btn" onClick={handleUpload}>
          Upload Ad
        </button>
      </div>

      {/* Ads List */}
      <div className="tpads-list">
        {ads.map((ad) => (
          <div key={ad.id} className="tpads-card">

            <img src={ad.image} className="tpads-image" alt="ad-banner" />

            <div className="tpads-info">
              <h3 className="tpads-company">{ad.company}</h3>
              <span className={`tpads-status ${ad.status}`}>
                {ad.status}
              </span>
            </div>

            <div className="tpads-actions">
              <button
                className="tpads-btn edit"
                onClick={() => alert(`Edit ${ad.company}`)}
              >
                Edit
              </button>

              <button
                className="tpads-btn delete"
                onClick={() => alert(`Deleted ${ad.company}`)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
