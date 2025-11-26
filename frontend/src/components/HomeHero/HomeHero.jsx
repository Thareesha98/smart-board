import { Link } from "react-router-dom";
import "./HomeHero.css";

export default function HomeHero() {
  return (
    <section className="sbms-hero">
      <div className="sbms-hero-overlay"></div>

      <div className="sbms-hero-content">
        <h1 className="sbms-hero-title">
          Find The Best Boarding Places Near Your University
        </h1>

        <p className="sbms-hero-sub">
          Browse verified rooms, compare prices, schedule visits, and book securely.
        </p>

        <Link to="/search">
          <button className="sbms-hero-btn">Search Boardings</button>
        </Link>
      </div>
    </section>
  );
}
