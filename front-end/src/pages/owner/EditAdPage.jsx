import React, { useState, useEffect } from 'react';
// ⚠️ We need to import the hooks from React Router DOM (assumed to be installed)
import { useParams } from 'react-router-dom'; 

// Custom colors... (COLORS object remains the same)
const COLORS = {
  primary: '#D84C38', // --primary
  accent: '#FF7A00',   // --accent
  text: '#332720',    // --text
  muted: '#665345',    // --muted
  cardBg: '#FFFFFF',   // --card-bg
  light: '#E8DBC7',    // --light
  success: '#10B981', // --success
  error: '#EF4444',   // --error
};

// ⚠️ MOCK DATABASE/API DATA
// In a real application, this data would come from an API based on the ID.
const mockAdDatabase = {
    '456': { // Ad ID: 456 - The new ad we are fetching
        title: 'Budget Friendly Room, 10 min to Campus',
        address: '777 Suburb Road, Matara',
        rent: '10000',
        deposit: '20000',
        description: "A secure, clean room suitable for male students. Shared bathroom. Includes essential furniture.",
        amenities: ['Kitchen Access', 'Laundry'],
        currentImages: ['url-to-budget-room-img-1', 'url-to-budget-room-img-2'],
        adStatus: 'Draft',
    },
    '123': { // Ad ID: 123 - The previous static example ad
        title: 'Luxury Studio near University',
        address: 'No. 34, Temple Road, Matara',
        rent: '18000',
        deposit: '36000',
        description: "A newly built, fully furnished luxury studio apartment...",
        amenities: ['Attached Bathroom', 'Wi-Fi', 'Parking'],
        currentImages: ['url-to-luxury-img-1', 'url-to-luxury-img-2', 'url-to-luxury-img-3'],
        adStatus: 'Active',
    },
};

const EditAdPage = () => {
    // 1. Get the adId from the URL parameters
    const { adId } = useParams(); 
    
    // Initial state set to null, indicating data hasn't loaded yet
    const [formData, setFormData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newImages, setNewImages] = useState([]);
    
    // 2. Data Fetching Logic (using useEffect and the adId)
    useEffect(() => {
        setIsLoading(true);
        setFormData(null); // Clear previous data
        
        // --- START MOCK FETCH ---
        setTimeout(() => {
            const adData = mockAdDatabase[adId];
            
            if (adData) {
                setFormData(adData);
                console.log(`Successfully loaded ad data for ID: ${adId}`);
            } else {
                console.error(`Ad ID ${adId} not found.`);
                // Set a default/empty state or redirect to an error page
                setFormData({
                    title: 'Ad Not Found', address: '', rent: '', deposit: '', 
                    description: '', amenities: [], currentImages: [], adStatus: 'Error' 
                });
            }
            setIsLoading(false);
        }, 1000); // Simulate network delay
        // --- END MOCK FETCH ---
        
    }, [adId]); // Rerun effect whenever adId changes (user navigates to a different ad)

    // Ensure formData is loaded before allowing interaction
    if (isLoading || !formData) {
        return (
            <div className="min-h-screen p-8 flex justify-center items-center" style={{ backgroundColor: COLORS.light }}>
                <div className="flex items-center space-x-3 text-xl font-semibold" style={{ color: COLORS.primary }}>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Loading Ad Details for ID: {adId}...</span>
                </div>
            </div>
        );
    }

    // --- Form Handlers (remain mostly the same) ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // ... (rest of handleChange logic)
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                amenities: checked 
                  ? [...prev.amenities, value]
                  : prev.amenities.filter(item => item !== value),
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    // ... (handleFileChange, handleRemoveImage, handleSubmit remain the same)
    const handleFileChange = (e) => {
        setNewImages([...newImages, ...e.target.files]);
    };
    
    const handleRemoveImage = (index, type) => {
        if (type === 'current') {
            setFormData(prev => ({
                ...prev,
                currentImages: prev.currentImages.filter((_, i) => i !== index),
            }));
        } else {
            setNewImages(newImages.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call for updating the ad
        setTimeout(() => {
            alert(`Ad ID ${adId} Updated Successfully!`);
            setIsSubmitting(false);
            setNewImages([]);
            // In a real app: Navigate back to the "My Boardings" list
        }, 2000);
    };
    // ---------------------------------------------
    
    const availableAmenities = [
        // ... (amenities list remains the same)
        { label: 'Attached Bathroom', icon: 'fa-bath' },
        { label: 'Wi-Fi', icon: 'fa-wifi' },
        { label: 'Kitchen Access', icon: 'fa-utensils' },
        { label: 'Parking', icon: 'fa-car' },
        { label: 'Laundry', icon: 'fa-washing-machine' },
    ];
    
    const getStatusBadgeStyle = (status) => {
        // ... (getStatusBadgeStyle logic remains the same)
        switch (status) {
            case 'Active': return { backgroundColor: COLORS.success, color: 'white' };
            case 'Pending': return { backgroundColor: COLORS.accent, color: 'white' };
            case 'Draft': return { backgroundColor: COLORS.muted, color: 'white' };
            default: return { backgroundColor: COLORS.light, color: COLORS.text };
        }
    };
    
    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: COLORS.light }}>
            {/* Header */}
            <header 
                className="flex flex-col sm:flex-row justify-between items-center mb-8 p-6 rounded-3xl shadow-lg sticky top-6 z-10"
                style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)'
                }}
            >
                <div className="flex flex-col mb-4 sm:mb-0">
                    <h1 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
                        Edit Boarding Ad: {adId}
                    </h1>
                    <p className="text-sm" style={{ color: COLORS.muted }}>
                        Updating: **{formData.title}**
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <span 
                        className="px-4 py-2 text-sm font-semibold rounded-full"
                        style={getStatusBadgeStyle(formData.adStatus)}
                    >
                        Status: {formData.adStatus}
                    </span>
                    <button 
                        className="px-6 py-2 font-semibold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                        style={{ backgroundColor: COLORS.primary, color: COLORS.cardBg }}
                        onClick={() => console.log('Delete Ad')}
                    >
                        <i className="fas fa-trash-alt mr-2"></i>
                        Delete Ad
                    </button>
                </div>
            </header>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Form Card */}
                <div 
                    className="bg-white p-8 rounded-3xl shadow-xl" 
                    style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
                >
                    <h2 className="text-xl font-semibold mb-6 pb-3 border-b" style={{ color: COLORS.primary, borderColor: COLORS.light }}>
                        Ad Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormGroup label="Ad Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Spacious Room near Campus" type="text" />
                        <FormGroup label="Full Address" name="address" value={formData.address} onChange={handleChange} placeholder="e.g., 456 Main St, Matara" type="text" />
                        <FormGroup label="Monthly Rent (LKR)" name="rent" value={formData.rent} onChange={handleChange} placeholder="e.g., 15000" type="number" />
                        <FormGroup label="Key Money/Deposit (LKR)" name="deposit" value={formData.deposit} onChange={handleChange} placeholder="e.g., 30000" type="number" />

                        <div className="flex flex-col">
                            <label htmlFor="adStatus" className="block font-semibold mb-2" style={{ color: COLORS.primary }}>
                                Ad Status
                            </label>
                            <select
                                id="adStatus"
                                name="adStatus"
                                value={formData.adStatus}
                                onChange={handleChange}
                                className="p-3 rounded-xl border-2 transition duration-300 focus:outline-none"
                                style={{ borderColor: COLORS.light, color: COLORS.text, backgroundColor: COLORS.cardBg }}
                                onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                                onBlur={(e) => e.target.style.borderColor = COLORS.light}
                            >
                                <option value="Active">Active (Visible to Students)</option>
                                <option value="Draft">Draft (Hidden)</option>
                                <option value="Pending">Pending Review</option>
                                <option value="Deactivated">Deactivated</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block font-semibold mb-2" style={{ color: COLORS.primary }}>
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe your boarding space in detail."
                            className="w-full p-3 rounded-xl border-2 transition duration-300 focus:outline-none"
                            style={{ borderColor: COLORS.light, color: COLORS.text, backgroundColor: COLORS.cardBg }}
                            onFocus={(e) => e.target.style.borderColor = COLORS.accent}
                            onBlur={(e) => e.target.style.borderColor = COLORS.light}
                            required
                        ></textarea>
                    </div>
                </div>

                {/* Amenities & Photos Card */}
                <div 
                    className="bg-white p-8 rounded-3xl shadow-xl"
                    style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
                >
                    <h2 className="text-xl font-semibold mb-6 pb-3 border-b" style={{ color: COLORS.primary, borderColor: COLORS.light }}>
                        Features & Media
                    </h2>

                    {/* Amenities */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3" style={{ color: COLORS.primary }}>
                            Edit Amenities
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {availableAmenities.map(item => (
                                <label key={item.label} className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition duration-200 hover:bg-opacity-80" style={{ backgroundColor: COLORS.light }}>
                                    <input
                                        type="checkbox"
                                        name="amenities"
                                        value={item.label}
                                        checked={formData.amenities.includes(item.label)}
                                        onChange={handleChange}
                                        className="h-5 w-5 rounded transition duration-200 checked:bg-orange-500 checked:border-transparent"
                                        style={{ borderColor: COLORS.muted, color: COLORS.accent }}
                                    />
                                    <i className={`fas ${item.icon}`} style={{ color: COLORS.accent }}></i>
                                    <span className="text-sm font-medium" style={{ color: COLORS.text }}>{item.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    {/* Current Images */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3" style={{ color: COLORS.primary }}>
                            Current Photos ({formData.currentImages.length})
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {formData.currentImages.map((src, index) => (
                                <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md">
                                    <img src={src} alt={`Current Ad Photo ${index + 1}`} className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={() => handleRemoveImage(index, 'current')}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs mt-2" style={{ color: COLORS.muted }}>
                            * Click the 'X' to remove an image. It will be deleted upon saving.
                        </p>
                    </div>

                    {/* New Photos Upload (omitted for brevity, assume the same logic as before) */}
                    {/* ... (New Photos Upload section) */}
                </div>

                {/* Submission Button */}
                <div className="flex justify-end pt-4 space-x-4">
                    <button
                        type="button"
                        className="px-6 py-3 text-lg font-bold rounded-3xl transition-all duration-300 hover:scale-[1.02]"
                        style={{ 
                            backgroundColor: 'transparent',
                            border: `2px solid ${COLORS.primary}`,
                            color: COLORS.primary,
                        }}
                        onClick={() => console.log('Discard Changes')}
                    >
                        <i className="fas fa-undo mr-2"></i>
                        Discard Changes
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 text-lg font-bold rounded-3xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ 
                            backgroundColor: COLORS.accent, 
                            color: COLORS.cardBg, 
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-save mr-2"></i>
                                Save & Update Ad
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Reusable form group component (remains the same)
const FormGroup = ({ label, name, value, onChange, placeholder, type = 'text' }) => {
    // ... (FormGroup logic remains the same)
    const COLORS = { primary: '#D84C38', accent: '#FF7A00', text: '#332720', light: '#E8DBC7', cardBg: '#FFFFFF' };
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="block font-semibold mb-2" style={{ color: COLORS.primary }}>{label}</label>
            <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required className="p-3 rounded-xl border-2 transition duration-300 focus:outline-none" style={{ borderColor: COLORS.light, color: COLORS.text, backgroundColor: COLORS.cardBg }} onFocus={(e) => e.target.style.borderColor = COLORS.accent} onBlur={(e) => e.target.style.borderColor = COLORS.light} />
        </div>
    );
};

export default EditAdPage;