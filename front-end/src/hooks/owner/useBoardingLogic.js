import { useState } from "react";

export const useBoardingLogic = (initialData) => {
  // --- State ---
  const [boardings, setBoardings] = useState(initialData);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'tenants' | 'manage' | null
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // --- Actions / Handlers ---

  // Open specific modals and set the context data
  const openTenantsModal = (property) => {
    setSelectedProperty(property);
    setActiveModal("tenants");
  };

  const openManageModal = (property) => {
    setSelectedProperty(property);
    setActiveModal("manage");
  };

  const closeModal = () => {
    setActiveModal(null);
    // Optional: Clear selected property after animation time if needed, 
    // but usually keeping it prevents content flashing during close animation.
  };

  // CRUD Operations
  const addProperty = (newProperty) => {
    setBoardings((prev) => [newProperty, ...prev]);
    setIsCreateModalOpen(false);
  };

  const updateProperty = (updatedData) => {
    setBoardings((prev) =>
      prev.map((p) => (p.id === updatedData.id ? updatedData : p))
    );
    closeModal();
  };

  const deleteProperty = (id) => {
    setBoardings((prev) => prev.filter((p) => p.id !== id));
    closeModal();
  };

  return {
    // State
    boardings,
    viewMode,
    selectedProperty,
    activeModal,
    isCreateModalOpen,
    
    // Setters (for direct UI toggles)
    setViewMode,
    setIsCreateModalOpen,
    
    // Logic Handlers
    openTenantsModal,
    openManageModal,
    closeModal,
    addProperty,
    updateProperty,
    deleteProperty,
  };
};

export default useBoardingLogic;