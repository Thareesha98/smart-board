import { useState, useCallback } from 'react';

export const useSearchFilters = (initialBoardings) => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    distance: '10',
    gender: 'any',
    amenities: [],
    roomTypes: []
  });

  const [filteredBoardings, setFilteredBoardings] = useState(initialBoardings);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const applyFilters = useCallback(() => {
    const filtered = initialBoardings.filter(boarding => {
      // Price filter
      if (boarding.price < filters.minPrice || boarding.price > filters.maxPrice) {
        return false;
      }

      // Distance filter
      if (filters.distance !== '10' && boarding.distance > parseFloat(filters.distance)) {
        return false;
      }

      // Gender filter
      if (filters.gender !== 'any' && boarding.gender !== 'any' && boarding.gender !== filters.gender) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          boarding.amenities.some(ba => ba.toLowerCase() === amenity.toLowerCase())
        );
        if (!hasAllAmenities) return false;
      }

      // Room type filter
      if (filters.roomTypes.length > 0) {
        if (!filters.roomTypes.includes(boarding.roomType)) return false;
      }

      return true;
    });

    setFilteredBoardings(filtered);
  }, [initialBoardings, filters]);

  const clearAllFilters = useCallback(() => {
    setFilters({
      minPrice: 0,
      maxPrice: 50000,
      distance: '10',
      gender: 'any',
      amenities: [],
      roomTypes: []
    });
    setFilteredBoardings(initialBoardings);
  }, [initialBoardings]);

  return {
    filters,
    filteredBoardings,
    handleFilterChange,
    applyFilters,
    clearAllFilters,
    setFilteredBoardings
  };
};