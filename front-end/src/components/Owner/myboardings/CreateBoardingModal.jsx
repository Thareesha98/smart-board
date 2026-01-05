import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CreateBoardingModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    rent: "",
    availableRooms: "",
    maxOccupants: "",
    genderType: "MIXED",
    boardingType: "ANNEX",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    // Reset Form
    setFormData({
      name: "",
      description: "",
      address: "",
      rent: "",
      availableRooms: "",
      maxOccupants: "",
      genderType: "MIXED",
      boardingType: "ANNEX",
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -- Animation Variants --
  const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
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
          onClick={onClose}
        >
          <motion.div
            className="bg-card-bg w-full max-w-2xl rounded-boarding shadow-2xl overflow-hidden border border-light max-h-[90vh] overflow-y-auto custom-scrollbar"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-light flex justify-between items-center bg-light/30 sticky top-0 backdrop-blur-md z-10">
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {/* Row 1: Title */}
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                  Property Title
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="e.g. Blue Lagoon Villa"
                  className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Row 2: Description (New) */}
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                  Description
                </label>
                <textarea
                  required
                  name="description"
                  rows="3"
                  placeholder="Describe amenities, location details..."
                  className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all resize-none"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Row 3: Address & Rent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                    Address
                  </label>
                  <input
                    required
                    name="address"
                    type="text"
                    placeholder="Street, City"
                    className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                    Monthly Rent
                  </label>
                  <input
                    required
                    name="rent"
                    type="number"
                    placeholder="LKR 15000"
                    className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                    value={formData.rent}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 4: Stats (Rooms, Max Occupants) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                    Total Rooms
                  </label>
                  <input
                    required
                    name="availableRooms"
                    type="number"
                    placeholder="1"
                    className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                    value={formData.availableRooms}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                    Max Occupants
                  </label>
                  <input
                    required
                    name="maxOccupants"
                    type="number"
                    placeholder="4"
                    className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                    value={formData.maxOccupants}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 5: Dropdowns (Gender, Type) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                    Gender Allowed
                  </label>
                  <div className="relative">
                    <select
                      name="genderType"
                      value={formData.genderType}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text font-bold focus:border-accent outline-none appearance-none cursor-pointer"
                    >
                      <option value="MIXED">Mixed</option>
                      <option value="MALE">Male Only</option>
                      <option value="FEMALE">Female Only</option>
                    </select>
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs pointer-events-none"></i>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                    Boarding Type
                  </label>
                  <div className="relative">
                    <select
                      name="boardingType"
                      value={formData.boardingType}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text font-bold focus:border-accent outline-none appearance-none cursor-pointer"
                    >
                      <option value="ANNEX">Annex</option>
                      <option value="HOSTEL">Hostel</option>
                      <option value="ROOM">Room</option>
                      <option value="HOUSE">Full House</option>
                    </select>
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-muted text-xs pointer-events-none"></i>
                  </div>
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
