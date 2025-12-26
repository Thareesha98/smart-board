import React, { useState, useEffect } from 'react';

const PlanModal = ({ isOpen, onClose, onSave, planToEdit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  useEffect(() => {
    if (planToEdit && isOpen) {
      setName(planToEdit.name || '');
      setPrice(planToEdit.price || '');
      setDuration(planToEdit.duration || '');
      setDescription(planToEdit.description || '');
      setFeaturesText(planToEdit.features ? planToEdit.features.join('\n') : '');
    }
  }, [planToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const features = featuresText.split('\n').filter(f => f.trim() !== '');
    onSave({ name, price, duration, description, features });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-black mb-6">{planToEdit ? 'Edit Plan' : 'New Plan'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Plan Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#D84C38]" placeholder="Basic" required />
             </div>
             <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Price ($)</label>
                <input value={price} onChange={e => setPrice(e.target.value)} type="number" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#D84C38]" placeholder="49" required />
             </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Duration (e.g. 30 days)</label>
            <input value={duration} onChange={e => setDuration(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#D84C38]" placeholder="30 days" />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Short Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#D84C38]" placeholder="Perfect for small businesses..." />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Features (One per line)</label>
            <textarea value={featuresText} onChange={e => setFeaturesText(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#D84C38]" rows="5" placeholder="Sidebar Display&#10;Basic Analytics" />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 font-bold text-gray-400">CANCEL</button>
            <button type="submit" className="flex-1 py-4 bg-[#D84C38] text-white rounded-2xl font-bold shadow-lg shadow-red-200">SAVE PLAN</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanModal;