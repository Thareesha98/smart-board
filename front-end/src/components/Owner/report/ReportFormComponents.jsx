import React from 'react';

// --- Sub-Component: Select Field ---
export const SelectGroup = ({ label, id, name, value, onChange, options, disabled, placeholder }) => (
  <div className="form-group">
    <label htmlFor={id} className="block font-semibold mb-2" style={{ color: "var(--primary)" }}>
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
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.id || opt} value={opt.id || opt}>
          {opt.name || opt}
        </option>
      ))}
    </select>
  </div>
);

// --- Sub-Component: Evidence Uploader ---
export const EvidenceUpload = ({ onFileChange, fileCount }) => (
  <div className="mt-6">
    <label className="block font-semibold mb-2" style={{ color: "var(--primary)" }}>
      Attach Photos or Documents
    </label>
    <div
      className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition duration-300"
      style={{ borderColor: "var(--light)", backgroundColor: "var(--cardBg)" }}
      onClick={() => document.getElementById("fileUpload").click()}
    >
      <i className="fas fa-file-upload text-3xl mb-2" style={{ color: "var(--accent)" }}></i>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Drag and drop evidence files here, or <span className="font-semibold" style={{ color: "var(--accent)" }}>browse</span>.
      </p>
      <input 
        type="file" id="fileUpload" hidden multiple accept="image/*, application/pdf"
        onChange={onFileChange} 
      />
    </div>
    {fileCount > 0 && (
      <div className="mt-4 text-sm font-semibold text-green-600">
        <i className="fas fa-check-circle mr-2"></i> {fileCount} file(s) ready to upload.
      </div>
    )}
  </div>
);