import React from 'react';

const UserFilters = ({ searchTerm, setSearchTerm, roleFilter, setRoleFilter, statusFilter, setStatusFilter, onReset }) => {
    return (
        <div className="bg-card-bg p-6 rounded-large shadow-custom mb-8">
            <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[250px]">
                    <label className="block text-sm font-bold text-text-muted mb-2">Search Users</label>
                    <div className="relative">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input 
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-12 pr-4 py-3 bg-background-light rounded-[15px] border-none focus:ring-2 focus:ring-accent outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-40">
                    <label className="block text-sm font-bold text-text-muted mb-2">Role</label>
                    <select 
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-background-light rounded-[15px] border-none outline-none"
                    >
                        <option value="all">All Roles</option>
                        <option value="student">Student</option>
                        <option value="owner">Owner</option>
                    </select>
                </div>
                <button 
                    onClick={onReset}
                    className="px-6 py-3 text-accent font-bold hover:bg-accent/10 rounded-[15px] transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default UserFilters;