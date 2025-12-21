import React from "react";

const ToggleSwitch = ({ id, checked, onChange }) => (
  <label
    className="
      relative inline-block cursor-pointer shrink-0 transition-transform active:scale-95
      w-[50px] h-[28px] md:w-[60px] md:h-[34px]
    "
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
        absolute inset-0 rounded-full transition-all duration-300 border border-transparent
        peer-checked:bg-accent peer-checked:shadow-[0_0_10px_rgba(255,122,0,0.2)]
        bg-muted/20 peer-focus:ring-2 peer-focus:ring-accent/20
      `}
    >
      {/* Slider Knob */}
      <span
        className={`
          absolute bg-white rounded-full transition-all duration-300 shadow-md
          h-[22px] w-[22px] left-[3px] bottom-[2px]
          md:h-[26px] md:w-[26px] md:left-1 md:bottom-1
          ${checked ? "translate-x-[22px] md:translate-x-[26px]" : "translate-x-0"}
        `}
      ></span>
    </span>
  </label>
);

export default ToggleSwitch;