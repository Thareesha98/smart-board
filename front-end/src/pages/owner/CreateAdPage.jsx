import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Exact colors and styling constants from my-appointments.css
const COLORS = {
  primary: '#D84C38',
  accent: '#FF7A00',
  text: '#332720',
  muted: '#665345',
  cardBg: '#FFFFFF',
  light: '#E8DBC7',
  radius: '25px',
  shadow: '0 6px 20px rgba(0,0,0,0.08)',
  success: '#10B981',
  error: '#EF4444',
};

const availableAmenities = [
  { label: 'Attached Bathroom', icon: 'fa-bath' },
  { label: 'Wi-Fi', icon: 'fa-wifi' },
  { label: 'Kitchen Access', icon: 'fa-utensils' },
  { label: 'Parking', icon: 'fa-car' },
  { label: 'Laundry', icon: 'fa-washing-machine' },
];

/**
 * Reusable form group component for input fields.
 */
const FormGroup = ({ label, name, placeholder, type = 'text' }) => (
    <div className="form-group">
        <label htmlFor={name} className="block font-semibold mb-2" style={{ color: COLORS.primary }}>
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            required
            // p-[0.75rem] -> p-3, px-[1rem] -> px-4
            className="w-full p-3 px-4 border rounded-xl text-[1rem] transition duration-300 bg-white focus:outline-none"
            style={{ borderColor: COLORS.light, color: COLORS.text }}
            onFocus={(e) => e.target.style.borderColor = COLORS.accent}
            onBlur={(e) => e.target.style.borderColor = COLORS.light}
        />
    </div>
);

/**
 * Main component for creating a new boarding advertisement, 
 * rendering the dashboard content-header style.
 */
const CreateAdPage = () => {
  const [formData, setFormData] = useState({
    title: '', address: '', rent: '', deposit: '', description: '', amenities: [], image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Boarding Ad Created Successfully!');
      setIsSubmitting(false);
    }, 2000);
  };
  
  // Mock Data for Header (Owner)
  const userName = "Mr. Silva";
  const userAvatar = "https://randomuser.me/api/portraits/men/57.jpg"; 
  const notificationCount = 3; 

  // p-[0.6rem] is kept as it is a non-standard Tailwind value, while px-[1rem] becomes px-4
  const primaryBtnClass = "btn btn-primary p-[0.6rem] px-4 rounded-[25px] font-semibold shadow-md transition duration-300 flex items-center gap-1";


  return (
    <div className="space-y-6">
        
        {/* Horizontal Header (Matching .content-header and including Notifications/Profile) */}
        <header 
          // p-[1.5rem] -> p-6
          className="content-header flex justify-between items-center p-6 rounded-[25px] shadow-lg sticky top-3 z-10"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)', // Increased opacity for better visibility when sticky
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            boxShadow: COLORS.shadow,
            // To make it stick to the absolute top of the viewport when scrolling:
            marginTop: 0, 
          }}
        >
          {/* Header Left (Title and Subtitle) */}
          <div className="header-left flex flex-col">
            <h1 className="text-[1.8rem] font-bold leading-tight" style={{ color: COLORS.primary }}>
              Create New Ad
            </h1>
            <p className="text-base" style={{ color: COLORS.muted }}>
              List a new boarding space for students (Owner View)
            </p>
          </div>
          
          {/* Header Right (Quick Action, Notification, User Menu) */}
          <div className="header-right flex items-center gap-6">
            
            {/* Quick Action Button - Save Draft */}
            <button className={primaryBtnClass} style={{ backgroundColor: COLORS.accent, borderColor: COLORS.accent, color: 'white' }}>
              <i className="fas fa-save"></i>
              Save Draft
            </button>
            
            {/* Notification Bell (Matching .notification-bell) */}
            <div className="notification-bell relative cursor-pointer p-3 rounded-full transition duration-300"
                  style={{ backgroundColor: COLORS.light, color: COLORS.text }}>
              <i className="fas fa-bell"></i>
              {notificationCount > 0 && (
                  <span className="notification-count absolute top-[-5px] right-[-5px] w-5 h-5 text-[0.75rem] flex items-center justify-center font-bold rounded-full"
                        style={{ backgroundColor: COLORS.error, color: 'white' }}>
                      {notificationCount}
                  </span>
              )}
            </div>

            {/* User Menu (Matching .user-menu) */}
            <div className="user-menu flex items-center gap-3 cursor-pointer p-2 px-4 rounded-[25px] transition duration-300"
                 style={{ backgroundColor: COLORS.light, color: COLORS.text }}>
              <img src={userAvatar} alt={userName} className="user-avatar w-10 h-10 rounded-full object-cover" 
                   style={{ border: `2px solid ${COLORS.accent}` }} />
              <span>{userName}</span>
            </div>
          </div>
        </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Main Form Card */}
        <div 
          className="bg-white p-8 mt-12 rounded-[25px] shadow-xl" 
          style={{ boxShadow: COLORS.shadow }}
        >
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b" style={{ color: COLORS.primary, borderColor: COLORS.light }}>
            Boarding Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup label="Ad Title" name="title" placeholder="e.g., Spacious Room near Campus" />
            <FormGroup label="Full Address" name="address" placeholder="e.g., 456 Main St, Matara" />
            <FormGroup label="Monthly Rent (LKR)" name="rent" placeholder="e.g., 15000" type="number" />
            <FormGroup label="Key Money/Deposit (LKR)" name="deposit" placeholder="e.g., 30000" type="number" />
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-2" style={{ color: COLORS.primary }}>
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe your boarding space in detail."
              // p-[0.75rem] -> p-3, px-[1rem] -> px-4
              className="w-full p-3 px-4 border rounded-xl text-[1rem] transition duration-300 bg-white focus:outline-none"
              style={{ borderColor: COLORS.light, color: COLORS.text }}
              onFocus={(e) => e.target.style.borderColor = COLORS.accent}
              onBlur={(e) => e.target.style.borderColor = COLORS.light}
              required
            ></textarea>
          </div>
        </div>

        {/* Amenities & Photos Card */}
        <div 
          className="bg-white p-8 rounded-[25px] shadow-xl"
          style={{ boxShadow: COLORS.shadow }}
        >
          <h2 className="text-[1.3rem] font-bold mb-6 pb-3 border-b" style={{ color: COLORS.primary, borderColor: COLORS.light }}>
            Features & Media
          </h2>

          {/* Amenities */}
          <div className="mb-8">
            <h4 className="font-semibold text-lg mb-3" style={{ color: COLORS.primary }}>
              Select Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableAmenities.map(item => (
                <label key={item.label} className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition duration-200 hover:bg-opacity-80" style={{ backgroundColor: COLORS.light }}>
                  <input
                    type="checkbox"
                    name="amenities"
                    value={item.label}
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

          {/* Photos Upload */}
          <div className="mt-6">
            <label className="block font-semibold mb-2" style={{ color: COLORS.primary }}>
              Upload Boarding Photos (Min 3)
            </label>
            <div className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition duration-300"
              style={{ borderColor: COLORS.light, backgroundColor: COLORS.cardBg }}
              onClick={() => document.getElementById('imageUpload').click()}
            >
              <i className="fas fa-upload text-3xl mb-2" style={{ color: COLORS.accent }}></i>
              <p className="text-sm" style={{ color: COLORS.muted }}>
                Drag and drop your images here, or <span className="font-semibold" style={{ color: COLORS.accent }}>browse</span>.
              </p>
              <input
                type="file"
                id="imageUpload"
                name="image"
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Submission Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={primaryBtnClass}
            style={{ 
              backgroundColor: COLORS.accent, 
              color: COLORS.cardBg, 
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
              transform: isSubmitting ? 'none' : 'translateY(-2px)' 
            }}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                Publishing...
              </>
            ) : (
              <>
                <i className="fas fa-bullhorn"></i>
                Publish Ad
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdPage;