// src/components/UI/Card.jsx
const Card = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-card-bg rounded-large shadow-custom p-6 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-text-dark mb-4 border-b border-background-light pb-3">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;