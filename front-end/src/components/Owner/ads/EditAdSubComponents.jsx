import React from 'react';

// --- Sub-Component: Status Badge ---
export const AdStatusBadge = ({ status, getStyle }) => (
    <span 
        className="px-4 py-2 text-sm font-semibold rounded-full"
        style={getStyle(status)}
    >
        Status: {status}
    </span>
);

// --- Sub-Component: Amenity Checkbox ---
export const AmenityItem = ({ item, isChecked, onChange }) => (
    <label className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition duration-200 hover:bg-opacity-80" style={{ backgroundColor: 'var(--light)' }}>
        <input
            type="checkbox"
            name="amenities"
            value={item.label}
            checked={isChecked}
            onChange={onChange}
            className="h-5 w-5 rounded transition duration-200"
            style={{ color: 'var(--accent)' }}
        />
        <i className={`fas ${item.icon}`} style={{ color: 'var(--accent)' }}></i>
        <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{item.label}</span>
    </label>
);

// --- Sub-Component: Image Preview ---
export const ImagePreview = ({ src, onRemove }) => (
    <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md">
        <img src={src} alt="Ad Preview" className="w-full h-full object-cover" />
        <button 
            type="button"
            onClick={onRemove}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition"
        >
            <i className="fas fa-times"></i>
        </button>
    </div>
);

// --- Sub-Component: Image Uploader ---
export const ImageUploader = ({ onImageSelect }) => (
    <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-all hover:bg-gray-50 hover:border-orange-400"
        style={{ borderColor: 'var(--light)' }}>
        <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            multiple 
            onChange={onImageSelect} 
        />
        <i className="fas fa-camera text-2xl mb-1" style={{ color: 'var(--muted)' }}></i>
        <span className="text-[10px] font-bold" style={{ color: 'var(--muted)' }}>ADD PHOTO</span>
    </label>
);

// --- Sub-Component: Loading State ---
export const LoadingSpinner = ({ id }) => (
    <div className="min-h-screen p-8 flex justify-center items-center" style={{ backgroundColor: 'var(--light)' }}>
        <div className="flex items-center space-x-3 text-xl font-semibold" style={{ color: 'var(--primary)' }}>
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading Ad Details for ID: {id}...</span>
        </div>
    </div>
);