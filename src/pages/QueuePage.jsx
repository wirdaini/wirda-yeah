// src/pages/QueuePage.jsx
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";
import QueueSection from "../components/QueueSection";

export default function QueuePage() {
  const waitingOrders = ordersData.filter((o) => o.status === "Menunggu");
  const preparingOrders = ordersData.filter((o) => o.status === "Dibuat");
  const completedOrders = ordersData.filter((o) => o.status === "Selesai");

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Antrian Pesanan" subtitle="Monitor live queue pesanan real-time" breadcrumb="Antrian Pesanan" />

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