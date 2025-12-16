import React from "react";

const BoostButton = ({ isBoosted, onBoostClick }) => {
  if (isBoosted) {
    return (
      <button
        className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--card-bg)",
          pointerEvents: "none", // Prevent interaction if already boosted
        }}
      >
        <i className="fas fa-bolt mr-2"></i> Boosted
      </button>
    );
  }

  return (
    <button
      className="px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-300 shadow-md hover:scale-[1.05]"
      style={{ backgroundColor: "var(--success)", color: "var(--card-bg)" }}
      onClick={onBoostClick}
    >
      <i className="fas fa-bolt mr-2"></i> Boost Ad
    </button>
  );
};

export default BoostButton;