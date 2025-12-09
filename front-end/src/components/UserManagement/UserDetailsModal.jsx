// src/components/UserManagement/UserDetailsModal.jsx
import Button from '../UI/Button.jsx';

const UserDetailsModal = ({ user, onClose, onDelete }) => {
  return (
    <div>
        <div className="flex items-center space-x-4 mb-6">
            <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover border-2 border-primary" />
            <div>
                <h3 className="text-2xl font-bold text-text-dark">{user.name}</h3>
                <p className="text-text-muted">{user.email}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
            <div className='p-3 bg-background-light/50 rounded-card'>
                <p className="font-semibold text-text-muted">Role</p>
                <p className="text-text-dark capitalize">{user.role}</p>
            </div>
            <div className='p-3 bg-background-light/50 rounded-card'>
                <p className="font-semibold text-text-muted">Status</p>
                <p className={`text-text-dark font-medium capitalize text-${user.status === 'active' ? 'success' : 'error'}`}>{user.status}</p>
            </div>
            <div className='p-3 bg-background-light/50 rounded-card'>
                <p className="font-semibold text-text-muted">Phone</p>
                <p className="text-text-dark">{user.phone}</p>
            </div>
            <div className='p-3 bg-background-light/50 rounded-card'>
                <p className="font-semibold text-text-muted">Registered</p>
                <p className="text-text-dark">{new Date(user.registrationDate).toLocaleDateString()}</p>
            </div>
            {/* Add more details here */}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-background-light">
            <Button onClick={onClose} variant="outline">Close</Button>
            <Button onClick={onDelete} variant="error" className="flex items-center space-x-2">
                <i className="fas fa-trash"></i>
                <span>Delete User</span>
            </Button>
        </div>
    </div>
  );
};

export default UserDetailsModal;