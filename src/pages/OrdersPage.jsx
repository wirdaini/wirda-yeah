// src/pages/OrdersPage.jsx
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import OrderTable from "../components/OrderTable";
import Card from "../components/Card";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch = order.namaPelanggan.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "Semua Status" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Order History" subtitle="Riwayat pesanan pelanggan Papi Coffee" breadcrumb="Order History" />

      <Card>
        <div className="flex items-center gap-4 mb-6">
          <SearchInput placeholder="Cari order ID, nama pelanggan..." value={search} onChange={setSearch} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option>Semua Status</option>
            <option>Selesai</option>
            <option>Dibuat</option>
            <option>Menunggu</option>
          </select>
        </div>
        <OrderTable orders={filteredOrders} />
      </Card>
    </div>
  );
}