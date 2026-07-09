// src/pages/DashboardPage.jsx
import { Link } from "react-router-dom";
import { Users, TrendingUp, ShoppingCart, Award, Coffee, ChevronRight, Plus } from "lucide-react";
import StatCard from "../components/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useTransactions } from "../hooks/useTransactions";
import summary from "../data/dashboardSummary.json";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";

const salesData = [
  { day: "Sen", penjualan: 1200000 },
  { day: "Sel", penjualan: 950000 },
  { day: "Rab", penjualan: 1450000 },
  { day: "Kam", penjualan: 1100000 },
  { day: "Jum", penjualan: 1800000 },
  { day: "Sab", penjualan: 2300000 },
  { day: "Min", penjualan: 2100000 },
];

const trendData = [
  { week: "W1", orders: 45 },
  { week: "W2", orders: 52 },
  { week: "W3", orders: 48 },
  { week: "W4", orders: 61 },
];

const statusColors = {
  Selesai: "success",
  Dibuat: "info",
  Menunggu: "warning",
};

export default function DashboardPage() {
  // Tabel "Transaksi Terbaru" sekarang ambil dari Supabase (tabel `transactions`)
  // lewat useTransactions(), bukan orders.json lagi.
  const { transactions } = useTransactions();

  // Angka ringkasan (total penjualan, total order, member, poin, menu terlaris, dst)
  // dihitung dari SELURUH data Excel (bukan dari tabel `transactions` yang datanya
  // baru mulai terisi dari input aplikasi), supaya selalu sama persis dengan angka
  // yang muncul di Power BI. Ini TIDAK diganti, tetap dari dashboardSummary.json.
  const totalMembers = summary.totalMember;
  const totalPoin = summary.totalPoin;
  const totalPenjualan = summary.totalPenjualan;
  const totalOrder = summary.totalOrder;
  const dibuatCount = summary.dibuatCount;
  const menungguCount = summary.menungguCount;
  const todayOrders = summary.pesananPadaTanggalTerakhir;
  const topMenu = summary.topMenu ? [summary.topMenu.menu, summary.topMenu.qty] : null;

  const topCategories = summary.categorySales
    .slice(0, 3)
    .map((c) => [c.kategori, c.total]);
  const maxCategorySales = Math.max(...summary.categorySales.map((c) => c.total), 1);

  // Tabel "Transaksi Terbaru" nampilin 5 transaksi paling baru dari database
  // (tabel `transactions` masih kosong/sedikit di awal karena baru mulai diisi
  // dari OrdersPage.jsx, beda dengan orders.json lama yang sudah ada 400 baris
  // data dummy dari Excel).
  const recentOrders = [...transactions]
    .sort((a, b) => new Date(b.waktuPesan) - new Date(a.waktuPesan))
    .slice(0, 5);

  const bestSellingMenu = summary.bestSellingMenu;

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Dashboard" subtitle="Ringkasan data CRM Papi Coffee" breadcrumb="Dashboard" />

      {/* Row 1: kartu ringkasan utama, ala Total Sales / Total Orders / Pending & Canceled di template */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <p className="text-sm text-muted mb-1">Total Penjualan</p>
          <p className="text-xs text-coffee-400 mb-3">Sepanjang data tercatat</p>
          <h3 className="text-2xl font-bold text-coffee-900 mb-3">Rp {totalPenjualan.toLocaleString("id-ID")}</h3>
          <Link to="/orders" className="inline-flex items-center gap-1 text-xs font-medium text-coffee-700 border border-coffee-300 rounded-full px-3 py-1.5 hover:bg-coffee-50 transition-all">
            Detail <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card>
          <p className="text-sm text-muted mb-1">Total Order</p>
          <p className="text-xs text-coffee-400 mb-3">Semua status order</p>
          <h3 className="text-2xl font-bold text-coffee-900 mb-3">{totalOrder} order</h3>
          <Link to="/orders" className="inline-flex items-center gap-1 text-xs font-medium text-coffee-700 border border-coffee-300 rounded-full px-3 py-1.5 hover:bg-coffee-50 transition-all">
            Detail <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card>
          <p className="text-sm text-muted mb-3">Dibuat &amp; Menunggu</p>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-coffee-400">Dibuat</p>
              <p className="text-xl font-bold text-coffee-900">{dibuatCount}</p>
            </div>
            <div>
              <p className="text-xs text-coffee-400">Menunggu</p>
              <p className="text-xl font-bold text-coffee-600">{menungguCount}</p>
            </div>
          </div>
          <Link to="/orders" className="inline-flex items-center gap-1 text-xs font-medium text-coffee-700 border border-coffee-300 rounded-full px-3 py-1.5 hover:bg-coffee-50 transition-all">
            Detail <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </Card>
      </div>

      {/* Row 2: statcard kecil tambahan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Member" value={totalMembers} icon={Users} trend="+12% dari bulan lalu" trendUp={true} color="blue" />
        <StatCard label="Poin Aktif" value={totalPoin.toLocaleString("id-ID")} icon={Award} trend="+8% dari bulan lalu" trendUp={true} color="amber" />
        <StatCard label="Pesanan Hari Terakhir" value={todayOrders} icon={ShoppingCart} trend={`Data per ${summary.tanggalDataTerakhir}`} trendUp={true} color="green" />
        <StatCard label="Menu Favorit" value={topMenu ? topMenu[0] : "-"} icon={TrendingUp} trend={`${topMenu ? topMenu[1] : 0} pesanan`} trendUp={true} color="purple" />
      </div>

      {/* Row 3: grafik + panel kanan (member aktif & penjualan per kategori, ala "Users in last 30 minutes" + "Sales by Country") */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-coffee-900">Laporan Minggu Ini</h3>
            <div className="flex items-center gap-1 bg-coffee-50 rounded-full p-1">
              <button className="px-3 py-1 text-xs font-medium rounded-full bg-white text-coffee-900 shadow-sm">Minggu ini</button>
              <button className="px-3 py-1 text-xs font-medium rounded-full text-coffee-500">Minggu lalu</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`} />
              <Bar dataKey="penjualan" fill="#d97706" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold text-coffee-900 mb-1">Member Aktif</h3>
          <p className="text-xs text-coffee-400 mb-3">Total member terdaftar</p>
          <h4 className="text-2xl font-bold text-coffee-900 mb-3">{totalMembers}</h4>
          <ResponsiveContainer width="100%" height={60}>
            <BarChart data={trendData}>
              <Bar dataKey="orders" fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 pt-4 border-t border-coffee-100">
            <p className="text-xs font-semibold text-coffee-500 uppercase mb-3">Penjualan per Kategori</p>
            <div className="space-y-3">
              {topCategories.map(([cat, value]) => (
                <div key={cat}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-coffee-700 font-medium">{cat}</span>
                    <span className="text-coffee-500">Rp {value.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="w-full h-1.5 bg-coffee-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-coffee-600 rounded-full"
                      style={{ width: `${(value / maxCategorySales) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Row 4: transaksi terbaru + menu terlaris (sidebar), ala Transaction table + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding="p-0" className="lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h3 className="font-semibold text-coffee-900">Transaksi Terbaru</h3>
            <Link to="/orders" className="text-xs font-medium text-coffee-700 hover:underline">Lihat semua</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-coffee-50 border-b border-coffee-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Pelanggan</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-100">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-sm text-coffee-400">
                      Belum ada transaksi.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-coffee-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-coffee-900">{order.id}</td>
                      <td className="px-4 py-3 text-sm text-coffee-700">{order.namaPelanggan}</td>
                      <td className="px-4 py-3">
                        <Badge type={statusColors[order.status] || "default"}>{order.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-coffee-900">Rp {order.totalHarga?.toLocaleString("id-ID")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-coffee-900">Menu Terlaris</h3>
            <Link to="/products" className="text-xs font-medium text-coffee-700 hover:underline">Semua menu</Link>
          </div>
          <div className="space-y-3">
            {bestSellingMenu.map((item) => (
              <div key={item.menu} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-coffee-50 flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-5 h-5 text-coffee-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-coffee-900 truncate">{item.menu}</p>
                  <p className="text-xs text-coffee-400">{item.qty}x terjual</p>
                </div>
                <p className="text-sm font-semibold text-coffee-900 whitespace-nowrap">Rp {item.price.toLocaleString("id-ID")}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 5: tabel menu terlaris lengkap + panel tambah menu baru, ala Best selling product + Add New Product */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card padding="p-0" className="lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h3 className="font-semibold text-coffee-900">Best Selling Menu</h3>
            <Link to="/products" className="text-xs font-medium text-coffee-700 hover:underline">Detail</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-coffee-50 border-b border-coffee-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Menu</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Total Terjual</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Status Stok</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Harga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-100">
                {bestSellingMenu.map((item) => (
                  <tr key={item.menu} className="hover:bg-coffee-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-coffee-900">{item.menu}</td>
                    <td className="px-4 py-3 text-sm text-coffee-700">{item.qty}x</td>
                    <td className="px-4 py-3">
                      <Badge type={item.stock === 0 ? "danger" : item.stock <= 5 ? "warning" : "success"}>
                        {item.stock === 0 ? "Habis" : "Tersedia"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-coffee-900">Rp {item.price.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-coffee-900">Tambah Menu Baru</h3>
            <Link to="/products" className="w-7 h-7 rounded-full bg-coffee-800 text-white flex items-center justify-center hover:bg-coffee-900 transition-all">
              <Plus className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-coffee-500 mb-3">Kategori</p>
          <div className="space-y-2">
            {["Kopi Susu", "Non Coffee", "Snack"].map((cat) => (
              <Link
                key={cat}
                to="/products"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-coffee-100 hover:border-coffee-300 transition-all text-sm text-coffee-700"
              >
                <span className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-coffee-400" />
                  {cat}
                </span>
                <ChevronRight className="w-4 h-4 text-coffee-300" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}