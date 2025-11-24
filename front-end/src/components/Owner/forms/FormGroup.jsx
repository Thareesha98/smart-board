import React from 'react';

const FormGroup = ({ label, name, placeholder, type = "text", value, onChange }) => (
  <div className="form-group">
    <label
      htmlFor={name}
      className="block font-semibold mb-2"
      style={{ color: "var(--primary)" }}
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
      className="w-full p-3 px-4 border rounded-xl text-[1rem] transition duration-300 bg-white focus:outline-none"
      style={{ borderColor: "var(--light)", color: "var(--text)" }}
      onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--light)")}
    />
  </div>
);

export default FormGroup;