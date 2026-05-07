import { Clock, User, Coffee } from "lucide-react";

// Hapus interface QueueItem dan QueueCardProps

export default function QueueCard({ order }) {
  const statusConfig = {
    Menunggu: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      dot: "bg-yellow-500",
    },
    Dibuat: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      dot: "bg-blue-500",
    },
    Selesai: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      dot: "bg-green-500",
    },
  };

  const config = statusConfig[order.status] || statusConfig.Menunggu;

  return (
    <div className={`${config.bg} ${config.border} border rounded-xl p-4`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${config.dot} rounded-full animate-pulse`}></div>
          <h4 className="font-semibold text-gray-900">{order.id}</h4>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.text}`}>
          {order.status}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <User className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{order.namaPelanggan}</span>
        </div>

        <div className="flex items-start gap-2 text-sm text-gray-700">
          <Coffee className="w-4 h-4 text-gray-400 mt-0.5" />
          <div>
            {order.items.map((item, idx) => (
              <div key={idx} className="text-sm">
                {item.qty}x {item.menu}
                {item.tingkatGula !== "-" && (
                  <span className="text-xs text-gray-500 ml-1">({item.tingkatGula})</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span>
            {new Date(order.waktuPesan).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}