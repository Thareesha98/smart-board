import "./ReviewList.css";

export default function ReviewList({ reviews = [] }) {
  return (
    <section className="sbms-review-card">
      <h3 className="sbms-review-title">Reviews</h3>

      {reviews.length === 0 && (
        <p className="sbms-review-empty">No reviews yet.</p>
      )}

      {reviews.map((r, index) => (
        <div key={index} className="sbms-review-item">
          
          <div className="sbms-review-header">
            <span className="sbms-review-name">{r.name}</span>

            <span className="sbms-review-stars">
              {"★".repeat(r.rating)}{" "}
              <span className="sbms-review-stars-muted">
                {"☆".repeat(5 - r.rating)}
              </span>
            </span>
          </div>

          <p className="sbms-review-text">{r.comment}</p>
        </div>
      ))}
    </section>
  );
}
