import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    location: "",
    priceRange: "",
    gender: "",
  });

  const handleSearch = () => {
    if (onSearch) onSearch(filters);
  };

  return (
    <div className="sbms-searchbar">
      <input
        type="text"
        placeholder="Enter location..."
        className="sbms-input"
        value={filters.location}
        onChange={(e) =>
          setFilters({ ...filters, location: e.target.value })
        }
      />

      <select
        className="sbms-input"
        value={filters.priceRange}
        onChange={(e) =>
          setFilters({ ...filters, priceRange: e.target.value })
        }
      >
        <option value="">Any Price</option>
        <option value="0-5000">0 - 5,000 LKR</option>
        <option value="5000-10000">5,000 - 10,000 LKR</option>
        <option value="10000-20000">10,000 - 20,000 LKR</option>
        <option value="20000+">20,000+ LKR</option>
      </select>

      <select
        className="sbms-input"
        value={filters.gender}
        onChange={(e) =>
          setFilters({ ...filters, gender: e.target.value })
        }
      >
        <option value="">Any Gender</option>
        <option value="male">Male only</option>
        <option value="female">Female only</option>
        <option value="unisex">Unisex</option>
      </select>

      <button className="sbms-search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
