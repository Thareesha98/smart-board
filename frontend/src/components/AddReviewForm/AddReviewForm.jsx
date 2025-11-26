import { useState } from "react";
import "./AddReviewForm.css";

export default function AddReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    if (comment.trim().length < 5) {
      alert("Please write a longer review.");
      return;
    }

    if (onSubmit) onSubmit({ rating, comment });

    // Reset form
    setRating(0);
    setComment("");
  };

  return (
    <section className="sbms-addreview-card">
      <h3 className="sbms-addreview-title">Add a Review</h3>

      <form className="sbms-addreview-form" onSubmit={handleSubmit}>
        {/* Rating Stars */}
        <div className="sbms-stars-row">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`sbms-star ${rating >= num ? "active" : ""}`}
              onClick={() => setRating(num)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment box */}
        <textarea
          className="sbms-addreview-textarea"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button type="submit" className="sbms-addreview-btn">
          Submit Review
        </button>
      </form>
    </section>
  );
}
