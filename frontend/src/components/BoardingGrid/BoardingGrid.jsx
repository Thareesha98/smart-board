import "./BoardingGrid.css";

export default function BoardingGrid({ items = [] }) {
  return (
    <div className="sbms-grid">
      {items.map((b) => (
        <div key={b.id} className="sbms-grid-item">
          {b.component}
        </div>
      ))}
    </div>
  );
}
