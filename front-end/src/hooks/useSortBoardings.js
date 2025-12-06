import { useState, useCallback } from 'react';

export const useSortBoardings = () => {
  const [sortBy, setSortBy] = useState('relevance');

  const sortBoardings = useCallback((boardings, sortType) => {
    const sorted = [...boardings];
    
    switch(sortType) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'distance':
        return sorted.sort((a, b) => a.distance - b.distance);
      default:
        return sorted;
    }
  }, []);

  const handleSort = useCallback((value, boardings, setFilteredBoardings) => {
    setSortBy(value);
    const sorted = sortBoardings(boardings, value);
    setFilteredBoardings(sorted);
  }, [sortBoardings]);

  return { sortBy, handleSort };
};