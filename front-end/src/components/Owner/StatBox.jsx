export const StatBox = ({ icon, label, value, color }) => (
    <div className="flex flex-col items-center">
        <i className={`${icon} text-xl mb-1`} style={{ color }}></i>
        <strong className="text-xl font-bold" style={{ color: 'var(--text)' }}>{value}</strong>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>{label}</span>
    </div>
);