// src/components/UserManagement/Pagination.jsx
import Button from '../UI/Button.jsx';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  
  return (
    <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
      <div className="text-sm text-text-muted mb-4 md:mb-0">
        Page {currentPage} of {totalPages}
      </div>
      
      <div className="flex space-x-2">
        <Button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={isFirstPage} 
          variant="outline"
        >
          <i className="fas fa-chevron-left mr-2" />
          Previous
        </Button>
        
        {/* Simplified page number display */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-btn text-sm font-medium transition-colors 
                ${page === currentPage ? 'bg-primary text-white' : 'text-text-dark hover:bg-background-light'}`
              }
            >
              {page}
            </button>
          ))}
          {totalPages > 5 && <span className="text-text-muted">...</span>}
        </div>

        <Button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={isLastPage} 
          variant="outline"
        >
          Next
          <i className="fas fa-chevron-right ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;