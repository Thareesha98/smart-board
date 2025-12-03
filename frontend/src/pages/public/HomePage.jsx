// src/pages/public/HomePage.jsx
import { useState } from "react";
import HomeHero from "../../components/HomeHero/HomeHero";
import SearchBar from "../../components/SearchBar/SearchBar";
import BoardingGrid from "../../components/BoardingGrid/BoardingGrid";
import BoardingCard from "../../components/BoardingCard/BoardingCard";
import "./HomePage.css";

/**
 * Home page — lightweight, loads instantly with sample data.
 * Replace sampleRooms with API data later (Api.getBoardings).
 */
export default function HomePage() {
  const [rooms, setRooms] = useState([
    {
      id: "r1",
      title: "Cozy Single Room near Campus",
      location: "Colombo 07",
      price: 15000,
      gender: "unisex",
      image: "/room-sample.jpg",
    },
    {
      id: "r2",
      title: "Quiet Room with Shared Kitchen",
      location: "Kandy",
      price: 10000,
      gender: "female",
      image: "/room-sample-2.jpg",
    },
    {
      id: "r3",
      title: "Spacious Studio for Couples",
      location: "Galle",
      price: 22000,
      gender: "unisex",
      image: "/room-sample-3.jpg",
    },
  ]);

  const handleSearch = (filters) => {
    // placeholder: integrate Api.getBoardings(filters) later
    console.log("Search filters:", filters);
    // simple client-side filter example:
    const q = (filters.location || "").toLowerCase();
    setRooms((prev) =>
      prev.filter((r) => r.location.toLowerCase().includes(q))
    );
  };

  return (
    <div className="homepage-root">
      <HomeHero />

      <div className="homepage-search container">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="homepage-feature container">
        <h2 className="homepage-section-title">Featured Boardings</h2>

        <BoardingGrid
          items={rooms.map((r) => ({
            id: r.id,
            component: (
              <BoardingCard
                id={r.id}
                title={r.title}
                location={r.location}
                price={r.price}
                gender={r.gender}
                thumbnail={r.image}
              />
            ),
          }))}
        />
      </div>
    </div>
  );
}
