// src/components/QueueCard.jsx (UPDATE jika perlu)
import Badge from "./Badge";

export default function QueueCard({ order }) {
  return (
    <div className="bg-white rounded-xl border border-coffee-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-coffee-900">{order.id}</span>
        <Badge type="warning">{order.status}</Badge>
      </div>
      <p className="font-medium text-coffee-900">{order.namaPelanggan}</p>
      <div className="text-sm text-coffee-600 mt-1">
        {order.items?.map((item, idx) => (
          <div key={idx}>{item.qty}x {item.menu}</div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-coffee-100">
        <span className="text-sm font-semibold text-amber-600">Rp {order.totalHarga?.toLocaleString("id-ID")}</span>
        <span className="text-xs text-coffee-500">{order.metodePembayaran}</span>
      </div>
    </div>
  );
}