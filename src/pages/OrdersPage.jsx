// src/pages/OrdersPage.jsx
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Plus, MoreHorizontal } from "lucide-react";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import OrderTable from "../components/OrderTable";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import Button from "../components/Button";

const statusTabs = ["Semua Status", "Dibuat", "Menunggu", "Selesai"];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [filteredOrders, setFilteredOrders] = useState(ordersData);

  // Ringkasan status untuk stat card, dihitung dari data order asli
  // (bukan angka template, biar konsisten sama data CRM Papi Coffee)
  const totalOrders = ordersData.length;
  const dibuatCount = ordersData.filter((o) => o.status === "Dibuat").length;
  const menungguCount = ordersData.filter((o) => o.status === "Menunggu").length;
  const selesaiCount = ordersData.filter((o) => o.status === "Selesai").length;
  
  // useRef untuk auto-focus ke search input
  const searchInputRef = useRef(null);
  
  // useRef untuk debounce timeout
  const debounceTimeoutRef = useRef(null);
  
  // useRef untuk menyimpan nilai search sebelumnya (untuk tracking)
  const prevSearchRef = useRef("");

  // Auto-focus ke search input saat halaman dimuat
  useEffect(() => {
    // Fokus ke input search setelah komponen render
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      console.log("🔍 Search input auto-focused");
    }
  }, []); // Empty dependency = hanya sekali saat mount

  // Fungsi filter dengan debounce menggunakan useRef
  const handleSearchChange = (value) => {
    setSearch(value);
    
    // Clear timeout sebelumnya
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      console.log("⏰ Previous debounce cleared");
    }

    // Set timeout baru (delay 500ms)
    debounceTimeoutRef.current = setTimeout(() => {
      console.log(`🔎 Searching for: "${value}"`);
      applyFilters(value, statusFilter);
    }, 500);
  };

  // Fungsi filter status (langsung, tanpa debounce)
  const handleStatusChange = (value) => {
    setStatusFilter(value);
    applyFilters(search, value);
  };

  // Fungsi filter utama
  const applyFilters = (searchTerm, status) => {
    const filtered = ordersData.filter((order) => {
      const matchesSearch = 
        order.namaPelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = status === "Semua Status" || order.status === status;
      return matchesSearch && matchesStatus;
    });
    
    setFilteredOrders(filtered);
    
    // Simpan nilai search untuk tracking
    prevSearchRef.current = searchTerm;
  };

  // useEffect untuk tracking perubahan filter (opsional)
  useEffect(() => {
    console.log(`📊 Showing ${filteredOrders.length} orders`);
  }, [filteredOrders]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Order Management"
          subtitle="Riwayat pesanan pelanggan Papi Coffee"
          breadcrumb="Order Management"
        />

        <div className="flex items-center gap-3">
          <Button type="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Order
          </Button>
          <Button type="outline" className="flex items-center gap-2">
            More Action
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Order" value={totalOrders} icon={ShoppingCart} trend="7 hari terakhir" color="coffee" />
        <StatCard label="Order Dibuat" value={dibuatCount} icon={ShoppingCart} trend={`${Math.round((dibuatCount / totalOrders) * 100)}% dari total`} color="blue" />
        <StatCard label="Menunggu" value={menungguCount} icon={ShoppingCart} trend={`${Math.round((menungguCount / totalOrders) * 100)}% dari total`} color="amber" />
        <StatCard label="Selesai" value={selesaiCount} icon={ShoppingCart} trend={`${Math.round((selesaiCount / totalOrders) * 100)}% dari total`} color="green" />
      </div>

      <Card padding="p-0" className="overflow-hidden">
        <div className="flex items-center gap-2 px-6 pt-6 flex-wrap">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleStatusChange(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === tab
                  ? "bg-coffee-800 text-white"
                  : "bg-coffee-50 text-coffee-700 hover:bg-coffee-100"
              }`}
            >
              {tab}
              {tab !== "Semua Status" && (
                <span className="ml-1.5 opacity-75">
                  ({tab === "Dibuat" ? dibuatCount : tab === "Menunggu" ? menungguCount : selesaiCount})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 px-6 pt-4 pb-6">
          <SearchInput
            ref={searchInputRef} // ← useRef di sini!
            placeholder="Cari order ID, nama pelanggan..."
            value={search}
            onChange={handleSearchChange} // ← pake fungsi debounce
          />

          {/* Informasi jumlah hasil filter */}
          <span className="text-sm text-coffee-500 bg-coffee-100 px-3 py-1.5 rounded-full whitespace-nowrap">
            {filteredOrders.length} order ditemukan
          </span>
        </div>

        <OrderTable orders={filteredOrders} />

        <div className="flex items-center justify-between px-6 py-4 border-t border-coffee-100">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-coffee-500 border border-coffee-200 rounded-lg hover:bg-coffee-50 transition-all">
            ← Previous
          </button>
          <span className="text-sm text-coffee-500">Halaman 1 dari 1</span>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-coffee-500 border border-coffee-200 rounded-lg hover:bg-coffee-50 transition-all">
            Next →
          </button>
        </div>
      </Card>
    </div>
  );
}