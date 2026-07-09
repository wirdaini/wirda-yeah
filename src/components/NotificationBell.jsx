// src/components/NotificationBell.jsx
import { useState, useRef, useEffect } from "react";
import { Bell, Cake, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useMembers } from "../hooks/useMembers";
import { getUpcomingBirthdays, formatBirthdayLabel } from "../lib/notifications";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [sentIds, setSentIds] = useState([]);
  const panelRef = useRef(null);

  // Data member sekarang diambil dari tabel `members` Supabase,
  // bukan dari data/members.json lagi.
  const { members, loading } = useMembers();

  const upcoming = getUpcomingBirthdays(members, 7);

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = (memberId) => {
    setSentIds((prev) => [...prev, memberId]);
  };

  const unsentCount = upcoming.filter((m) => !sentIds.includes(m.id)).length;

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 text-coffee-400 hover:text-coffee-700 hover:bg-coffee-50 rounded-lg transition-all"
      >
        <Bell className="w-5 h-5" />
        {unsentCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 flex items-center justify-center text-[10px] font-semibold text-white bg-red-500 rounded-full">
            {unsentCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-coffee-200 shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-coffee-100 flex items-center justify-between">
            <h4 className="font-semibold text-coffee-900 text-sm">Notifikasi Promo Ulang Tahun</h4>
            <span className="text-xs text-coffee-400">7 hari ke depan</span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-coffee-100">
            {loading ? (
              <div className="px-4 py-6 flex items-center justify-center gap-2 text-sm text-coffee-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Memuat data member...
              </div>
            ) : upcoming.length === 0 ? (
              <p className="px-4 py-6 text-sm text-coffee-500 text-center">
                Gak ada member yang ulang tahun dalam 7 hari ke depan.
              </p>
            ) : (
              upcoming.map((m) => {
                const sent = sentIds.includes(m.id);
                return (
                  <div key={m.id} className="px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-coffee-100 flex items-center justify-center shrink-0">
                      <Cake className="w-4 h-4 text-coffee-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-coffee-900 truncate">{m.name}</p>
                      <p className="text-xs text-coffee-500">{formatBirthdayLabel(m.daysUntil)} · {m.tier}</p>
                    </div>
                    {sent ? (
                      <span className="flex items-center gap-1 text-xs text-green-600 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Terkirim
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSend(m.id)}
                        className="flex items-center gap-1 text-xs font-medium text-coffee-700 bg-coffee-100 hover:bg-coffee-200 px-2.5 py-1.5 rounded-lg transition-all shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" /> Kirim
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}