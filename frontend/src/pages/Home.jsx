import React from "react";
import { Link } from "react-router-dom";
import BoardingCard from "../components/BoardingCard/BoardingCard";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      <div className="hero card">
        <div className="hero-left">
          <h1>Find your next boarding</h1>
          <p className="small">
            Browse and filter thousands of rooms across Sri Lanka.
          </p>

          <Link to="/boardings">
            <button className="btn">Browse Boardings</button>
          </Link>
        </div>

        <div className="hero-right card">
          <h3>Popular</h3>
          <BoardingCard
            id={1}
            title="Modern Room"
            location="Colombo"
            price="18000"
            img="/assets/sample-room.jpg"
          />
        </div>
      </div>
    </div>
  );
}
