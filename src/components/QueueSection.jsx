// src/components/QueueSection.jsx
import QueueCard from "./QueueCard";

export default function QueueSection({ title, orders, statusColor, emptyMessage, maxDisplay = 10 }) {
  const colors = {
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
  };

  const dotColors = {
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <div className={`w-2 h-2 ${dotColors[statusColor]} rounded-full ${orders.length > 0 ? "animate-pulse" : ""}`}></div>
        {title} ({orders.length})
      </h3>
      <div className="space-y-3">
        {orders.length === 0 ? (
          <div className={`${colors[statusColor]} rounded-xl border p-8 text-center text-sm`}>
            {emptyMessage}
          </div>
        ) : (
          orders.slice(0, maxDisplay).map((order) => <QueueCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}