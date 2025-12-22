import React from 'react';

const UserTable = ({ users, onView, onDelete }) => {
    return (
        <div className="bg-card-bg rounded-large shadow-custom overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-5 font-bold text-text-muted">User</th>
                        <th className="p-5 font-bold text-text-muted">Role</th>
                        <th className="p-5 font-bold text-text-muted">Status</th>
                        <th className="p-5 font-bold text-text-muted">Joined</th>
                        <th className="p-5 font-bold text-text-muted text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-gray-50 hover:bg-background-light/30 transition-colors">
                            <td className="p-5">
                                <div className="flex items-center gap-3">
                                    <img src={user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                                    <div>
                                        <div className="font-bold text-text-dark">{user.name}</div>
                                        <div className="text-xs text-text-muted">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-5 capitalize">{user.role}</td>
                            <td className="p-5">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    user.status === 'active' ? 'bg-success/10 text-success' : 'bg-red-alert/10 text-red-alert'
                                }`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="p-5 text-sm text-text-muted">{user.registrationDate}</td>
                            <td className="p-5 text-right space-x-2">
                                <button onClick={() => onView(user)} className="p-2 text-info hover:bg-info/10 rounded-lg">
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button onClick={() => onDelete(user.id)} className="p-2 text-red-alert hover:bg-red-alert/10 rounded-lg">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;