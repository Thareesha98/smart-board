import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CreateBoardingModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rent: "",
    availableRooms: "",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...formData,
      id: `B00${Date.now()}`,
      rating: 0,
      totalTenants: 0,
      tenantsList: [],
    });
    setFormData({
      name: "",
      address: "",
      rent: "",
      availableRooms: "",
      status: "active",
      // Keep image or reset it if needed
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    });
  };

  // -- Animation Variants --
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", bounce: 0.3, duration: 0.5 },
    },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close when clicking backdrop
        >
          <motion.div
            className="bg-card-bg w-full max-w-lg rounded-boarding shadow-2xl overflow-hidden border border-light"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-light flex justify-between items-center bg-light/30">
              <h3 className="text-xl font-black text-primary tracking-tight uppercase">
                Post New Boarding
              </h3>
              <button
                onClick={onClose}
                className="text-muted hover:text-text transition-colors p-2"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                  Property Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Blue Lagoon Villa"
                  className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-muted/40"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                  Address
                </label>
                <input
                  required
                  type="text"
                  placeholder="Street, City"
                  className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-muted/40"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                    Monthly Rent
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="LKR 15,000"
                    className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-muted/40"
                    value={formData.rent}
                    onChange={(e) =>
                      setFormData({ ...formData, rent: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                    Total Rooms
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="0"
                    className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-muted/40"
                    value={formData.availableRooms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableRooms: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 border-2 border-light text-muted rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-light/20 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 py-4 bg-accent text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent/20 hover:shadow-xl transition-all"
                >
                  Publish Ad
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateBoardingModal;
