// src/pages/OrdersPage.jsx
import { useState, useRef, useEffect, useMemo } from "react";
import { ShoppingCart, Plus, MoreHorizontal, Trash2, CreditCard, Loader2 } from "lucide-react";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
} from "../services/transactionsAPI";
import { useProducts } from "../hooks/useProducts";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import OrderTable from "../components/OrderTable";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import Button from "../components/Button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const statusTabs = ["Semua Status", "Dibuat", "Menunggu", "Selesai"];
const CHANNELS = ["Dine-in", "Take Away", "Delivery"];
const PAYMENT_METHODS = ["Cash", "Debit", "E-Wallet", "QRIS"];

const emptyItem = { productId: "", varian: "Reg", qty: 1 };

export default function OrdersPage() {
  // productsData dulunya import langsung dari products.json (Fase 2 lama).
  // Sekarang produk juga sudah di Supabase, jadi dipakai lewat useProducts()
  // biar daftar menu di form order selalu sinkron sama tabel `products`.
  const { products: productsData } = useProducts();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  // Dialog buat pesanan baru
  const [formOpen, setFormOpen] = useState(false);
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [channel, setChannel] = useState("Dine-in");
  const [items, setItems] = useState([{ ...emptyItem }]);

  // Dialog proses pembayaran
  const [payOrder, setPayOrder] = useState(null);
  const [payMethod, setPayMethod] = useState("Cash");

  // Ambil data transaksi dari Supabase begitu halaman dibuka
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    setError("");
    fetchTransactions()
      .then((data) => setOrders(data))
      .catch(() => setError("Gagal memuat data transaksi dari database."))
      .finally(() => setLoading(false));
  };

  const totalOrders = orders.length;
  const dibuatCount = orders.filter((o) => o.status === "Dibuat").length;
  const menungguCount = orders.filter((o) => o.status === "Menunggu").length;
  const selesaiCount = orders.filter((o) => o.status === "Selesai").length;

  const searchInputRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus();
  }, []);

  const handleSearchChange = (value) => {
    setSearch(value);
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      // pencarian dijalankan lewat filteredOrders (memo di bawah), ini cuma debounce UX
    }, 300);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // order.id sekarang angka (bigint dari Supabase), bukan string
      // "TRXxxxxx" kayak di orders.json lama, jadi di-String() dulu biar
      // .toLowerCase() gak error.
      const matchesSearch =
        order.namaPelanggan.toLowerCase().includes(search.toLowerCase()) ||
        String(order.id).toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "Semua Status" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // ==== Form Tambah Pesanan (UC01) ====
  const handleAddItemRow = () => setItems((prev) => [...prev, { ...emptyItem }]);
  const handleRemoveItemRow = (idx) =>
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)));

  const handleItemChange = (idx, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const itemsWithPrice = items.map((item) => {
    const product = productsData.find((p) => String(p.id) === String(item.productId));
    const harga = product?.price || 0;
    return { ...item, product, harga, subtotal: harga * Number(item.qty || 0) };
  });

  const formTotal = itemsWithPrice.reduce((sum, i) => sum + i.subtotal, 0);
  const isFormValid =
    namaPelanggan.trim() && itemsWithPrice.every((i) => i.productId && Number(i.qty) > 0);

  const resetForm = () => {
    setNamaPelanggan("");
    setChannel("Dine-in");
    setItems([{ ...emptyItem }]);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // id, waktuSelesai, metodePembayaran, kodePromo gak dikirim manual —
    // id diisi otomatis oleh database, sisanya memang masih kosong sampai
    // pesanan dibayar (lihat handleConfirmPay).
    const newOrder = {
      memberId: null,
      namaPelanggan: namaPelanggan.trim(),
      items: itemsWithPrice.map((i) => ({
        menu: i.product?.title || "-",
        varian: i.varian,
        harga: i.harga,
        qty: Number(i.qty),
      })),
      totalHarga: formTotal,
      status: "Dibuat",
      waktuPesan: new Date().toISOString(),
      channel,
    };

    setSaving(true);
    try {
      const saved = await createTransaction(newOrder);
      setOrders((prev) => [saved, ...prev]);
      resetForm();
      setFormOpen(false);
    } catch {
      alert("Gagal menyimpan pesanan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  // ==== Proses Pembayaran (UC02) ====
  const handleOpenPay = (order) => {
    setPayOrder(order);
    setPayMethod("Cash");
  };

  const handleConfirmPay = async (e) => {
    e.preventDefault();
    if (!payOrder) return;

    const changes = {
      status: "Selesai",
      metodePembayaran: payMethod,
      waktuSelesai: new Date().toISOString(),
    };

    try {
      const updated = await updateTransaction(payOrder.id, changes);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      setPayOrder(null);
    } catch {
      alert("Gagal memproses pembayaran. Coba lagi.");
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-coffee-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent";
  const labelClass = "text-xs font-medium text-coffee-600 mb-1 block";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Order Management"
          subtitle="Riwayat pesanan pelanggan Papi Coffee"
          breadcrumb="Order Management"
        />

        <div className="flex items-center gap-3">
          <Button type="primary" className="flex items-center gap-2" onClick={() => setFormOpen(true)}>
            <Plus className="w-4 h-4" />
            Tambah Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Order" value={totalOrders} icon={ShoppingCart} trend="Semua data" color="coffee" />
        <StatCard label="Order Dibuat" value={dibuatCount} icon={ShoppingCart} trend={`${totalOrders ? Math.round((dibuatCount / totalOrders) * 100) : 0}% dari total`} color="blue" />
        <StatCard label="Menunggu" value={menungguCount} icon={ShoppingCart} trend={`${totalOrders ? Math.round((menungguCount / totalOrders) * 100) : 0}% dari total`} color="amber" />
        <StatCard label="Selesai" value={selesaiCount} icon={ShoppingCart} trend={`${totalOrders ? Math.round((selesaiCount / totalOrders) * 100) : 0}% dari total`} color="green" />
      </div>

      <Card padding="p-0" className="overflow-hidden">
        <div className="flex items-center gap-2 px-6 pt-6 flex-wrap">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
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
            ref={searchInputRef}
            placeholder="Cari order ID, nama pelanggan..."
            value={search}
            onChange={handleSearchChange}
          />
          <span className="text-sm text-coffee-500 bg-coffee-100 px-3 py-1.5 rounded-full whitespace-nowrap">
            {filteredOrders.length} order ditemukan
          </span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-coffee-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Memuat data transaksi...
          </div>
        ) : error ? (
          <div className="px-6 py-12 text-center text-sm text-red-600">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-coffee-500">
            Gak ada order yang cocok.
          </div>
        ) : (
          <OrderTable orders={filteredOrders} onProsesBayar={handleOpenPay} />
        )}
      </Card>

      {/* Dialog Tambah Order (UC01) */}
      <Dialog open={formOpen} onOpenChange={(open) => { setFormOpen(open); if (!open) resetForm(); }}>
        <DialogContent className="sm:max-w-lg bg-white max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-coffee-600" />
              Buat Pesanan Baru
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label className={labelClass}>Nama Pelanggan *</label>
              <input
                type="text"
                required
                value={namaPelanggan}
                onChange={(e) => setNamaPelanggan(e.target.value)}
                className={inputClass}
                placeholder="Nama pelanggan"
              />
            </div>

            <div>
              <label className={labelClass}>Channel</label>
              <select value={channel} onChange={(e) => setChannel(e.target.value)} className={inputClass}>
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelClass}>Item Pesanan *</label>
                <button
                  type="button"
                  onClick={handleAddItemRow}
                  className="text-xs font-medium text-coffee-700 hover:text-coffee-900"
                >
                  + Tambah Item
                </button>
              </div>

              <div className="space-y-3">
                {itemsWithPrice.map((item, idx) => (
                  <div key={idx} className="border border-coffee-200 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <select
                        value={item.productId}
                        onChange={(e) => handleItemChange(idx, "productId", e.target.value)}
                        className={inputClass}
                        required
                      >
                        <option value="">Pilih menu...</option>
                        {productsData.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} — Rp {p.price.toLocaleString("id-ID")}
                          </option>
                        ))}
                      </select>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          className="text-coffee-300 hover:text-red-600 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={item.varian}
                        onChange={(e) => handleItemChange(idx, "varian", e.target.value)}
                        className={inputClass}
                      >
                        <option value="Reg">Reg</option>
                        <option value="Large">Large</option>
                      </select>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                        className={inputClass}
                        placeholder="Qty"
                      />
                    </div>
                    {item.product && (
                      <p className="text-xs text-coffee-500 text-right">
                        Subtotal: Rp {item.subtotal.toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-coffee-50 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm font-medium text-coffee-700">Total Pesanan</span>
              <span className="text-lg font-bold text-coffee-900">Rp {formTotal.toLocaleString("id-ID")}</span>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium border border-coffee-300 text-coffee-700 hover:bg-coffee-50 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!isFormValid || saving}
                className="px-4 py-2.5 rounded-lg text-sm font-medium bg-coffee-800 hover:bg-coffee-900 text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Simpan Pesanan
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Proses Pembayaran (UC02) */}
      <Dialog open={!!payOrder} onOpenChange={(open) => !open && setPayOrder(null)}>
        <DialogContent className="sm:max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-coffee-600" />
              Proses Pembayaran
            </DialogTitle>
          </DialogHeader>

          {payOrder && (
            <form onSubmit={handleConfirmPay} className="space-y-4">
              <div className="bg-coffee-50 rounded-lg p-3 space-y-1">
                <p className="text-sm text-coffee-700">Order <span className="font-medium">{payOrder.id}</span></p>
                <p className="text-sm text-coffee-700">{payOrder.namaPelanggan}</p>
                <p className="text-lg font-bold text-coffee-900">Rp {payOrder.totalHarga?.toLocaleString("id-ID")}</p>
              </div>

              <div>
                <label className={labelClass}>Metode Pembayaran</label>
                <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)} className={inputClass}>
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <DialogFooter>
                <button
                  type="button"
                  onClick={() => setPayOrder(null)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium border border-coffee-300 text-coffee-700 hover:bg-coffee-50 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700 text-white transition-all shadow-sm"
                >
                  Konfirmasi Bayar
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}