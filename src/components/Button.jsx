// src/components/Button.jsx
export default function Button({
  children,
  type = "primary",
  onClick,
  className = "",
  disabled = false
}) {
  const types = {
    primary: "bg-coffee-800 hover:bg-coffee-900 text-white",
    secondary: "bg-coffee-100 hover:bg-coffee-200 text-coffee-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    outline: "border border-coffee-300 text-coffee-700 hover:bg-coffee-50",
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