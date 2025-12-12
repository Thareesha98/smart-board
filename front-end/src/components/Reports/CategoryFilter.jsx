// src/components/Reports/CategoryFilter.jsx
const categories = [
  { key: 'all', label: 'All Reports', icon: 'file-alt' },
  { key: 'students', label: 'Student Reported', icon: 'user-graduate' },
  { key: 'owners', label: 'Owner Reported', icon: 'user-tie' },
];

const CategoryFilter = ({ currentCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <h4 className="text-sm font-semibold text-text-muted mr-3 hidden sm:block">Filter By:</h4>
      {categories.map(cat => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={`px-3 py-1.5 text-sm font-medium rounded-card border transition-all duration-200 flex items-center space-x-2
            ${currentCategory === cat.key 
              ? 'bg-primary text-white border-primary shadow-md' 
              : 'bg-white text-text-muted border-background-light hover:border-text-dark hover:text-text-dark'
            }`}
        >
          <i className={`fas fa-${cat.icon}`} />
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;