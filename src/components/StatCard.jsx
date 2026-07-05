// src/components/StatCard.jsx
export default function StatCard({ label, value, icon: Icon, trend, trendUp = true, color = "amber" }) {
  const colors = {
    amber: { bg: "bg-amber-50", text: "text-amber-600", iconBg: "bg-amber-50" },
    green: { bg: "bg-green-50", text: "text-green-600", iconBg: "bg-green-50" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", iconBg: "bg-blue-50" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", iconBg: "bg-purple-50" },
    red: { bg: "bg-red-50", text: "text-red-600", iconBg: "bg-red-50" },
    gray: { bg: "bg-coffee-50", text: "text-coffee-500", iconBg: "bg-coffee-50" },
    coffee: { bg: "bg-coffee-50", text: "text-coffee-700", iconBg: "bg-coffee-50" },
  };

  return (
    <div className="bg-white rounded-xl border border-coffee-300 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-coffee-800">{value}</h3>
          {trend && (
            <p className={`text-xs mt-1 ${trendUp ? "text-green-600" : "text-red-600"}`}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${colors[color].iconBg} rounded-lg flex items-center justify-center`}>
          {Icon && <Icon className={`w-6 h-6 ${colors[color].text}`} />}
        </div>
      </div>
    </div>
  );
}