// src/pages/OrdersPage.jsx
import { useState, useRef, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import OrderTable from "../components/OrderTable";
import Card from "../components/Card";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [filteredOrders, setFilteredOrders] = useState(ordersData);
  
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
      <PageHeader 
        title="Order History" 
        subtitle="Riwayat pesanan pelanggan Papi Coffee" 
        breadcrumb="Order History" 
      />

      <Card>
        <div className="flex items-center gap-4 mb-6">
          <SearchInput 
            ref={searchInputRef} // ← useRef di sini!
            placeholder="Cari order ID, nama pelanggan..." 
            value={search} 
            onChange={handleSearchChange} // ← pake fungsi debounce
          />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option>Semua Status</option>
            <option>Selesai</option>
            <option>Dibuat</option>
            <option>Menunggu</option>
          </select>
          
          {/* Informasi jumlah hasil filter */}
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full ml-auto">
            {filteredOrders.length} order ditemukan
          </span>
        </div>
        <OrderTable orders={filteredOrders} />
      </Card>
    </div>
  );
}