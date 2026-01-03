import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ManageModal = ({ isOpen, onClose, property, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({ ...property });

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        // If rent is "LKR 15,000", convert to "15000" for the input field
        rent: property.rent ? property.rent.replace(/[^0-9]/g, "") : "",
      });
    }
  }, [property]);

  // -- Animation Variants --
  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 0.5 },
    },
    exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && property && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="bg-card-bg w-full max-w-lg rounded-boarding shadow-2xl overflow-hidden border border-light"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-light flex justify-between items-center bg-light/30">
              <div>
                <h3 className="text-xl font-black text-primary tracking-tight uppercase">
                  Quick Manage
                </h3>
                <p className="text-[10px] text-muted font-bold uppercase tracking-wider">
                  {property.name}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted hover:text-text transition-colors p-2"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdate({ ...formData, id: property.id });
              }}
              className="p-8 space-y-6"
            >
              {/* Rent Input */}
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                  Monthly Rent (LKR)
                </label>
                <input
                  type="number"
                  value={formData.rent}
                  onChange={(e) =>
                    setFormData({ ...formData, rent: e.target.value })
                  }
                  className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                />
              </div>

              {/* Rooms Input */}
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                  Available Rooms
                </label>
                <input
                  type="number"
                  value={formData.availableRooms || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, availableRooms: e.target.value })
                  }
                  className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                />
              </div>

              {/* Status Select */}
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={formData.status || "active"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text font-bold focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs pointer-events-none"></i>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-accent text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent/20 hover:shadow-xl transition-all"
                >
                  Save Changes
                </motion.button>

                <motion.button
                  whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    if (window.confirm("Delete property permanently?"))
                      onDelete(property.id);
                  }}
                  className="w-full py-3 text-error text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-transparent hover:border-error/20 flex items-center justify-center gap-2"
                >
                  <i className="fas fa-trash-alt"></i> Delete Property
                  Permanently
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManageModal;
