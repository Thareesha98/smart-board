import React from "react";

/**
 * Sub-component: Amenity Checkbox
 * Refined with group-hover effects and config-based colors
 */
export const AmenityCheckbox = ({ item, isChecked, onChange }) => (
  <label className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 bg-light hover:bg-gray-200 group">
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

/**
 * Sub-component: Photo Uploader
 * Featuring shadow-custom and rounded-report for consistency
 */
export const PhotoUploader = ({ onImageSelect, previews, onRemove }) => {
  return (
    <div className="mt-6">
      <label className="block text-xs font-black uppercase tracking-[0.2em] mb-3 text-primary">
        Upload Boarding Photos (Min 3)
      </label>

      <div className="flex flex-wrap gap-4 mb-4">
        {/* Render Previews of Selected Images */}
        {previews.map((src, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-card overflow-hidden shadow-custom group border border-light"
          >
            <img
              src={src}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}

        {/* The Upload Trigger Box */}
        <label className="w-24 h-24 border-2 border-dashed rounded-card flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-card-bg border-light hover:border-accent hover:bg-white group">
          <i className="fas fa-camera text-2xl mb-1 text-accent transition-transform group-hover:-rotate-12"></i>
          <span className="text-[9px] font-black text-muted tracking-widest group-hover:text-accent">
            ADD PHOTO
          </span>
          <input
            type="file"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onImageSelect}
          />
        </label>
      </div>

      <p className="text-[10px] font-medium italic text-muted">
        * High-quality images increase your booking chances by 40%.
      </p>
    </div>
  );
};
