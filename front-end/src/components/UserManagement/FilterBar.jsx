// src/components/UserManagement/FilterBar.jsx
import { useState } from 'react';
import Button from '../UI/Button.jsx';

const FilterBar = ({ filters, setFilters, selectedCount, onBulkAction }) => {
  return (
    <div className="bg-white p-4 rounded-card shadow-sm border border-background-light mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search name or email..."
            className="px-4 py-2 border border-background-light rounded-btn focus:ring-2 focus:ring-primary/20 outline-none w-64"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
          />
          <select 
            className="px-4 py-2 border border-background-light rounded-btn text-text-muted"
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value, page: 1 }))}
          >
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="owner">Owner</option>
          </select>
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-sm font-medium text-text-muted">{selectedCount} selected</span>
            <Button variant="error" onClick={() => onBulkAction('delete')}>Delete Selected</Button>
          </div>
        )}
      </div>
    </div>
  );
};