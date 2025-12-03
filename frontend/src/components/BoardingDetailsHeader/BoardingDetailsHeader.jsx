import "./BoardingDetailsHeader.css";

export default function BoardingDetailsHeader({
  title,
  location,
  price,
  gender,
  image,
}) {
  return (
    <section className="sbms-details-header">

      <div className="sbms-details-image-wrap">
        <img
          src={image || "/room-sample.jpg"}
          alt={title}
          className="sbms-details-image"
        />
      </div>

      <div className="sbms-details-info">
        <h2 className="sbms-details-title">{title}</h2>

        <p className="sbms-details-location">{location}</p>

        <div className="sbms-details-meta">
          <span className="sbms-details-price">{price} LKR</span>
          <span className="sbms-details-gender">{gender}</span>
        </div>
      </div>

    </section>
  );
}
