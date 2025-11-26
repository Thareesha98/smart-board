import "./MyBoardingsList.css";

export default function MyBoardingsList({ items = [] }) {
  return (
    <section className="sbms-myboardings-card">
      <h3 className="sbms-myboardings-title">My Boardings</h3>

      {items.length === 0 && (
        <p className="sbms-myboardings-empty">You are not registered in any boardings yet.</p>
      )}

      {items.map((b, idx) => (
        <div key={idx} className="sbms-myboardings-item">

          <div className="sbms-myboardings-details">
            <p className="sbms-myboardings-name">{b.title}</p>
            <p className="sbms-myboardings-location">{b.location}</p>
          </div>

          <span className="sbms-myboardings-price">
            {b.price} LKR
          </span>

        </div>
      ))}
    </section>
  );
}
