export default function LoyaltyBadge({ tier, poin, targetPoin = 50 }) {
  const progress = (poin / targetPoin) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            tier === "VIP"
              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {tier === "VIP" ? "⭐ " : ""}
          {tier}
        </span>
        <span className="text-sm font-semibold text-gray-900">{poin} Poin</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Progress ke reward</span>
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500">
          {poin >= targetPoin
            ? "Poin cukup untuk ditukar!"
            : `${targetPoin - poin} poin lagi untuk reward`}
        </p>
      </div>
    </div>
  );
}