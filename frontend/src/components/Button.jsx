const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  disabled = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const widthClass = fullWidth ? 'btn-full' : '';
  const disabledClass = disabled ? 'btn-disabled' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${widthClass} ${disabledClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
