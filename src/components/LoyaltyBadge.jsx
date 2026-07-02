import { Award, Coffee, Gift } from "lucide-react";
import { getLoyaltyTier, nextTierProgress, tierClassName } from "../lib/utils";

export default function LoyaltyBadge({ poin = 0 }) {
  const tier = getLoyaltyTier(poin);
  const progress = nextTierProgress(poin);

  return (
    <div className={`rounded-xl border p-4 ${tierClassName(tier)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          <span className="font-bold">{tier}</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Coffee className="w-4 h-4" />
          <span>{poin} poin</span>
        </div>
      </div>

      {progress ? (
        <div className="space-y-3">
          <div className="text-sm text-slate-700">
            {progress.pointsNeeded > 0
              ? `${progress.pointsNeeded} poin lagi ke ${progress.nextTier}`
              : `Siap naik ke ${progress.nextTier}`}
          </div>
          <div className="w-full h-2 rounded-full bg-white/80 overflow-hidden">
            <div className="h-full rounded-full bg-current" style={{ width: `${progress.progress}%` }} />
          </div>
          <p className="text-xs text-slate-600">{Math.round(progress.progress)}% progress ke {progress.nextTier}</p>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-700">
          <Gift className="w-4 h-4" />
          <span>Tier tertinggi. Selamat!</span>
        </div>
      )}
    </div>
  );
}
