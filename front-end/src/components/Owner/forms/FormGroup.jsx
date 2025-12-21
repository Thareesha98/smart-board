import React from "react";

const FormGroup = ({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) => (
  <div className="form-group">
    {/* Label with Architectural Ledger Typography */}
    <label
      htmlFor={name}
      className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-primary"
    >
      {label}
    </label>

    {/* Input field with dynamic focus states */}
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
      className="
        w-full p-3 px-4 rounded-xl text-base transition-all duration-300
        bg-white text-text border border-light
        placeholder:text-muted/50
        focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20
      "
    />
  </div>
);

export default FormGroup;
