import React from 'react';
import { Link } from 'react-router-dom';

const StatWidget = ({
  icon,
  title,
  mainValue,
  subValue,
  subLabel,
  hasButton = false,
  to = "#", // Default link target
}) => (
  <div
    className="stat-widget flex p-6 rounded-[25px] shadow-lg transition duration-300 hover:translate-y-[-5px] relative"
    style={{ backgroundColor: 'var(--card-bg)', boxShadow: 'var(--shadow)' }}
  >
    <div
      className="widget-icon p-4 rounded-[15px] text-2xl shrink-0"
      style={{ backgroundColor: 'var(--light)', color: 'var(--accent)' }}
    >
      <i className={icon}></i>
    </div>
    <div className="widget-content ml-4 flex-1">
      <h3
        className="text-sm font-semibold mb-3"
        style={{ color: 'var(--muted)' }}
      >
        {title}
      </h3>
      <div className="widget-details flex flex-col gap-1">
        <strong className="text-xl font-bold" style={{ color: 'var(--text)' }}>
          {mainValue}
        </strong>
        <span className="text-sm" style={{ color: 'var(--muted)' }}>
          {subValue}
        </span>
      </div>
      {hasButton && (
        <Link
          to={to}
          className="btn btn-primary view-earnings p-2 px-4 text-sm font-semibold rounded-[25px] mt-3 inline-block no-underline"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--card-bg)' }}
        >
          {subLabel}
        </Link>
      )}
    </div>
  </div>
);

export default StatWidget;