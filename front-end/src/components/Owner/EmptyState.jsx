export const EmptyState = ({ filter, handleCreateNewAd }) => (
  <div
    className="text-center p-12 rounded-3xl shadow-lg"
    style={{ backgroundColor: "var(--card-bg)" }}
  >
    <i
      className="fas fa-clipboard-list text-6xl mb-4"
      style={{ color: "var(--muted)" }}
    ></i>
    <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
      No {filter} Listings Found
    </h3>
    {filter === "All" ? (
      <p className="text-base mb-6" style={{ color: "var(--muted)" }}>
        It looks like you haven't created any boarding advertisements yet. Start
        now!
      </p>
    ) : (
      <p className="text-base mb-6" style={{ color: "var(--muted)" }}>
        You currently have no listings in the **{filter}** status.
      </p>
    )}
    <button
      className="px-8 py-3 font-bold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg"
      style={{ backgroundColor: "var(--primary)", color: "var(--card-bg)" }}
      onClick={handleCreateNewAd}
    >
      <i className="fas fa-plus mr-2"></i> Create Your First Ad
    </button>
  </div>
);
