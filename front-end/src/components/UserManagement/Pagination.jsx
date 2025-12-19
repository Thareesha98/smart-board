import React from 'react';
import Button from '../UI/Button.jsx';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
      {/* "Page 1 of 20" text from your HTML */}
      <div className="text-sm font-medium text-text-muted">
        Page <span className="text-text-dark">{currentPage}</span> of {totalPages}
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2"
        >
          <i className="fas fa-chevron-left text-xs" /> Previous
        </Button>

        <div className="hidden sm:flex items-center gap-1">
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            // Only show 5 pages around the current page to avoid overflow
            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-10 h-10 rounded-btn text-sm font-bold transition-all ${
                    currentPage === pageNum 
                    ? 'bg-primary text-white shadow-md' 
                    : 'hover:bg-background-light/50 text-text-muted'
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
            if (pageNum === currentPage - 2 || pageNum === currentPage + 2) return <span key={pageNum}>...</span>;
            return null;
          })}
        </div>

        <Button 
          variant="outline" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2"
        >
          Next <i className="fas fa-chevron-right text-xs" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;