import React from "react";

const ToggleSwitch = ({ id, checked, onChange }) => (
  <label
    className="relative inline-block w-[60px] h-[34px] cursor-pointer"
    htmlFor={id}
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="peer opacity-0 w-0 h-0"
    />

    {/* Slider Track */}
    <span
      className={`
            absolute inset-0 rounded-full transition-colors duration-300
            peer-checked:bg-accent bg-gray-300
        `}
    >
      {/* Slider Knob */}
      <span
        className={`
                absolute h-[26px] w-[26px] left-1 bottom-1 bg-white rounded-full 
                transition-transform duration-300 shadow-sm
                ${checked ? "translate-x-[26px]" : "translate-x-0"}
            `}
      ></span>
    </span>
  </label>
);

export default ToggleSwitch;
