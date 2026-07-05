// src/components/ProductCard.jsx
import Card from "./Card";
import Badge from "./Badge";

export default function ProductCard({ image, title, category, price, stock, onClick }) {
  return (
    <Card padding="p-0" hover={true}>
      <img
        src={image || "https://via.placeholder.com/300x200?text=Coffee"}
        alt={title}
        className="w-full h-40 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <Badge type="amber" className="mb-2">{category}</Badge>
        <h3 className="font-semibold text-coffee-900 mb-1">{title}</h3>
        <p className="text-amber-600 font-bold">Rp {price?.toLocaleString("id-ID")}</p>
        <p className="text-xs text-coffee-500 mt-1">Stock: {stock}</p>
        <button
          onClick={onClick}
          className="mt-3 w-full bg-amber-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition"
        >
          Lihat Detail
        </button>
      </div>
    </Card>
  );
}