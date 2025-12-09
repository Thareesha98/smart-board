// src/components/UserManagement/FilterBar.jsx
import { useState } from 'react';
import Button from '../UI/Button.jsx';

const FilterBar = ({ filters, setFilters, selectedCount, onBulkDeactivate }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search);

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handleReset = () => {
    setFilters({ search: '', role: 'all', status: 'all' });
    setSearchTerm('');
  };

  return (
    <div className="flex flex-wrap items-center justify-between mb-6 p-4 border border-background-light rounded-card">
      
      {/* Search Input */}
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-4 py-2 border border-background-light rounded-card focus:ring-primary focus:border-primary transition"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap space-x-3 text-sm">
        <select 
          value={filters.role}
          onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value, page: 1 }))}
          className="p-2 border border-background-light rounded-btn text-text-dark"
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="owner">Owner</option>
        </select>
        
        <select 
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
          className="p-2 border border-background-light rounded-btn text-text-dark"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="deactivated">Deactivated</option>
        </select>
        
        <Button onClick={handleReset} variant="outline" className="text-sm">Reset</Button>
      </div>

      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <div className="mt-4 md:mt-0 md:ml-6 flex items-center space-x-3">
            <span className="text-text-muted text-sm">{selectedCount} selected:</span>
            <Button onClick={onBulkDeactivate} variant="error" className="flex items-center space-x-2">
                <i className="fas fa-user-slash" />
                <span>Deactivate Bulk</span>
            </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;