// src/components/OrderTable.jsx
import Badge from "./Badge";

export default function OrderTable({ orders }) {
  const statusColors = {
    Selesai: "success",
    Dibuat: "info",
    Menunggu: "warning",
  };

  return (
    <div className="bg-white rounded-xl border border-coffee-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-coffee-50 border-b border-coffee-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Pelanggan</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Menu</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Waktu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-coffee-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-coffee-50 transition-colors">
                <td className="px-4 py-4 text-sm font-medium text-coffee-900">{order.id}</td>
                <td className="px-4 py-4 text-sm text-coffee-900">{order.namaPelanggan}</td>
                <td className="px-4 py-4 text-sm text-coffee-600">
                  {order.items?.slice(0, 2).map((item, idx) => (
                    <div key={idx}>{item.qty}x {item.menu}</div>
                  ))}
                  {order.items?.length > 2 && <div className="text-xs">+{order.items.length - 2} lainnya</div>}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-coffee-900">Rp {order.totalHarga?.toLocaleString("id-ID")}</td>
                <td className="px-4 py-4">
                  <Badge type={statusColors[order.status] || "default"}>{order.status}</Badge>
                </td>
                <td className="px-4 py-4 text-sm text-coffee-600">
                  {new Date(order.waktuPesan).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}