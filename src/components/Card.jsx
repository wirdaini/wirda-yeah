// src/components/Card.jsx
export default function Card({ children, className = "", padding = "p-6", hover = false }) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 ${padding} ${hover ? "hover:shadow-md transition-all" : ""} ${className}`}
    >
      {children}
    </div>
  );
}