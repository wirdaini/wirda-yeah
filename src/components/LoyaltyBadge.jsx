// src/components/LoyaltyBadge.jsx (UPDATE)
import { Award, Coffee, Gift } from "lucide-react";

export default function LoyaltyBadge({ tier, poin }) {
  const nextTierNeeded = tier === "Regular" ? 50 - poin : 0;
  
  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-gray-900">{tier}</span>
        </div>
        <div className="flex items-center gap-1">
          <Coffee className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-amber-700">{poin} poin</span>
        </div>
      </div>
      {tier === "Regular" && poin < 50 && (
        <div className="mt-2">
          <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-600 rounded-full" style={{ width: `${(poin / 50) * 100}%` }} />
          </div>
          <p className="text-xs text-amber-700 mt-1">{nextTierNeeded} poin lagi ke VIP</p>
        </div>
      )}
    </div>
  );
}