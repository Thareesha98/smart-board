// src/components/AdApprovals/AdDetailsModal.jsx
import Button from '../UI/Button.jsx';

const AdDetailsModal = ({ ad, onApprove, onReject, onDelete, onClose }) => {
  const formatPrice = (price) => `Rs. ${new Intl.NumberFormat('en-IN').format(price)}`;

  return (
    <div>
        <h3 className="text-2xl font-bold text-text-dark mb-2">{ad.title}</h3>
        <p className="text-text-muted mb-4">{ad.location} - Posted by: {ad.owner.name}</p>

        {/* Image Gallery */}
        <div className="grid grid-cols-3 gap-2 mb-6">
            {ad.images.map((img, index) => (
                <img key={index} src={img} alt={`${ad.title} image ${index + 1}`} className="w-full h-24 object-cover rounded-card" />
            ))}
            {ad.imageCount > ad.images.length && (
                <div className="w-full h-24 rounded-card bg-background-light flex items-center justify-center text-text-muted text-sm">
                    +{ad.imageCount - ad.images.length} more images
                </div>
            )}
        </div>

        <div className="ad-details-grid grid grid-cols-2 gap-4 text-sm mb-6">
            <div className='p-3 bg-background-light/50 rounded-card'>
                <p className="font-semibold text-text-muted">Price</p>
                <p className="text-text-dark font-bold">{formatPrice(ad.price)}</p>
            </div>
            <div className='p-3 bg-background-light/50 rounded-card'>
                <p className="font-semibold text-text-muted">Type</p>
                <p className="text-text-dark capitalize">{ad.type}</p>
            </div>
            <div className='p-3 bg-background-light/50 rounded-card col-span-2'>
                <p className="font-semibold text-text-muted">Description</p>
                <p className="text-text-dark text-justify">{ad.description}</p>
            </div>
            {ad.rejectionReason && (
                <div className='p-3 bg-error/20 rounded-card col-span-2'>
                    <p className="font-semibold text-error">Rejection Reason</p>
                    <p className="text-error">{ad.rejectionReason}</p>
                </div>
            )}
        </div>

        <div className="flex justify-between pt-4 border-t border-background-light">
            <Button onClick={() => { if (confirm('Are you sure you want to permanently delete this ad?')) { onDelete(ad.id); onClose(); } }} variant="error">
                <i className="fas fa-trash-alt mr-2" /> Delete Permanently
            </Button>
            
            <div className="space-x-3">
                <Button onClick={onClose} variant="outline">Close</Button>
                {ad.status === 'pending' && (
                    <>
                        <Button variant="error" onClick={() => onReject(ad)}>Reject</Button>
                        <Button variant="success" onClick={() => onApprove(ad.id)}>Approve</Button>
                    </>
                )}
            </div>
        </div>
    </div>
  );
};

export default AdDetailsModal;