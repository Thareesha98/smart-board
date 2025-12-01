import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

// Layout
import StudentLayout from '../../components/student/common/StudentLayout';

// Components
import BoardingCard from '../../components/student/search/BoardingCard';
import FiltersSidebar from '../../components/student/search/FiltersSidebar';
import SearchHero from '../../components/student/search/SearchHero';
import ResultsHeader from '../../components/student/search/ResultsHeader';
import EmptyResults from '../../components/student/search/EmptyResults';

// Data & Hooks
import { sampleBoardings } from '../../data/searchBoardingsData';
import { useSearchFilters } from '../../hooks/useSearchFilters';
import { useSortBoardings } from '../../hooks/useSortBoardings';

const SearchBoardingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isSearching, setIsSearching] = useState(false);

  // Custom hooks
  const {
    filters,
    filteredBoardings,
    handleFilterChange,
    applyFilters,
    clearAllFilters,
    setFilteredBoardings
  } = useSearchFilters(sampleBoardings);

  const { sortBy, handleSort } = useSortBoardings();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a location to search');
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      applyFilters();
      setIsSearching(false);
    }, 1000);
  };

  const handleBookAppointment = (id) => {
    console.log(`Booking appointment for boarding ${id}`);
    alert('Redirecting to appointment booking...');
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMoveInDate(today);
  }, []);

  return (
    <StudentLayout
      title="Search Boardings"
      subtitle="Find your perfect boarding place near campus"
    >
      {/* Search Hero Section */}
      <div className="mb-6">
        <SearchHero 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          moveInDate={moveInDate}
          setMoveInDate={setMoveInDate}
          onSearch={handleSearch}
          isSearching={isSearching}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Filters Sidebar - Desktop & Mobile Button */}
        <div className="lg:w-80 flex-shrink-0">
          <FiltersSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={clearAllFilters}
            onApply={applyFilters}
          />
        </div>

        {/* Results Section */}
        <div className="flex-1 min-w-0">
          {/* Results Header with Sort & View Controls */}
          <div className="mb-4 sm:mb-6">
            <ResultsHeader 
              resultsCount={filteredBoardings.length}
              sortBy={sortBy}
              onSort={(value) => handleSort(value, filteredBoardings, setFilteredBoardings)}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>

          {/* Results Grid/List */}
          <AnimatePresence mode="wait">
            {filteredBoardings.length === 0 ? (
              <EmptyResults onClearFilters={clearAllFilters} />
            ) : (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid gap-4 sm:gap-6 mb-6 sm:mb-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredBoardings.map((boarding, index) => (
                  <motion.div
                    key={boarding.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BoardingCard 
                      boarding={boarding}
                      onBook={handleBookAppointment}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load More Button */}
          {filteredBoardings.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 sm:py-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-accent text-accent px-6 sm:px-8 py-2.5 sm:py-3 rounded-large font-semibold text-sm sm:text-base hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto shadow-md hover:shadow-xl"
              >
                <FaPlus className="text-sm sm:text-base" />
                Load More Results
              </motion.button>
              <p className="text-text-muted text-xs sm:text-sm mt-3 sm:mt-4">
                Showing {filteredBoardings.length} of 87 boardings
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default SearchBoardingsPage;