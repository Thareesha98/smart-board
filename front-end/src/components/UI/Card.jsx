// src/components/UI/Card.jsx
const Card = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-card-bg rounded-large shadow-custom ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-background-light">
          <h3 className="text-xl font-semibold text-text-dark">
            {title}
          </h3>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;