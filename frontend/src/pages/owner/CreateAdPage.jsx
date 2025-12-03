// src/pages/owner/CreateAdPage.jsx
import { useState } from "react";
import "./CreateAdPage.css";

export default function CreateAdPage() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    gender: "unisex",
    description: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Ad submitting:", form);

    alert("Ad created successfully! (Backend integration coming soon)");
  };

  return (
    <div className="createad-page">
      <h2 className="createad-title">Create New Boarding Ad</h2>

      <form className="createad-form" onSubmit={handleSubmit}>

        {/* LEFT SIDE */}
        <div className="createad-left">

          <label>Title</label>
          <input
            type="text"
            placeholder="e.g., Cozy Room near University"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <label>Location</label>
          <input
            type="text"
            placeholder="e.g., Colombo 07"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />

          <label>Price (LKR)</label>
          <input
            type="number"
            placeholder="15000"
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
        <div className="createad-right">

          <label>Description</label>
          <textarea
            placeholder="Describe the room, facilities, neighborhood, etc."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <label>Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files?.[0] || null })
            }
            required
          />

        </div>

      </form>

      <button className="createad-submit" onClick={handleSubmit}>
        Publish Ad
      </button>
    </div>
  );
}
