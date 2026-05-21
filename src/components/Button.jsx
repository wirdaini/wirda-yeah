// src/components/Button.jsx
export default function Button({ 
  children, 
  type = "primary", 
  onClick, 
  className = "",
  disabled = false 
}) {
  const types = {
    primary: "bg-amber-600 hover:bg-amber-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    outline: "border border-amber-600 text-amber-600 hover:bg-amber-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${types[type] || types.primary} px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}