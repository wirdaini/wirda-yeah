// src/pages/QueuePage.jsx
import { useState, useEffect, useRef } from "react";
import { fetchTransactions } from "../services/transactionsAPI";
import PageHeader from "../components/PageHeader";
import QueueSection from "../components/QueueSection";

export default function QueuePage() {
  const [orders, setOrders] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const intervalRef = useRef(null); // useRef untuk tracking interval

  // useEffect untuk auto-refresh queue setiap 10 detik.
  // Sebelumnya (waktu masih pakai orders.json) status diacak random cuma
  // buat simulasi demo. Sekarang datanya beneran diambil ulang dari tabel
  // `transactions` Supabase, jadi kalau kasir update status di OrdersPage,
  // halaman antrian ini otomatis ikut berubah dalam 10 detik tanpa refresh
  // manual.
  useEffect(() => {
    const refreshQueue = () => {
      fetchTransactions()
        .then((data) => {
          setOrders(data);
          setLastUpdated(new Date());
        })
        .catch(() => {
          // Gagal refresh gak perlu bikin halaman error total, biarin data
          // lama tetap tampil sampai refresh berikutnya berhasil.
        });
    };

    // Jalankan pertama kali saat komponen mount
    refreshQueue();

    // Setup interval untuk refresh setiap 10 detik
    intervalRef.current = setInterval(refreshQueue, 10000);

    // CLEANUP: Hentikan interval saat komponen unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Dependency array kosong = hanya setup interval sekali saat mount

  // useEffect kedua: kasih notifikasi kalau ada order baru
  useEffect(() => {
    const waitingCount = orders.filter(o => o.status === "Menunggu").length;
    const preparingCount = orders.filter(o => o.status === "Dibuat").length;
    
    // Update title dengan jumlah antrian
    document.title = `📋 Antrian (${waitingCount + preparingCount}) - Papi Coffee`;
    
    // Cleanup: reset title saat komponen unmount
    return () => {
      document.title = "Papi Coffee CRM";
    };
  }, [orders]); // Jalan setiap kali orders berubah

  // Filter orders berdasarkan status
  const waitingOrders = orders.filter((o) => o.status === "Menunggu");
  const preparingOrders = orders.filter((o) => o.status === "Dibuat");
  const completedOrders = orders.filter((o) => o.status === "Selesai");

  // Format waktu terakhir update
  const formattedTime = lastUpdated.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Antrian Pesanan" 
          subtitle="Monitor live queue pesanan real-time" 
          breadcrumb="Antrian Pesanan" 
        />
        <div className="text-sm text-coffee-500 bg-coffee-100 px-3 py-1 rounded-full">
          🔄 Last update: {formattedTime}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QueueSection
          title="Menunggu"
          orders={waitingOrders}
          statusColor="yellow"
          emptyMessage="Tidak ada pesanan menunggu"
        />
        <QueueSection
          title="Sedang Dibuat"
          orders={preparingOrders}
          statusColor="blue"
          emptyMessage="Tidak ada pesanan dalam proses"
        />
        <QueueSection
          title="Selesai"
          orders={completedOrders}
          statusColor="green"
          emptyMessage="Belum ada pesanan selesai"
          maxDisplay={5}
        />
      </div>
    </div>
  );
}