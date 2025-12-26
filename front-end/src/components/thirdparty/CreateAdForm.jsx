import React, { useState, useEffect } from 'react';

const CreateAdForm = ({ plans, onSubmit, prefillData }) => {
  const [formData, setFormData] = useState({
    title: '', 
    userName: '', 
    image: '', 
    redirectUrl: '', // New Field
    targetPanels: ['student']
  });

  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({ 
        ...prev, 
        ...prefillData,
        redirectUrl: prefillData.redirectUrl || '',
        targetPanels: ['student', 'owner']
      }));
    }
  }, [prefillData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload to S3/Firebase. 
      // Here we create a local preview URL.
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 animate-fade-in max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-[#332720] mb-6 text-center text-primary">Publish Ad to Panels</h3>
      
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-5">
        
        {/* Panel Selection */}
        <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
            <label className="text-xs font-bold text-[#D84C38] uppercase block mb-3 text-center tracking-widest">Target Panels</label>
            <div className="flex gap-4">
                {['student', 'owner'].map(panel => (
                    <button
                        key={panel}
                        type="button"
                        onClick={() => setFormData(prev => ({
                            ...prev,
                            targetPanels: prev.targetPanels.includes(panel) 
                                ? prev.targetPanels.filter(p => p !== panel) 
                                : [...prev.targetPanels, panel]
                        }))}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold capitalize transition-all ${
                            formData.targetPanels.includes(panel) 
                            ? 'bg-[#D84C38] border-[#D84C38] text-white shadow-md' 
                            : 'bg-white border-gray-200 text-gray-400'
                        }`}
                    >
                        {panel} Panel
                    </button>
                ))}
            </div>
        </div>

        {/* Ad Details */}
        <div className="space-y-4">
            <input 
                required placeholder="Ad Campaign Title"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
            />

            <input 
                required placeholder="Redirect URL (e.g., https://yourstore.com/sale)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                value={formData.redirectUrl}
                onChange={(e) => setFormData({...formData, redirectUrl: e.target.value})}
            />
        </div>

        {/* Image Upload Area */}
        <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl p-4 transition-all hover:border-primary">
            {formData.image ? (
                <div className="relative">
                    <img src={formData.image} className="h-48 w-full object-cover rounded-xl" alt="Preview" />
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, image: ''})}
                        className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg"
                    >
                        &times;
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
                    <i className="fas fa-cloud-upload-alt text-3xl text-gray-300 mb-2 group-hover:text-primary"></i>
                    <span className="text-sm text-gray-400 font-bold group-hover:text-primary">Upload Ad Media (JPG/PNG)</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
            )}
        </div>

        <button type="submit" className="w-full py-4 bg-[#332720] text-white rounded-xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200">
            Confirm & Publish Ad
        </button>
      </form>
    </div>
  );
};

export default CreateAdForm;