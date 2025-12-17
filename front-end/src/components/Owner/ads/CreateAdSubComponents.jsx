import React from "react";

// --- Sub-Component: Amenity Checkbox ---
export const AmenityCheckbox = ({ item, isChecked, onChange }) => (
  <label
    className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition duration-200 hover:bg-opacity-80"
    style={{ backgroundColor: "var(--light)" }}
  >
    <input
      type="checkbox"
      name="amenities"
      value={item.label}
      checked={isChecked}
      onChange={onChange}
      className="h-5 w-5 rounded transition duration-200"
      style={{ color: "var(--accent)" }}
    />
    <i className={`fas ${item.icon}`} style={{ color: "var(--accent)" }}></i>
    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
      {item.label}
    </span>
  </label>
);

// --- Sub-Component: Photo Uploader ---
export const PhotoUploader = ({ onImageSelect, previews, onRemove }) => {
  return (
    <div className="mt-6">
      <label
        className="block font-semibold mb-2"
        style={{ color: "var(--primary)" }}
      >
        Upload Boarding Photos (Min 3)
      </label>

      <div className="flex flex-wrap gap-4 mb-4">
        {/* Render Previews of Selected Images */}
        {previews.map((src, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md group"
          >
            <img
              src={src}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}

        {/* The Upload Trigger Box */}
        <label
          className="w-24 h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition duration-300 hover:bg-gray-50"
          style={{
            borderColor: "var(--light)",
            backgroundColor: "var(--card-bg)",
          }}
        >
          <i
            className="fas fa-camera text-2xl mb-1"
            style={{ color: "var(--accent)" }}
          ></i>
          <span
            className="text-[10px] font-bold"
            style={{ color: "var(--muted)" }}
          >
            ADD PHOTO
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onImageSelect}
          />
        </label>
      </div>

      <p className="text-xs" style={{ color: "var(--muted)" }}>
        * High-quality images increase your booking chances by 40%.
      </p>
    </div>
  );
};
