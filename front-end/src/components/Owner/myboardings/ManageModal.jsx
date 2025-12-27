import React, { useState, useEffect } from "react";

const ManageModal = ({ isOpen, onClose, property, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({ ...property });

  useEffect(() => {
    if (property) setFormData({ ...property });
  }, [property]);

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/40 backdrop-blur-sm">
      <div className="bg-card-bg w-full max-w-lg rounded-boarding shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 border border-light">
        {/* Modal Header */}
        <div className="p-6 border-b border-light flex justify-between items-center bg-light/30">
          <h3 className="text-xl font-black text-primary tracking-tight uppercase">
            Quick Manage
          </h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors p-2"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate(formData);
          }}
          className="p-8 space-y-6"
        >
          {/* Rent Input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-black text-muted uppercase tracking-[0.2em]">
              Monthly Rent
            </label>
            <input
              type="text"
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
              value={formData.availableRooms}
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
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full p-3.5 rounded-xl border border-light bg-light/10 text-text font-bold focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col gap-4">
            <button
              type="submit"
              className="w-full py-4 bg-accent text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm("Delete property?")) onDelete(property.id);
              }}
              className="w-full py-3 text-error text-[10px] font-black uppercase tracking-widest hover:bg-error/5 rounded-xl transition-all border border-transparent hover:border-error/20"
            >
              <i className="fas fa-trash-alt mr-2"></i> Delete Property
              Permanently
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageModal;
