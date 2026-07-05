// src/components/Card.jsx
export default function Card({ children, className = "", padding = "p-6", hover = false }) {
  return (
    <div
      className={`bg-white rounded-xl border border-coffee-300 ${padding} ${hover ? "hover:shadow-sm transition-all" : ""} ${className}`}
    >
      {children}
    </div>
  );
}