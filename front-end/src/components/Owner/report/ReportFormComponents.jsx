import React from "react";

// --- Sub-Component: Select Field ---
export const SelectGroup = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  disabled,
  placeholder,
}) => (
  <div className="form-group">
    <label
      htmlFor={id}
      className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-primary"
    >
      {label} *
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className="
        w-full p-3.5 px-4 rounded-xl text-sm transition-all duration-300
        bg-white text-text border border-light appearance-none
        focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20
        disabled:bg-light/30 disabled:cursor-not-allowed disabled:text-muted
      "
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.id || opt} value={opt.id || opt}>
          {opt.name || opt}
        </option>
      ))}
    </select>
  </div>
);

// --- Sub-Component: Evidence Uploader ---
export const EvidenceUpload = ({ onFileChange, files, onRemoveFile }) => {
  return (
    <div className="mt-8">
      <label className="block text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-primary">
        Attach Photos or Documents
      </label>

      {/* 1. The Dropzone/Upload Area */}
      <div
        className="
          border-2 border-dashed p-8 rounded-report text-center cursor-pointer transition-all duration-300 
          bg-card-bg border-light hover:border-accent hover:bg-white group
        "
        onClick={() => document.getElementById("fileUpload").click()}
      >
        <i className="fas fa-file-upload text-3xl mb-3 text-accent transition-transform group-hover:scale-110 group-hover:-translate-y-1"></i>
        <p className="text-xs font-medium text-muted">
          Drag and drop evidence files here, or{" "}
          <span className="font-bold text-accent group-hover:underline">
            browse
          </span>
        </p>
        <input
          type="file"
          id="fileUpload"
          hidden
          multiple
          accept="image/*, application/pdf"
          onChange={onFileChange}
        />
      </div>

      {/* 2. File Preview Grid */}
      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const previewUrl = isImage ? URL.createObjectURL(file) : null;

            return (
              <div
                key={index}
                className="relative group rounded-card border border-light bg-card-bg overflow-hidden shadow-custom h-32"
              >
                {isImage ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-light/20">
                    <i className="fas fa-file-pdf text-error text-2xl mb-2"></i>
                    <span className="text-[9px] font-black text-text uppercase tracking-tighter text-center truncate w-full px-2">
                      {file.name}
                    </span>
                  </div>
                )}

                {/* Remove Button Overlay */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(index);
                  }}
                  className="
                    absolute top-1.5 right-1.5 bg-error text-white w-7 h-7 rounded-full 
                    flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 
                    transition-opacity shadow-lg hover:bg-red-600
                  "
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
