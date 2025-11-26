import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../api/api";
import "./BoardingDetails.css";

export default function BoardingDetails() {
  const { id } = useParams();
  const [boarding, setBoarding] = useState(null);

  useEffect(() => {
    Api.getBoarding(id).then(setBoarding).catch(() => {});
  }, [id]);

  if (!boarding) return <div className="card">Loading...</div>;

  return (
    <div className="boarding-details card">

      <img
        className="details-img"
        src={boarding.imageUrl}
        alt={boarding.title}
      />

      <h2>{boarding.title}</h2>
      <p className="small">{boarding.location}</p>

      <div className="price-section">
        <h3>{boarding.price} LKR</h3>
      </div>

      <p>{boarding.description}</p>
    </div>
  );
}
