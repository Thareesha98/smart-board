import { useState, useEffect, useMemo } from "react";
import { getOwnerBoardings, updateUtilityBill } from "../services/service"; // Import your services
import { INITIAL_BOARDINGS_DATA } from "../data/mockData"; // Keep as fallback

export const useUtilityLogic = () => {
  // --- State ---
  const [boardings, setBoardings] = useState(INITIAL_BOARDINGS_DATA);
  const [selectedBoarding, setSelectedBoarding] = useState(null);
  const [loading, setLoading] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Form State
  const [formData, setFormData] = useState({
    electricity: "",
    water: "",
    period: "",
  });

  // --- Effects ---
  
  // 1. Fetch Boardings on Mount (Uncomment when ready to replace mock data completely)
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getOwnerBoardings();
        // Ensure data has the fields we need (defaulting to N/A or 0 if missing)
        const formattedData = data.map(b => ({
            ...b,
            electricityCost: b.latestUtility?.electricityCost || 0,
            waterCost: b.latestUtility?.waterCost || 0,
            lastUpdated: b.latestUtility?.period || "N/A"
        }));
        setBoardings(formattedData);
      } catch (err) {
        console.error("Failed to load boardings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  */

  // --- Calculations ---

  const totalUtility = (Number(formData.electricity) || 0) + (Number(formData.water) || 0);
  
  // Safe calculation for total monthly bill
  const totalMonthly = (selectedBoarding?.baseRent || 0) + totalUtility;

  // Filter Logic
  const filteredBoardings = useMemo(() => {
    return boardings.filter((b) => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
      const isUpdated = b.lastUpdated !== "N/A";
      
      let matchesStatus = true;
      if (filterStatus === "pending") matchesStatus = !isUpdated;
      if (filterStatus === "updated") matchesStatus = isUpdated;

      return matchesSearch && matchesStatus;
    });
  }, [boardings, searchTerm, filterStatus]);

  // --- Handlers ---

  const handleOpenModal = (boarding) => {
    setSelectedBoarding(boarding);
    setFormData({
      electricity: boarding.electricityCost || "",
      water: boarding.waterCost || "",
      // Smart Date: Use existing date if updated, else current month
      period: boarding.lastUpdated !== "N/A" 
        ? boarding.lastUpdated 
        : new Date().toISOString().substring(0, 7),
    });
  };

  const handleCloseModal = () => {
    setSelectedBoarding(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Prepare Backend Payload
    const payload = {
      boardingId: selectedBoarding.id,
      period: formData.period,
      electricityCost: Number(formData.electricity),
      waterCost: Number(formData.water),
    };

    try {
      // 2. Call API
      const savedRecord = await updateUtilityBill(payload);

      // 3. Update Local State with response from backend
      setBoardings((prev) =>
        prev.map((b) =>
          b.id === selectedBoarding.id
            ? {
                ...b,
                electricityCost: savedRecord.electricityCost,
                waterCost: savedRecord.waterCost,
                lastUpdated: savedRecord.period,
              }
            : b
        )
      );
      
      alert("Bill saved successfully!");
      handleCloseModal();
      
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to save bill. Please try again.");
    }
  };

  return {
    boardings,
    filteredBoardings,
    selectedBoarding,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    totalUtility,
    totalMonthly,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    loading
  };
};