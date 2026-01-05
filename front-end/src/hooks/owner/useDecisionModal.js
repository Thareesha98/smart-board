import { useState, useCallback } from "react";

const useDecisionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionType, setActionType] = useState(null);

  /**
   * Opens the modal with the specific item and action.
   * @param {Object} item - The data object (e.g., appointment)
   * @param {String} action - The action string (e.g., 'confirmed', 'rejected')
   */
  const openModal = useCallback((item, action) => {
    setSelectedItem(item);
    setActionType(action);
    setIsOpen(true);
  }, []);

  /**
   * Closes the modal and resets the state.
   */
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
    setActionType(null);
  }, []);

  return {
    isOpen,
    selectedItem,
    actionType,
    openModal,
    closeModal,
  };
};

export default useDecisionModal;
