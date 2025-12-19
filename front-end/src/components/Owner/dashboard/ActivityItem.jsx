const ActivityItem = ({ data }) => (
  <div className="flex items-center gap-4 p-5 border-b border-(--light) transition hover:bg-gray-50/50">
    <div className="w-11 h-11 p-3 rounded-xl text-lg flex items-center justify-center shrink-0 bg-(--light) text-(--accent)">
      <i className={data.icon}></i>
    </div>
    <div className="flex-1">
      <p className="mb-0.5 text-(--text)">
        {data.text} <strong className="text-(--primary)">{data.bold}</strong>
      </p>
      <span className="text-sm text-(--muted)">{data.time}</span>
    </div>
  </div>
);

export default ActivityItem;