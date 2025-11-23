const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'Active': return { backgroundColor: 'var(--success)', color: 'white' };
        case 'Pending': return { backgroundColor: 'var(--info)', color: 'white' };
        case 'Draft': return { backgroundColor: 'var(--muted)', color: 'white' };
        case 'Inactive': return { backgroundColor: 'var(--error)', color: 'white' };
        default: return { backgroundColor: 'var(--light)', color: 'var(--text)' };
    }
};

export const StatusTab = ({ status, count, currentFilter, setFilter }) => {
    const isActive = currentFilter === status;
    const color = getStatusBadgeStyle(status).backgroundColor;

    return (
        <button 
            className={`flex items-center justify-center p-3 rounded-2xl transition-all duration-300 relative w-full ${isActive ? 'shadow-md scale-[1.05]' : 'bg-opacity-80'}`}
            style={{ backgroundColor: isActive ? color : 'var(--light)', color: isActive ? 'white' : 'var(--text)' }}
            onClick={() => setFilter(status)}
        >
            <span className="font-semibold text-lg">{status}</span>
            <span 
                className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full`}
                style={{ backgroundColor: isActive ? 'var(--primary)' : 'var(--accent)', color: 'white' }}
            >
                {count}
            </span>
        </button>
    );
};