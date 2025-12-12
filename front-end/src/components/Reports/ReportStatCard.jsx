// src/components/Reports/ReportStatCard.jsx
import Card from '../UI/Card.jsx';

const ReportStatCard = ({ title, value, icon, color }) => {
  // Assuming 'color' maps to Tailwind colors defined in your config (e.g., primary, accent, success)
  const iconBg = `bg-${color}/10 text-${color}`; 
  
  return (
    <Card className="p-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text-muted">{title}</p>
        <p className="text-2xl font-bold text-text-dark mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${iconBg}`}>
        <i className={`fas fa-${icon} text-lg`} />
      </div>
    </Card>
  );
};

export default ReportStatCard;