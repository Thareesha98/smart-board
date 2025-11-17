export const ActivityItem = ({ data }) => (
  <div
    className="activity-item flex items-center gap-4 p-5 border-b transition duration-300 hover:bg-opacity-50"
    style={{ borderColor: 'var(--light)' }}
  >
    <div
      className="activity-icon w-[45px] h-[45px] p-3 rounded-xl text-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: 'var(--light)', color: 'var(--accent)' }}
    >
      <i className={data.icon}></i>
    </div>
    <div className="activity-content flex-1">
      <p className="mb-0.5" style={{ color: 'var(--text)' }}>
        {data.text}{" "}
        <strong style={{ color: 'var(--primary)' }}>{data.bold}</strong>
      </p>
      <span className="activity-time text-sm" style={{ color: 'var(--muted)' }}>
        {data.time}
      </span>
    </div>
  </div>
);