import React, { useEffect, useState } from "react";
import { Api } from "../api/api";
import BoardingCard from "../components/BoardingCard/BoardingCard";
import SearchFilter from "../components/SearchFilter";
import "./BoardingsList.css";

export default function BoardingsList() {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const data = await Api.getBoardings();
      setList(data);
    } catch (err) {
      alert("Failed to load boardings");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="boardings-page">

      <div className="card">
        <h3>Find Boardings</h3>
        <SearchFilter
          onApply={(query) =>
            Api.getBoardings(query).then(setList).catch(() => {})
          }
        />
      </div>

      <div className="grid">
        {list.map((b) => (
          <BoardingCard key={b.id} {...b} />
        ))}
      </div>
    </div>
  );
}
