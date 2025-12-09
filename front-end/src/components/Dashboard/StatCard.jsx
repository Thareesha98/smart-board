// src/components/Dashboard/StatCard.jsx
import Card from '../UI/Card.jsx';

const StatCard = ({ title, value, change, icon, color }) => {
  const iconBg = `bg-${color}/10 text-${color}`; 
  const textColor = `text-${color}`;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="text-3xl font-bold text-text-dark mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${iconBg}`}>
          <i className={`fas fa-${icon} text-lg`} />
        </div>
      </div>
      <p className="text-xs mt-3">
        <span className={`font-semibold ${textColor}`}>{change}</span>
        {' '}
        <span className="text-text-muted">since last period</span>
      </p>
    </Card>
  );
};

export default StatCard;