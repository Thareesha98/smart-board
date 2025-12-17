import React, { useState } from "react";

const CreateBoardingModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rent: "",
    availableRooms: "",
    status: "active",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      ...formData,
      id: `B00${Date.now()}`, // Simple unique ID generation
      rating: 0,
      totalTenants: 0,
      tenantsList: []
    });
    setFormData({ name: "", address: "", rent: "", availableRooms: "", status: "active" }); // Reset
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[30px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="p-6 border-b flex justify-between items-center bg-(--light)">
          <h3 className="text-xl font-bold text-(--primary)">Post New Boarding</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Property Name</label>
            <input 
              required
              type="text"
              placeholder="e.g. Blue Lagoon Villa"
              className="w-full p-3 rounded-xl border bg-gray-50 focus:border-(--accent) outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Address</label>
            <input 
              required
              type="text"
              placeholder="Street, City"
              className="w-full p-3 rounded-xl border bg-gray-50 focus:border-(--accent) outline-none"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Monthly Rent</label>
              <input 
                required
                type="text"
                placeholder="LKR 15,000"
                className="w-full p-3 rounded-xl border bg-gray-50 focus:border-(--accent) outline-none"
                value={formData.rent}
                onChange={(e) => setFormData({...formData, rent: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Total Rooms</label>
              <input 
                required
                type="number"
                placeholder="0"
                className="w-full p-3 rounded-xl border bg-gray-50 focus:border-(--accent) outline-none"
                value={formData.availableRooms}
                onChange={(e) => setFormData({...formData, availableRooms: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-3 border-2 border-gray-100 text-gray-400 rounded-full font-bold">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-(--accent) text-white rounded-full font-bold shadow-lg shadow-orange-100">Publish</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardingModal;