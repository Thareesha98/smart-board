import "./BoardingDescription.css";

export default function BoardingDescription({ description, features = [] }) {
  return (
    <section className="sbms-desc-card">

      <h3 className="sbms-desc-title">Description</h3>
      <p className="sbms-desc-text">{description}</p>

      {features.length > 0 && (
        <>
          <h3 className="sbms-desc-title" style={{ marginTop: "20px" }}>
            Features
          </h3>

          <ul className="sbms-features-list">
            {features.map((f, index) => (
              <li key={index} className="sbms-feature-item">
                {f}
              </li>
            ))}
          </ul>
        </>
      )}

    </section>
  );
}
