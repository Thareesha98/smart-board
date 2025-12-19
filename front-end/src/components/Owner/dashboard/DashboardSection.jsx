export const DashboardSection = ({ title, badge, children, className = "" }) => (
  <section className={`space-y-4 ${className}`}>
    <h2 className="text-2xl font-bold flex items-center gap-2 text-(--primary)">
      {title}
      {badge && (
        <span className="text-xs px-2 py-1 rounded-xl font-semibold bg-(--accent) text-(--card-bg)">
          {badge}
        </span>
      )}
    </h2>
    <div className="bg-white rounded-[25px] shadow-lg overflow-hidden border border-(--light)">
      {children}
    </div>
  </section>
);