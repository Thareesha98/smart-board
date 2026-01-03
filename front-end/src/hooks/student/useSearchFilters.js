import { useState, useEffect, useCallback } from "react";
import StudentService from "../../api/student/StudentService";

export const useSearchFilters = () => {
  const [filteredBoardings, setFilteredBoardings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    searchQuery: "",
    minPrice: 0,
    maxPrice: 50000,
    distance: "10",
    gender: "any",
    amenities: [],
    roomTypes: [],
  });

  const fetchBoardings = async () => {
    setLoading(true);
    try {
      const result = await StudentService.searchBoardings(filters);

      // Map Backend DTO to Frontend UI Structure
      const mapped = result.content.map((b) => ({
        id: b.id,
        name: b.title,
        image: b.imageUrls?.[0] || "https://via.placeholder.com/300",
        price: b.pricePerMonth,
        location: b.address,

        // ✅ FIX: Read real values from Backend DTO
        rating: b.rating || 0,
        reviewCount: b.reviewCount || 0,

        amenities: b.amenities || [], // If your DTO sends amenities, use them too!
        badge: b.status === "APPROVED" ? "Verified" : "New",
      }));

      setFilteredBoardings(mapped);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and when filters change (Debouncing suggested for production)
  useEffect(() => {
    fetchBoardings();
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyFilters = () => {
    fetchBoardings();
  };

  const clearAllFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      minPrice: 0,
      maxPrice: 50000,
      distance: "10",
      gender: "any",
      amenities: [],
      roomTypes: [],
    });
    // fetchBoardings(); // Uncomment to auto-refresh on clear
  }, []);

  return {
    filters,
    filteredBoardings,
    loading,
    handleFilterChange,
    applyFilters,
    clearAllFilters,
    setFilteredBoardings,
  };
};
