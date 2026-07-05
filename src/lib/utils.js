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

// Warna tier dibuat soft/pastel (bg-*-50, border-*-200) mengikuti gaya badge Dealport
// (Order Management & Customer Details: status pill selalu pastel lembut, bukan solid).
// Tetap 3 warna beda per tier karena ini semantik (perak/emas/platinum), sama seperti
// aturan Badge status (hijau/merah/kuning) yang sudah disepakati sebelumnya.
export function tierClassName(tier) {
  const styles = {
    Silver: "text-slate-600 bg-slate-50 border-slate-200",
    Gold: "text-amber-600 bg-amber-50 border-amber-200",
    Platinum: "text-sky-600 bg-sky-50 border-sky-200",
  };

  // fallback dibuat pakai token brand (coffee), bukan gray generik,
  // karena kondisi ini cuma kepakai kalau tier tidak dikenali
  return styles[tier] ?? "text-coffee-700 bg-coffee-100 border-coffee-200";
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