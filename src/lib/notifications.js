// src/lib/notifications.js
// Helper untuk UC06 (Promo Ulang Tahun) & UC13 (Notifikasi Promo).
// Dihitung dari tanggal hari ini (real time), dibandingkan ke kolom
// birth_date (format "YYYY-MM-DD") di tabel `members` Supabase — tahun
// diabaikan, yang dipakai cuma bulan & tanggal.

function startOfDay(d) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/**
 * Hitung berapa hari lagi sampai ulang tahun member berikutnya.
 * Return 0 kalau hari ini persis ulang tahunnya.
 */
export function daysUntilBirthday(birthDate, today = new Date()) {
  if (!birthDate) return null;
  const [, month, day] = birthDate.split("-").map(Number);
  const todayStart = startOfDay(today);
  const year = todayStart.getFullYear();

  let nextBirthday = new Date(year, month - 1, day);
  nextBirthday = startOfDay(nextBirthday);

  if (nextBirthday < todayStart) {
    nextBirthday = new Date(year + 1, month - 1, day);
  }

  const diffMs = nextBirthday.getTime() - todayStart.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Ambil daftar member yang ulang tahunnya hari ini atau dalam
 * `daysAhead` hari ke depan, diurutkan dari yang paling dekat.
 */
export function getUpcomingBirthdays(members, daysAhead = 7, today = new Date()) {
  return members
    .map((m) => ({
      ...m,
      daysUntil: daysUntilBirthday(m.birth_date, today),
    }))
    .filter((m) => m.daysUntil !== null && m.daysUntil <= daysAhead)
    .sort((a, b) => a.daysUntil - b.daysUntil);
}

export function formatBirthdayLabel(daysUntil) {
  if (daysUntil === 0) return "Hari ini!";
  if (daysUntil === 1) return "Besok";
  return `${daysUntil} hari lagi`;
}