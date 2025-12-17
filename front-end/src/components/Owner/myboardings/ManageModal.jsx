import React, { useState, useEffect } from "react";

const ManageModal = ({ isOpen, onClose, property, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({ ...property });

  useEffect(() => {
    if (property) setFormData({ ...property });
  }, [property]);

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[30px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="p-6 border-b flex justify-between bg-(--light)">
          <h3 className="text-xl font-bold text-(--primary)">Quick Manage</h3>
          <button onClick={onClose} className="text-gray-500"><i className="fas fa-times"></i></button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onUpdate(formData); }} className="p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Monthly Rent</label>
            <input type="text" value={formData.rent} onChange={(e) => setFormData({...formData, rent: e.target.value})} 
                   className="w-full p-3 rounded-xl border bg-gray-50 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Available Rooms</label>
            <input type="number" value={formData.availableRooms} onChange={(e) => setFormData({...formData, availableRooms: e.target.value})} 
                   className="w-full p-3 rounded-xl border bg-gray-50 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Status</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} 
                    className="w-full p-3 rounded-xl border bg-gray-50 focus:outline-none">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="pt-4 flex flex-col gap-3">
            <button type="submit" className="w-full py-3 bg-(--accent) text-white rounded-full font-bold text-sm shadow-lg">Save Changes</button>
            <button type="button" onClick={() => { if(window.confirm('Delete property?')) onDelete(property.id); }} 
                    className="w-full py-2 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-50 rounded-xl transition">
              <i className="fas fa-trash-alt mr-2"></i> Delete Property Permanently
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ManageModal;