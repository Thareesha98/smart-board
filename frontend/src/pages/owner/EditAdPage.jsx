// src/pages/owner/EditAdPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditAdPage.css";

export default function EditAdPage() {
  const { id } = useParams();

  // TEMPORARY sample load (replace with GET /owner/ads/{id})
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    gender: "unisex",
    description: "",
    image: null,        // new uploaded file
    existingImage: "",  // existing image URL
  });

  useEffect(() => {
    // Simulate existing ad data
    const sample = {
      title: "Cozy Room in Colombo 07",
      location: "Colombo 07",
      price: 15000,
      gender: "unisex",
      description:
        "A comfortable and spacious room ideal for university students with shared bathroom & kitchen.",
      existingImage: "/room-sample.jpg",
    };

    setForm((prev) => ({ ...prev, ...sample }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updating ad:", form);

    alert(`Ad ${id} updated successfully! (Backend integration coming soon)`);
  };

  return (
    <div className="editad-page">
      <h2 className="editad-title">Edit Ad</h2>

      <form className="editad-form" onSubmit={handleSubmit}>

        {/* LEFT SIDE */}
        <div className="editad-left">

          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <label>Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />

          <label>Price (LKR)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <label>Preferred Gender</label>
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="unisex">Unisex</option>
            <option value="male">Male Only</option>
            <option value="female">Female Only</option>
          </select>

        </div>

        {/* RIGHT SIDE */}
        <div className="editad-right">

          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <label>Current Image</label>
          <img
            src={form.existingImage}
            alt="Ad"
            className="editad-current-image"
          />

          <label>Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files?.[0] || null })
            }
          />

        </div>

      </form>

      <button className="editad-submit" onClick={handleSubmit}>
        Update Ad
      </button>
    </div>
  );
}
