// src/components/UI/Button.jsx
const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
  let classes = "px-4 py-2 font-semibold transition-all duration-200 rounded-btn text-center text-sm disabled:opacity-50 disabled:cursor-not-allowed";

  switch (variant) {
    case 'primary':
      classes += " bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg";
      break;
    case 'accent':
      classes += " bg-accent text-white hover:bg-accent/80 shadow-md hover:shadow-accent-hover";
      break;
    case 'error':
      classes += " bg-error text-white hover:bg-red-alert/80";
      break;
    case 'outline':
      classes += " border border-primary text-primary hover:bg-primary/10";
      break;
    case 'ghost':
      classes += " bg-transparent text-text-dark hover:bg-background-light";
      break;
  }

  return (
    <button type={type} onClick={onClick} className={`${classes} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;