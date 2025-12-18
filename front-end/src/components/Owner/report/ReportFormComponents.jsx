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
      className="block font-semibold mb-2"
      style={{ color: "var(--primary)" }}
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
      className="w-full p-3 px-4 border rounded-xl text-[1rem] transition duration-300 bg-white focus:outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
      style={{ borderColor: "var(--light)", color: "var(--text)" }}
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
    <div className="mt-6">
      <label
        className="block font-semibold mb-2"
        style={{ color: "var(--primary)" }}
      >
        Attach Photos or Documents
      </label>

      {/* 1. The Dropzone/Upload Area */}
      <div
        className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition duration-300 hover:bg-gray-50 group"
        style={{
          borderColor: "var(--light)",
          backgroundColor: "var(--cardBg)",
        }}
        onClick={() => document.getElementById("fileUpload").click()}
      >
        <i
          className="fas fa-file-upload text-3xl mb-2 group-hover:scale-110 transition-transform"
          style={{ color: "var(--accent)" }}
        ></i>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Drag and drop evidence files here, or{" "}
          <span className="font-semibold" style={{ color: "var(--accent)" }}>
            browse
          </span>
          .
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
            // Create a temporary URL for image previews
            const previewUrl = isImage ? URL.createObjectURL(file) : null;

            return (
              <div
                key={index}
                className="relative group rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm h-32"
              >
                {isImage ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-gray-50">
                    <i className="fas fa-file-pdf text-red-500 text-2xl mb-1"></i>
                    <span
                      className="text-[10px] text-center truncate w-full px-2"
                      style={{ color: "var(--text)" }}
                    >
                      {file.name}
                    </span>
                  </div>
                )}

                {/* Remove Button Overlay */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    onRemoveFile(index);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
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
