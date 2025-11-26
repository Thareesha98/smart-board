// src/pages/public/BoardingDetailsPage.jsx
import { useParams } from "react-router-dom";
import "./BoardingDetailsPage.css";

export default function BoardingDetailsPage() {
  const { id } = useParams();

  // TEMPORARY sample data
  const room = {
    id,
    title: "Cozy Single Room Near Campus",
    location: "Colombo 07",
    price: 15000,
    gender: "unisex",
    description:
      "A well-maintained single room located close to university campus. Includes bed, table, fan, and shared bathroom. Grocery shops and bus routes nearby.",
    image: "/room-sample.jpg",
  };

  return (
    <div className="details-container">

      {/* Image */}
      <img
        src={room.image}
        alt={room.title}
        className="details-image"
      />

      {/* Title Row */}
      <h2 className="details-title">{room.title}</h2>
      <p className="details-location">{room.location}</p>

      {/* Price + Gender */}
      <div className="details-info-row">

        <span className="details-price">{room.price} LKR / month</span>

        <span
          className={`details-gender ${room.gender}`}
        >
          {room.gender === "unisex"
            ? "Unisex"
            : room.gender === "male"
            ? "Male Only"
            : "Female Only"}
        </span>

      </div>

      {/* Description */}
      <p className="details-description">{room.description}</p>

      {/* Action */}
      <button
        className="details-btn"
        onClick={() => alert("Request appointment flow coming soon")}
      >
        Book Appointment
      </button>

    </div>
  );
}
