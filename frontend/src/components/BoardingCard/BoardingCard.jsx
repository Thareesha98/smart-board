import { Link } from "react-router-dom";
import "./BoardingCard.css";

export default function BoardingCard({
  id,
  title,
  location,
  price,
  gender,
  thumbnail,
}) {
  return (
    <Link to={`/boarding/${id}`} className="sbms-card-link">
      <div className="sbms-card">

        <img
          src={thumbnail || "/room-sample.jpg"}
          alt={title}
          className="sbms-card-img"
        />

        <div className="sbms-card-body">

          <h3 className="sbms-card-title">{title}</h3>

          <p className="sbms-card-location">{location}</p>

          <div className="sbms-card-meta">
            <span className="sbms-card-price">{price} LKR</span>
            <span className="sbms-card-gender">{gender}</span>
          </div>

        </div>

      </div>
    </Link>
  );
}
