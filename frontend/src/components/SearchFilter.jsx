import React, { useState } from "react";
import "./SearchFilter.css";

export default function SearchFilter({ onApply }) {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    gender: "",
  });

  const apply = () => {
    const params = new URLSearchParams(filters).toString();
    onApply(params);
  };

  return (
    <div className="search-filter">
      <input
        placeholder="Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />

      <input
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
      />

      <input
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
      />

      <select
        value={filters.gender}
        onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
      >
        <option value="">Any Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="unisex">Unisex</option>
      </select>

      <button className="btn" onClick={apply}>
        Apply
      </button>
    </div>
  );
}
