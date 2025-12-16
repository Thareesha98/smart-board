import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import FormGroup from "../../components/Owner/forms/FormGroup"; 
import HeaderBar from '../../components/Owner/common/HeaderBar';
import { ownerData, mockAds } from '../../data/mockData';

import { 
    AdStatusBadge, 
    AmenityItem, 
    ImagePreview, 
    ImageUploader,
    LoadingSpinner 
} from '../../components/Owner/ads/EditAdSubComponents';

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

const EditAdPage = () => {
    const { adId } = useParams(); 
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newImages, setNewImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const ad = mockAds.find(item => item.id === adId);
            if (ad) {
                setFormData({
                    ...ad,
                    rent: String(ad.rent),
                    amenities: ad.amenities || ['Wi-Fi'],
                    currentImages: [ad.image || 'https://via.placeholder.com/150'],
                    adStatus: ad.status || 'Active'
                });
            }
            setIsLoading(false);
        }, 500);
    }, [adId]);

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

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setNewImages(prev => [...prev, ...files]);
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const handleRemoveNewImage = (index) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        setTimeout(() => {
            alert(`Success! A new version of "${formData.title}" has been submitted as 'Pending' for review.`);
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
            setIsSubmitting(false);
            navigate('/ownerLayout/myAds'); 
        }, 1500);
    };

    if (isLoading || !formData) return <LoadingSpinner id={adId} />;

    return (
        <div className="pt-4 space-y-6" style={{ backgroundColor: 'var(--light)' }}>
            <HeaderBar 
                title={`Edit Ad: ${adId}`} 
                subtitle={`Creating a pending revision for **${formData.title}**`}
                notificationCount={1}
                userAvatar={ownerData.avatar} 
                userName={ownerData.firstName}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-8 rounded-3xl shadow-xl">
                    <div className="flex justify-between items-center mb-6 pb-3 border-b" style={{ borderColor: 'var(--light)' }}>
                        <h2 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>Ad Information</h2>
                        <AdStatusBadge status={formData.adStatus} getStyle={getStatusBadgeStyle} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormGroup label="Title" name="title" value={formData.title} onChange={handleChange} />
                        <FormGroup label="Address" name="address" value={formData.address} onChange={handleChange} />
                        <FormGroup label="Monthly Rent" name="rent" value={formData.rent} onChange={handleChange} type="number" />
                        <FormGroup label="Deposit" name="deposit" value={formData.deposit || '30000'} onChange={handleChange} type="number" />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl">
                    <h2 className="text-xl font-semibold mb-6 pb-3 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--light)' }}>Features & Media</h2>

                    <div className="mb-8">
                        <h4 className="font-semibold mb-3">Amenities</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {availableAmenities.map(item => (
                                <AmenityItem 
                                    key={item.label} 
                                    item={item} 
                                    isChecked={formData.amenities.includes(item.label)} 
                                    onChange={handleChange} 
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-3">Photos</h4>
                        <div className="flex flex-wrap gap-4">
                            {formData.currentImages.map((src, idx) => (
                                <ImagePreview key={`curr-${idx}`} src={src} onRemove={() => {}} />
                            ))}
                            {imagePreviews.map((src, idx) => (
                                <ImagePreview key={`new-${idx}`} src={src} isNew={true} onRemove={() => handleRemoveNewImage(idx)} />
                            ))}
                            <ImageUploader onImageSelect={handleImageSelect} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 space-x-4">
                    <button type="button" onClick={() => navigate('/ownerLayout/myAds')} className="px-6 py-3 font-bold rounded-3xl border-2" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="px-8 py-3 text-lg font-bold rounded-3xl shadow-lg hover:scale-[1.02] bg-orange-500 text-white disabled:opacity-50" style={{ backgroundColor: 'var(--accent)' }}>
                        {isSubmitting ? "Submitting..." : "Submit for Approval"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAdPage;