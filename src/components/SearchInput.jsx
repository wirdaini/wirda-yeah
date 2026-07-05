// src/components/SearchInput.jsx
import { Search } from "lucide-react";

export default function SearchInput({
  placeholder = "Cari...",
  value,
  onChange,
  className = ""
}) {
  return (
    <div className={`relative flex-1 ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-700" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 border border-coffee-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
      />
    </div>
  );
}