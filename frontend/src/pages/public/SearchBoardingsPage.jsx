// src/pages/public/SearchBoardingsPage.jsx
import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import BoardingGrid from "../../components/BoardingGrid/BoardingGrid";
import BoardingCard from "../../components/BoardingCard/BoardingCard";
import "./SearchBoardingsPage.css";

export default function SearchBoardingsPage() {
  const [rooms, setRooms] = useState([
    {
      id: "1",
      title: "Single Room Near Campus",
      location: "Colombo 05",
      price: 18000,
      gender: "male",
      thumbnail: "/room-sample.jpg",
    },
    {
      id: "2",
      title: "Shared Room for Female Students",
      location: "Colombo 07",
      price: 12000,
      gender: "female",
      thumbnail: "/room-sample-2.jpg",
    },
    {
      id: "3",
      title: "Studio Apartment",
      location: "Maharagama",
      price: 24000,
      gender: "unisex",
      thumbnail: "/room-sample-3.jpg",
    },
  ]);

  const handleSearch = (filters) => {
    console.log("Searching boardings:", filters);

    const location = filters?.location?.toLowerCase() || "";

    if (!location) return;

    setRooms((prev) =>
      prev.filter((r) =>
        r.location.toLowerCase().includes(location)
      )
    );
  };

  return (
    <div className="searchboardings-page">

      <div className="searchboardings-top">
        <h2>Find Your Ideal Boarding</h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="searchboardings-results">
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
                thumbnail={r.thumbnail}
              />
            ),
          }))}
        />
      </div>
    </div>
  );
}
