import React from "react";

// --- Sub-Component: Status Badge ---
// Removed inline styles; uses standard Tailwind classes for text/weight
export const AdStatusBadge = ({ status, className }) => (
  <span
    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm ${className}`}
  >
    Status: {status}
  </span>
);

// --- Sub-Component: Amenity Checkbox ---
// Replaced bg-opacity with clean bg-light and text-accent classes
export const AmenityItem = ({ item, isChecked, onChange }) => (
  <label className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 bg-light hover:bg-gray-200/50 group">
    <input
      type="checkbox"
      name="amenities"
      value={item.label}
      checked={isChecked}
      onChange={onChange}
      className="h-5 w-5 rounded border-gray-300 text-accent focus:ring-accent transition duration-200"
    />
    <i
      className={`fas ${item.icon} text-accent transition-transform group-hover:scale-110`}
    ></i>
    <span className="text-sm font-bold text-text uppercase tracking-tight">
      {item.label}
    </span>
  </label>
);

// --- Sub-Component: Image Preview ---
// Standardized rounding and shadow
export const ImagePreview = ({ src, onRemove }) => (
  <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-custom border border-light">
    <img src={src} alt="Ad Preview" className="w-full h-full object-cover" />
    <button
      type="button"
      onClick={onRemove}
      className="absolute top-1 right-1 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] hover:bg-red-700 transition-colors shadow-lg"
    >
      <i className="fas fa-times"></i>
    </button>
  </div>
);

// --- Sub-Component: Image Uploader ---
// Replaced border-orange-400 with border-accent for config consistency
export const ImageUploader = ({ onImageSelect }) => (
  <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-light rounded-lg cursor-pointer transition-all hover:bg-white hover:border-accent group">
    <input
      type="file"
      className="hidden"
      accept="image/*"
      multiple
      onChange={onImageSelect}
    />
    <i className="fas fa-camera text-2xl mb-1 text-muted group-hover:text-accent transition-colors"></i>
    <span className="text-[9px] font-black text-muted tracking-widest group-hover:text-accent">
      ADD PHOTO
    </span>
  </label>
);

// --- Sub-Component: Loading State ---
// Uses primary color and light background from config
export const LoadingSpinner = ({ id }) => (
  <div className="min-h-screen p-8 flex justify-center items-center bg-light">
    <div className="flex items-center space-x-4 text-xl font-black tracking-tighter text-primary">
      <i className="fas fa-spinner fa-spin"></i>
      <span className="uppercase">Loading Archive ID: {id}...</span>
    </div>
  </div>
);
