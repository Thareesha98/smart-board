// src/components/AdApprovals/AdCard.jsx
import Card from '../UI/Card.jsx';
import Button from '../UI/Button.jsx';

const AdCard = ({ ad, onApprove, onReject, onViewDetails, currentTab }) => {
  const formatPrice = (price) => {
    return `Rs. ${new Intl.NumberFormat('en-IN').format(price)}`;
  };

  const typeClasses = {
    hostel: 'bg-info/10 text-info',
    apartment: 'bg-primary/10 text-primary',
    boarding: 'bg-accent/10 text-accent',
    house: 'bg-success/10 text-success',
  };

  return (
    <Card className="flex flex-col h-full p-4 hover:shadow-lg transition-shadow duration-300">
      <img
        src={ad.images[0]}
        alt={ad.title}
        className="w-full h-32 object-cover rounded-card mb-3"
      />
      
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-text-dark truncate mb-1" title={ad.title}>
          {ad.title}
        </h4>
        <div className="flex items-center space-x-1 text-sm text-text-muted mb-2">
            <i className="fas fa-map-marker-alt text-xs" />
            <span>{ad.location}</span>
        </div>
        
        <div className='flex items-center space-x-2 mb-3'>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeClasses[ad.type] || 'bg-gray-200 text-gray-700'} capitalize`}>
              {ad.type}
            </span>
            <span className="text-primary font-bold text-base">{formatPrice(ad.price)}</span>
        </div>
        
      </div>
      
      <div className="flex flex-col space-y-2 mt-3">
        {currentTab === 'pending' && (
            <>
                <Button variant="success" onClick={() => onApprove(ad.id)} className="w-full">
                    <i className="fas fa-check-circle mr-2" /> Approve
                </Button>
                <Button variant="error" onClick={() => onReject(ad)} className="w-full">
                    <i className="fas fa-times-circle mr-2" /> Reject
                </Button>
            </>
        )}
        {(currentTab === 'approved' || currentTab === 'rejected') && (
            <Button variant="outline" onClick={() => onViewDetails(ad)} className="w-full">
                <i className="fas fa-eye mr-2" /> View Details
            </Button>
        )}
      </div>
    </Card>
  );
};

export default AdCard;