import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getLoyaltyTier(poin = 0) {
  if (poin >= 500) return "Platinum";
  if (poin >= 200) return "Gold";
  return "Silver";
}

export function tierClassName(tier) {
  const styles = {
    Silver: "text-slate-700 bg-slate-100 border-slate-200",
    Gold: "text-amber-700 bg-amber-100 border-amber-200",
    Platinum: "text-sky-700 bg-sky-100 border-sky-200",
  };

  return styles[tier] ?? "text-gray-700 bg-gray-100 border-gray-200";
}

export function nextTierProgress(poin = 0) {
  const normalizedPoints = Math.max(0, poin);
  const tier = getLoyaltyTier(normalizedPoints);

  if (tier === "Silver") {
    const threshold = 200;
    return {
      currentTier: "Silver",
      nextTier: "Gold",
      currentPoints: normalizedPoints,
      threshold,
      pointsNeeded: threshold - normalizedPoints,
      progress: Math.min(100, (normalizedPoints / threshold) * 100),
    };
  }

  if (tier === "Gold") {
    const threshold = 500;
    return {
      currentTier: "Gold",
      nextTier: "Platinum",
      currentPoints: normalizedPoints,
      threshold,
      pointsNeeded: threshold - normalizedPoints,
      progress: Math.min(100, ((normalizedPoints - 200) / (threshold - 200)) * 100),
    };
  }

  return null;
}
