import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaSave } from "react-icons/fa";
import { updateTechnicianProfile } from "../../../api/technician/technicianService";
import toast from "react-hot-toast";

const EditProfileModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    phone: user.phone || "",
    city: user.city || "",
    basePrice: user.basePrice || "",
    address: user.address || ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTechnicianProfile(formData);
      toast.success("Profile Updated!");
      onUpdate(); // Trigger refresh in parent
      onClose();
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
        <div className="bg-primary p-4 text-white flex justify-between items-center">
          <h2 className="font-bold text-lg">Edit Profile</h2>
          <button onClick={onClose}><FaTimes /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border rounded-xl p-3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-bold text-gray-700">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded-xl p-3" />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700">Base Price (LKR)</label>
                <input type="number" name="basePrice" value={formData.basePrice} onChange={handleChange} className="w-full border rounded-xl p-3" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border rounded-xl p-3" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Full Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border rounded-xl p-3" rows="2" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-accent text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
            {loading ? "Saving..." : <><FaSave /> Save Changes</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfileModal;