import { useState } from "react";
import "./AdminThirdPartyAdUpload.css";

export default function AdminThirdPartyAdUpload({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    link: "",
    description: "",
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.image) {
      alert("Please upload an image banner");
      return;
    }
    onSubmit && onSubmit(form);
  };

  return (
    <section className="sbms-adupload-card">
      <h3 className="sbms-adupload-title">Upload New Advertisement</h3>

      <form className="sbms-adupload-form" onSubmit={handleSubmit}>
        
        {/* Title */}
        <input
          type="text"
          className="sbms-adupload-input"
          placeholder="Ad Title (e.g., 20% Off Drinks)"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        

        {/* Company */}
        <input
          type="text"
          className="sbms-adupload-input"
          placeholder="Company Name (e.g., RedBull)"
          required
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        {/* Link */}
        <input
          type="text"
          className="sbms-adupload-input"
          placeholder="Redirect URL (optional)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />

        {/* Description */}
        <textarea
          className="sbms-adupload-textarea"
          placeholder="Short description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Image Upload */}
        <label className="sbms-adupload-label">Banner Image</label>
        <input
          type="file"
          accept="image/*"
          className="sbms-adupload-file"
          required
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] || null })
          }
        />

        <button type="submit" className="sbms-adupload-btn">
          Upload Ad
        </button>

      </form>
    </section>
  );
}
