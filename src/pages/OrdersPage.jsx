import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  const filteredOrders = ordersData.filter(
    (order) =>
      order.namaPelanggan.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    Selesai: "bg-green-100 text-green-800",
    Dibuat: "bg-blue-100 text-blue-800",
    Menunggu: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="p-6 space-y-6">
      
      <PageHeader 
  title="Order History" 
  subtitle="Riwayat pesanan pelanggan Papi Coffee" 
        breadcrumb="Order History"

/>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari order ID, nama pelanggan, atau status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent">
            <option>Semua Status</option>
            <option>Selesai</option>
            <option>Dibuat</option>
            <option>Menunggu</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Menu
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Waktu
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Pembayaran
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{order.namaPelanggan}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          {item.qty}x {item.menu}
                          {item.tingkatGula !== "-" && (
                            <span className="text-xs text-gray-500 ml-1">({item.tingkatGula})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    Rp {order.totalHarga.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        statusColors[order.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {new Date(order.waktuPesan).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{order.metodePembayaran}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}