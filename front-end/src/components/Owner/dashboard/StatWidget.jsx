const StatWidget = ({ icon, title, mainValue, subValue, trend }) => (
  <div className="p-5 transition-shadow border shadow-sm bg-card-bg rounded-xl border-light hover:shadow-md">
    <div className="flex items-start justify-between">
      <div className="p-3 text-xl rounded-lg bg-light/50 text-accent">
        <i className={icon}></i>
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-xs font-bold tracking-wider uppercase text-muted">{title}</h3>
      <strong className="block mt-1 text-2xl font-black text-text">{mainValue}</strong>
      <p className="mt-1 text-xs text-muted">{subValue}</p>
    </div>
  </div>
);

export default StatWidget;