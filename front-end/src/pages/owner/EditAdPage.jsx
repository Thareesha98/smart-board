import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import FormGroup from "../../components/Owner/forms/FormGroup"; // Import the reusable FormGroup
import { ownerData,mockAds } from '../../data/mockData';
import HeaderBar from '../../components/Owner/common/HeaderBar';


const availableAmenities = [
    { label: 'Attached Bathroom', icon: 'fa-bath' },
    { label: 'Wi-Fi', icon: 'fa-wifi' },
    { label: 'Kitchen Access', icon: 'fa-utensils' },
    { label: 'Parking', icon: 'fa-car' },
    { label: 'Laundry', icon: 'fa-washing-machine' },
];

const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'Active': return { backgroundColor: 'var(--success)', color: 'white' };
        case 'Pending': return { backgroundColor: 'var(--accent)', color: 'white' };
        case 'Draft': return { backgroundColor: 'var(--muted)', color: 'white' };
        case 'Deactivated': return { backgroundColor: 'var(--error)', color: 'white' };
        default: return { backgroundColor: 'var(--light)', color: 'var(--text)' };
    }
};

// --- Main Component ---
const EditAdPage = () => {
    const { adId } = useParams(); 
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newImages, setNewImages] = useState([]); // Array to hold new files

    
    // 1. Data Fetching Logic: Find the ad details from the combined list
    useEffect(() => {
        setIsLoading(true);
        setFormData(null); 
        
        // Simulate API/DB lookup delay
        setTimeout(() => {
            // Find the ad in the central list by ID
            const ad = mockAds.find(item => item.id === adId);

            if (ad) {
                // Map the listing data structure to the form data structure
                const adData = {
                    title: ad.title,
                    address: ad.address,
                    rent: String(ad.rent), // Ensure rent is a string for input fields
                    deposit: '30000', // Mock deposit since it wasn't in the original mockAds structure
                    description: `This is the detailed description for Ad ID ${adId}.`, // Placeholder description
                    amenities: ['Wi-Fi', 'Parking'], // Placeholder amenities
                    currentImages: ['https://source.unsplash.com/random/100x100?house', 'https://source.unsplash.com/random/100x100?room'],
                    adStatus: ad.status || 'Draft', // Use 'status' field from combined data
                };
                
                setFormData(adData);
            } else {
                console.error(`Ad ID ${adId} not found.`);
                setFormData({
                    title: 'Ad Not Found', address: '', rent: '', deposit: '', 
                    description: '', amenities: [], currentImages: [], adStatus: 'Error' 
                });
            }
            setIsLoading(false);
        }, 500); 
        
    }, [adId]); 

    // --- Form Handlers ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
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
        setTimeout(() => {
            alert(`Ad ID ${adId} Updated Successfully!`);
            setIsSubmitting(false);
            setNewImages([]);
            navigate('/ownerLayout/myAds'); // Redirect back to My Ads list
        }, 1500);
    };
    
    if (isLoading || !formData) {
        return (
            <div className="min-h-screen p-8 flex justify-center items-center" style={{ backgroundColor: 'var(--light)' }}>
                <div className="flex items-center space-x-3 text-xl font-semibold" style={{ color: 'var(--primary)' }}>
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Loading Ad Details for ID: {adId}...</span>
                </div>
            </div>
        );
    }
    
    const notificationCount = 1; // Example notification count

    return (
        <div className="pt-4 space-y-6" style={{ backgroundColor: 'var(--light)' }}>
            
            {/* 🌟 Standardized HeaderBar */}
            <HeaderBar
                title={`Edit Boarding Ad: ${adId}`}
                subtitle={`Updating: **${formData.title}**`}
                notificationCount={notificationCount}
                userAvatar={ownerData.avatar}
                userName={ownerData.firstName}
            >
                {/* Action Button for Delete Ad */}
                <button 
                    className="px-6 py-2 font-semibold rounded-3xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--card-bg)' }}
                    onClick={() => console.log('Delete Ad')}
                >
                    <i className="fas fa-trash-alt mr-2"></i>
                    Delete Ad
                </button>
            </HeaderBar>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Form Card */}
                <div 
                    className="bg-white p-8 rounded-3xl shadow-xl" 
                    style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
                >
                    <div className="flex justify-between items-center mb-6 pb-3 border-b" style={{ borderColor: 'var(--light)' }}>
                        <h2 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>
                            Ad Information
                        </h2>
                        {/* Status Badge from the original header */}
                        <span 
                            className="px-4 py-2 text-sm font-semibold rounded-full"
                            style={getStatusBadgeStyle(formData.adStatus)}
                        >
                            Status: {formData.adStatus}
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormGroup label="Ad Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Spacious Room near Campus" type="text" />
                        <FormGroup label="Full Address" name="address" value={formData.address} onChange={handleChange} placeholder="e.g., 456 Main St, Matara" type="text" />
                        <FormGroup label="Monthly Rent (LKR)" name="rent" value={formData.rent} onChange={handleChange} placeholder="e.g., 15000" type="number" />
                        <FormGroup label="Key Money/Deposit (LKR)" name="deposit" value={formData.deposit} onChange={handleChange} placeholder="e.g., 30000" type="number" />

                        <div className="flex flex-col">
                            <label htmlFor="adStatus" className="block font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                                Ad Status
                            </label>
                            <select
                                id="adStatus"
                                name="adStatus"
                                value={formData.adStatus}
                                onChange={handleChange}
                                className="p-3 rounded-xl border-2 transition duration-300 focus:outline-none"
                                style={{ borderColor: 'var(--light)', color: 'var(--text)', backgroundColor: 'var(--card-bg)' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--light)'}
                            >
                                <option value="Active">Active (Visible to Students)</option>
                                <option value="Draft">Draft (Hidden)</option>
                                <option value="Pending">Pending Review</option>
                                <option value="Deactivated">Deactivated</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe your boarding space in detail."
                            className="w-full p-3 rounded-xl border-2 transition duration-300 focus:outline-none"
                            style={{ borderColor: 'var(--light)', color: 'var(--text)', backgroundColor: 'var(--card-bg)' }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--light)'}
                            required
                        ></textarea>
                    </div>
                </div>

                {/* Amenities & Photos Card */}
                <div 
                    className="bg-white p-8 rounded-3xl shadow-xl"
                    style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
                >
                    <h2 className="text-xl font-semibold mb-6 pb-3 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--light)' }}>
                        Features & Media
                    </h2>

                    {/* Amenities */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                            Edit Amenities
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {availableAmenities.map(item => (
                                <label key={item.label} className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition duration-200 hover:bg-opacity-80" style={{ backgroundColor: 'var(--light)' }}>
                                    <input
                                        type="checkbox"
                                        name="amenities"
                                        value={item.label}
                                        checked={formData.amenities.includes(item.label)}
                                        onChange={handleChange}
                                        className="h-5 w-5 rounded transition duration-200 checked:bg-orange-500 checked:border-transparent"
                                        style={{ borderColor: 'var(--muted)', color: 'var(--accent)' }}
                                    />
                                    <i className={`fas ${item.icon}`} style={{ color: 'var(--accent)' }}></i>
                                    <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{item.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    {/* Current Images */}
                    <div className="mb-8">
                        <h4 className="font-semibold mb-3" style={{ color: 'var(--primary)' }}>
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
                        <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
                            * Click the 'X' to remove an image. It will be deleted upon saving.
                        </p>
                    </div>

                    {/* New Photos Upload (omitted for brevity) */}
                </div>

                {/* Submission Button */}
                <div className="flex justify-end pt-4 space-x-4">
                    <button
                        type="button"
                        className="px-6 py-3 text-lg font-bold rounded-3xl transition-all duration-300 hover:scale-[1.02]"
                        style={{ 
                            backgroundColor: 'transparent',
                            border: `2px solid ${'var(--primary)'}`,
                            color: 'var(--primary)',
                        }}
                        onClick={() => navigate('/ownerLayout/myAds')}
                    >
                        <i className="fas fa-undo mr-2"></i>
                        Discard & Go Back
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 text-lg font-bold rounded-3xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ 
                            backgroundColor: 'var(--accent)', 
                            color: 'var(--card-bg)', 
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

export default EditAdPage;