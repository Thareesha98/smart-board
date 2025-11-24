import React from 'react';

const ToggleSwitch = ({ id, checked, onChange }) => (
    <label className="toggle-switch relative inline-block w-[60px] h-[34px]">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className="opacity-0 w-0 h-0" />
        <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full"
              style={{ backgroundColor: checked ? "var(--accent)" : '#ccc', transition: '.4s' }}>
            <span className="absolute content-none h-[26px] w-[26px] left-1 bottom-1 bg-white rounded-full"
                  style={{ transition: '.4s', transform: checked ? 'translateX(26px)' : 'translateX(0)' }}>
            </span>
        </span>
    </label>
);

export default ToggleSwitch;