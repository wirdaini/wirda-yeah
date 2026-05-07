export default function StatCard({ label, value, icon: Icon, trend, trendUp }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{value}</h3>
          {trend && (
            <p className={`text-xs font-medium ${trendUp ? "text-green-600" : "text-red-600"}`}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-amber-600" />
        </div>
      </div>
    </div>
  );
}