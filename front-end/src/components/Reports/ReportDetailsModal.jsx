// src/components/Reports/ReportDetailsModal.jsx
import Button from '../UI/Button.jsx';

const DetailItem = ({ label, value, color = 'text-text-dark' }) => (
    <div className='p-3 bg-background-light/50 rounded-card'>
        <p className="font-semibold text-text-muted text-sm">{label}</p>
        <p className={`text-base font-medium ${color}`}>{value}</p>
    </div>
);

const UserCard = ({ user, title }) => (
    <div className="border border-background-light p-4 rounded-card">
        <h4 className="font-bold text-text-dark mb-2">{title}</h4>
        <div className="space-y-1 text-sm">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Role:</span> <span className="capitalize text-primary">{user.role}</span></p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            {user.listings !== undefined && <p><span className="font-semibold">Listings:</span> {user.listings}</p>}
            {user.joined && <p><span className="font-semibold">Joined:</span> {user.joined}</p>}
            <p><span className="font-semibold">Status:</span> <span className={`font-bold ${user.status === 'active' ? 'text-success' : 'text-error'} capitalize`}>{user.status}</span></p>
        </div>
    </div>
);


const ReportDetailsModal = ({ report, onClose, onDismiss, onSuspend }) => {
    
    // Check if reported user is available for suspension
    const canSuspend = report.reported && report.reported.status === 'active';

    // The user to suspend is the one being reported
    const reportedUser = report.reported;
    
  return (
    <div>
        <h3 className="text-2xl font-bold text-text-dark mb-2">{report.title}</h3>
        <p className={`text-sm font-medium mb-4 text-${report.priority === 'High' ? 'error' : report.priority === 'Medium' ? 'accent' : 'info'}`}>
            <i className="fas fa-exclamation-triangle mr-2" /> Priority: {report.priority}
        </p>

        {/* Core Details */}
        <div className="grid grid-cols-3 gap-3 text-sm mb-6">
            <DetailItem label="Report Type" value={report.type} color="text-info" />
            <DetailItem label="Date Filed" value={report.date} />
            <DetailItem label="Status" value={report.status.charAt(0).toUpperCase() + report.status.slice(1)} color="text-primary" />
        </div>
        
        {/* Description */}
        <div className='p-4 bg-background-light rounded-card mb-6'>
            <p className="font-semibold text-text-muted mb-2">Detailed Description</p>
            <p className="text-text-dark text-justify text-sm">{report.description}</p>
            {report.notes && (
                <div className="mt-3 pt-3 border-t border-background-light">
                    <p className="font-semibold text-text-muted">Admin Notes</p>
                    <p className="text-text-dark text-xs italic">{report.notes}</p>
                </div>
            )}
        </div>
        
        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <UserCard user={report.reporter} title="Reporter" />
            <UserCard user={reportedUser} title="Reported User" />
        </div>
        
        {/* Resolution/Dismissal */}
        {report.status === 'resolved' && (
            <div className='p-4 bg-success/10 rounded-card mb-6'>
                <p className="font-semibold text-success mb-2">Resolution: {report.resolvedDate}</p>
                <p className="text-success text-sm">{report.resolution || report.dismissalReason}</p>
            </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-background-light">
            <Button onClick={onClose} variant="outline">Close</Button>
            {report.status !== 'resolved' && (
                <>
                    <Button variant="error" onClick={() => onDismiss(report)}>Dismiss</Button>
                    {canSuspend && (
                        <Button variant="suspend" className="bg-[#8B5CF6] hover:bg-[#7c3aed] text-white" onClick={() => onSuspend(reportedUser, report)}>
                             <i className="fas fa-user-slash mr-2" /> Suspend User
                        </Button>
                    )}
                </>
            )}
        </div>
    </div>
  );
};

export default ReportDetailsModal;