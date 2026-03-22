import React from 'react';
import { motion } from 'framer-motion';
import BoardingCard from '../student/search/BoardingCard';

const BoardingSearchPanel = ({
  itemVariants,
  formData,
  setFormData,
  fetchBoardings,
  filters,
  setFilters,
  setPage,
  pageSize,
  loadingBoardings,
  boardings,
  handleOpenBoardingDetails,
  page,
  totalPages,
}) => {
  return (
    <motion.div variants={itemVariants} className="flex-1 w-full bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 md:mb-6">Find Your Boarding</h3>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
        <input
          type="text"
          placeholder="Where do you want to stay?"
          value={formData.searchQuery || ''}
          onChange={(e) => setFormData((prev) => ({ ...prev, searchQuery: e.target.value }))}
          className="flex-1 px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-white placeholder:text-white/50"
        />
        <button
          onClick={() => fetchBoardings()}
          className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-accent hover:bg-accent/80 text-white rounded-2xl font-bold transition-all shadow-lg transform hover:-translate-y-1"
        >
          Search Now
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_auto_auto_1fr] gap-4 sm:gap-5 lg:gap-6 items-end border-t border-white/10 pt-6 md:pt-8 text-white">
        <div className="space-y-2 w-full">
          <label className="text-xs font-bold uppercase tracking-wider text-white/60">Price Range (LKR)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: Number(e.target.value) }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="space-y-2 w-full">
          <label className="text-xs font-bold uppercase tracking-wider text-white/60">Gender</label>
          <select
            value={filters.gender}
            onChange={(e) => setFilters((prev) => ({ ...prev, gender: e.target.value }))}
            className="w-full sm:w-32 px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm appearance-none cursor-pointer [&>option]:text-black"
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="space-y-2 w-full">
          <label className="text-xs font-bold uppercase tracking-wider text-white/60">Room Type</label>
          <select
            value={filters.roomType}
            onChange={(e) => setFilters((prev) => ({ ...prev, roomType: e.target.value }))}
            className="w-full sm:w-32 px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm appearance-none cursor-pointer [&>option]:text-black"
          >
            <option value="any">Any</option>
            <option value="single">Single</option>
            <option value="shared">Shared</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>

        <button
          onClick={() => {
            setPage(0);
            fetchBoardings(0, pageSize);
          }}
          className="w-full sm:w-auto sm:ml-auto px-4 h-10 text-sm bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all flex items-center justify-center self-end"
        >
          Apply
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-8 md:mt-12">
        {loadingBoardings ? (
          <div className="col-span-full text-center py-20 text-white font-medium animate-pulse">Loading listings...</div>
        ) : (
          boardings.map((b) => (
            <div key={b.id} className="transform hover:scale-[1.02] transition-transform">
              <BoardingCard
                boarding={{
                  ...b,
                  name: b.name || b.title || 'Boarding',
                  price: b.price || b.monthlyRent || b.pricePerMonth || 0,
                  image: b.image || (b.images && b.images[0]) || (b.imageUrls && b.imageUrls[0]) || '',
                  location: b.location || b.address || '',
                  amenities: b.amenities || b.features || [],
                  badge: b.badge || (b.isBoosted ? 'Featured' : null),
                }}
                onViewDetails={handleOpenBoardingDetails}
                compact
              />
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
        <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              if (page > 0) {
                setPage((p) => p - 1);
                fetchBoardings(page - 1, pageSize);
              }
            }}
            disabled={page <= 0}
            className="flex-1 sm:flex-none px-5 py-2 bg-white/10 text-white rounded-xl disabled:opacity-30 border border-white/10"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (page + 1 < totalPages) {
                setPage((p) => p + 1);
                fetchBoardings(page + 1, pageSize);
              }
            }}
            disabled={page + 1 >= (totalPages || 1)}
            className="flex-1 sm:flex-none px-5 py-2 bg-white/10 text-white rounded-xl disabled:opacity-30 border border-white/10"
          >
            Next
          </button>
        </div>
        <span className="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-widest text-center sm:text-right">
          Page {page + 1} / {totalPages || 1}
        </span>
      </div>
    </motion.div>
  );
};

export default BoardingSearchPanel;
