import QueueCard from "../components/QueueCard";
import ordersData from "../data/orders.json";
import { Clock, Coffee, CheckCircle } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function QueuePage() {
  const waitingOrders = ordersData.filter((o) => o.status === "Menunggu");
  const preparingOrders = ordersData.filter((o) => o.status === "Dibuat");
  const completedOrders = ordersData.filter((o) => o.status === "Selesai");

  return (
    <div className="p-6 space-y-6">
      
<PageHeader 
  title="Antrian Pesanan" 
  subtitle="Monitor live queue pesanan real-time" 
          breadcrumb="Antrian Pesanan"

/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 mb-1">Menunggu</p>
              <h3 className="text-3xl font-bold text-yellow-900">{waitingOrders.length}</h3>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 mb-1">Sedang Dibuat</p>
              <h3 className="text-3xl font-bold text-blue-900">{preparingOrders.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Coffee className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl border border-green-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 mb-1">Selesai Hari Ini</p>
              <h3 className="text-3xl font-bold text-green-900">{completedOrders.length}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            Menunggu ({waitingOrders.length})
          </h3>
          <div className="space-y-3">
            {waitingOrders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
                Tidak ada pesanan menunggu
              </div>
            ) : (
              waitingOrders.map((order) => <QueueCard key={order.id} order={order} />)
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Sedang Dibuat ({preparingOrders.length})
          </h3>
          <div className="space-y-3">
            {preparingOrders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
                Tidak ada pesanan dalam proses
              </div>
            ) : (
              preparingOrders.map((order) => <QueueCard key={order.id} order={order} />)
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Selesai ({completedOrders.slice(0, 5).length})
          </h3>
          <div className="space-y-3">
            {completedOrders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
                Belum ada pesanan selesai
              </div>
            ) : (
              completedOrders.slice(0, 5).map((order) => <QueueCard key={order.id} order={order} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
