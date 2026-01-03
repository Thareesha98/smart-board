// hooks/ui/useDecisionModal.js
import { useState } from "react";

export const useDecisionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionType, setActionType] = useState(null);

  const openModal = (item, action) => {
    setSelectedItem(item);
    setActionType(action);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
    setActionType(null);
  };

  return {
    isOpen,
    selectedItem,
    actionType,
    openModal,
    closeModal
  };
};