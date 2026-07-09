// src/pages/ProfilePage.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Calendar, Award, Gift, ShoppingBag, Coffee, LogOut, CheckCircle2, Cake, Loader2 } from "lucide-react";
// Riwayat transaksi sekarang diambil dari tabel `transactions` Supabase
// lewat useTransactions() (Fase 3), bukan dari data/orders.json lagi.
// Catatan: OrdersPage.jsx saat ini masih menyimpan memberId sebagai null
// karena belum ada pemilihan member di form order, jadi "Riwayat Transaksi
// Saya" di bawah baru akan terisi setelah form order dilengkapi fitur
// pilih member (di luar cakupan Fase 3 migrasi database ini).
import { useTransactions } from "../hooks/useTransactions";
import { useMembers } from "../hooks/useMembers";
import { updateMember } from "../services/membersAPI";
import { getLoyaltyTier, nextTierProgress, tierClassName } from "../lib/utils";
import { daysUntilBirthday, formatBirthdayLabel } from "../lib/notifications";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import StatCard from "../components/StatCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const REWARDS = [
  { nama: "Minuman Gratis", poin: 50, icon: "☕", desc: "1x minuman pilihan (max Rp 35.000)" },
  { nama: "Gratis Snack", poin: 30, icon: "🍰", desc: "1x snack atau dessert pilihan" },
  { nama: "Voucher Diskon", poin: 100, icon: "💳", desc: "Voucher diskon 20% untuk 3 transaksi" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  // Data member sekarang diambil dari tabel `members` Supabase lewat
  // useMembers, bukan dari localMembers.js (json + localStorage) lagi.
  const { members, loading: loadingMembers, error: errorMembers, reload } = useMembers();
  const { transactions, loading: loadingTransactions, error: errorTransactions } = useTransactions();

  const loading = loadingMembers || loadingTransactions;
  const error = errorMembers || errorTransactions;

  const [redeemHistory, setRedeemHistory] = useState([]);
  const [confirmReward, setConfirmReward] = useState(null);
  const [justRedeemed, setJustRedeemed] = useState(null);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemError, setRedeemError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setAccount(JSON.parse(saved));
  }, []);

  const memberRecord = useMemo(() => {
    if (!account?.email) return null;
    return members.find(
      (m) => m.email?.toLowerCase() === account.email.toLowerCase()
    );
  }, [account, members]);

  const myOrders = useMemo(() => {
    if (!memberRecord) return [];
    return transactions
      .filter((o) => o.memberId === memberRecord.id)
      .sort((a, b) => new Date(b.waktuPesan) - new Date(a.waktuPesan));
  }, [memberRecord, transactions]);

  // Poin langsung dari database (total_points), bukan lagi dikurangi
  // secara lokal — penukaran reward sekarang beneran update ke Supabase.
  const poin = memberRecord?.total_points ?? 0;
  const tier = getLoyaltyTier(poin);
  const progress = nextTierProgress(poin);

  // UC06: cek apakah member ini lagi/mau ulang tahun dalam 7 hari ke depan
  const birthdayDaysUntil = memberRecord ? daysUntilBirthday(memberRecord.birth_date) : null;
  const showBirthdayPromo = birthdayDaysUntil !== null && birthdayDaysUntil <= 7;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleConfirmRedeem = async () => {
    if (!confirmReward || !memberRecord) return;
    setRedeeming(true);
    setRedeemError("");
    try {
      // Poin dipotong beneran di tabel `members` Supabase (UC04:
      // "Sistem memotong poin sesuai reward dan mencatat riwayat
      // penukaran"). Riwayat penukarannya sendiri masih disimpan di
      // state lokal karena belum ada tabel khusus riwayat redeem.
      await updateMember(memberRecord.id, {
        total_points: Math.max(0, poin - confirmReward.poin),
      });
      await reload();

      setRedeemHistory((prev) => [
        { ...confirmReward, tanggal: new Date().toISOString(), kode: `RDM${Math.floor(Math.random() * 90000 + 10000)}` },
        ...prev,
      ]);
      setJustRedeemed(confirmReward.nama);
      setConfirmReward(null);
      setTimeout(() => setJustRedeemed(null), 4000);
    } catch {
      setRedeemError("Gagal menukar poin. Coba lagi.");
    } finally {
      setRedeeming(false);
    }
  };

  if (!account) {
    return (
      <div className="p-6">
        <Card>
          <p className="text-sm text-coffee-600">
            Data akun tidak ditemukan. Silakan{" "}
            <button className="text-coffee-600 underline" onClick={() => navigate("/login")}>
              login
            </button>{" "}
            kembali.
          </p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center gap-2 text-sm text-coffee-500 h-64">
        <Loader2 className="w-4 h-4 animate-spin" />
        Memuat data profile dari database...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Profile Saya" subtitle="Info akun, poin, dan reward kamu" breadcrumb="Profile" />

      {justRedeemed && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Berhasil tukar poin untuk <span className="font-medium">{justRedeemed}</span>. Tunjukkan kode ke kasir ya.
        </div>
      )}

      {redeemError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {redeemError}
        </div>
      )}

      {/* Kartu identitas akun */}
      <Card>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={account.full_name} size="lg" />
            <div>
              <h3 className="text-lg font-semibold text-coffee-900">{account.full_name || "-"}</h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-coffee-500">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {account.email || "-"}
                </span>
                {memberRecord?.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {memberRecord.phone}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <Badge type="info">{account.role || "member"}</Badge>
                {memberRecord && <Badge type="default">{memberRecord.segment}</Badge>}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </Card>

      {memberRecord && showBirthdayPromo && (
        <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
            <Cake className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-amber-900">
              {birthdayDaysUntil === 0
                ? `Selamat ulang tahun, ${memberRecord.name.split(" ")[0]}! 🎉`
                : `Ulang tahunmu ${formatBirthdayLabel(birthdayDaysUntil).toLowerCase()}!`}
            </p>
            <p className="text-sm text-amber-700 mt-0.5">
              Nikmati promo spesial ulang tahun: diskon 20% untuk semua menu, berlaku 3 hari sekitar tanggal lahirmu. Tunjukkan halaman ini ke kasir ya ☕
            </p>
          </div>
        </div>
      )}

      {!memberRecord && (
        <Card>
          <p className="text-sm text-coffee-600">
            Belum ada riwayat transaksi member yang tercatat untuk akun ini. Poin dan riwayat akan
            muncul di sini setelah transaksi pertama kamu tercatat sebagai member Papi Coffee.
          </p>
        </Card>
      )}

      {memberRecord && (
        <>
          {/* Ringkasan poin & tier */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <h3 className="font-semibold text-coffee-900 mb-3">Loyalty Saya</h3>
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
                  <div className="space-y-2">
                    <p className="text-sm text-coffee-700">
                      {progress.pointsNeeded > 0
                        ? `${progress.pointsNeeded} poin lagi ke ${progress.nextTier}`
                        : `Siap naik ke ${progress.nextTier}`}
                    </p>
                    <div className="w-full h-2 rounded-full bg-white/80 overflow-hidden">
                      <div className="h-full rounded-full bg-current" style={{ width: `${progress.progress}%` }} />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-coffee-700">Tier tertinggi. Selamat! 🎉</p>
                )}
              </div>
            </Card>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Total Transaksi"
                value={`Rp ${(memberRecord.total_transactions || 0).toLocaleString("id-ID")}`}
                icon={ShoppingBag}
                color="amber"
              />
              <StatCard label="Jumlah Kunjungan" value={memberRecord.visit_count || 0} icon={Calendar} color="blue" />
              <StatCard label="Menu Favorit" value={memberRecord.favorite_menu || "-"} icon={Coffee} color="green" />
            </div>
          </div>

          {/* Riwayat transaksi milik akun ini */}
          <Card padding="p-0" className="overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <h3 className="font-semibold text-coffee-900">Riwayat Transaksi Saya</h3>
              <p className="text-xs text-coffee-400 mt-1">
                Menampilkan transaksi kamu dari data terbaru yang tersimpan di sistem.
              </p>
            </div>
            {myOrders.length === 0 ? (
              <p className="px-6 pb-6 text-sm text-coffee-500">Belum ada transaksi pada rentang data terbaru.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-coffee-50 border-b border-coffee-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Menu</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-coffee-100">
                    {myOrders.slice(0, 10).map((order) => (
                      <tr key={order.id} className="hover:bg-coffee-50">
                        <td className="px-4 py-3 text-sm font-medium text-coffee-900">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-coffee-600">
                          {order.items?.slice(0, 2).map((item, idx) => (
                            <div key={idx}>{item.qty}x {item.menu}</div>
                          ))}
                          {order.items?.length > 2 && <div className="text-xs">+{order.items.length - 2} lainnya</div>}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-coffee-900">
                          Rp {order.totalHarga?.toLocaleString("id-ID")}
                        </td>
                        <td className="px-4 py-3 text-sm text-coffee-600">
                          {new Date(order.waktuPesan).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Reward yang bisa ditukar (UC04) */}
          <Card>
            <h3 className="font-semibold text-coffee-900 mb-4">Reward yang Bisa Ditukar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {REWARDS.map((r) => {
                const eligible = poin >= r.poin;
                return (
                  <div
                    key={r.nama}
                    className={`border rounded-lg p-4 transition-all flex flex-col ${
                      eligible ? "border-coffee-300 bg-coffee-50/40" : "border-coffee-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-coffee-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">{r.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-coffee-900">{r.nama}</h4>
                        <p className="text-xs text-coffee-600">{r.poin} poin</p>
                      </div>
                    </div>
                    <p className="text-sm text-coffee-600 mb-3 flex-1">{r.desc}</p>
                    {eligible ? (
                      <button
                        onClick={() => setConfirmReward(r)}
                        className="flex items-center justify-center gap-1.5 text-sm font-medium bg-coffee-800 hover:bg-coffee-900 text-white rounded-lg px-3 py-2 transition-all"
                      >
                        <Gift className="w-3.5 h-3.5" /> Tukar Sekarang
                      </button>
                    ) : (
                      <Badge type="default">{`Butuh ${r.poin - poin} poin lagi`}</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Riwayat penukaran reward */}
          {redeemHistory.length > 0 && (
            <Card>
              <h3 className="font-semibold text-coffee-900 mb-4">Riwayat Penukaran Reward</h3>
              <div className="space-y-2">
                {redeemHistory.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between border border-coffee-100 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{h.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-coffee-900">{h.nama}</p>
                        <p className="text-xs text-coffee-500">
                          Kode: {h.kode} • {new Date(h.tanggal).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                    <Badge type="success">-{h.poin} poin</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Dialog konfirmasi tukar poin */}
      <Dialog open={!!confirmReward} onOpenChange={(open) => !open && setConfirmReward(null)}>
        <DialogContent className="sm:max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-coffee-600" />
              Konfirmasi Tukar Poin
            </DialogTitle>
          </DialogHeader>
          {confirmReward && (
            <div className="space-y-4">
              <div className="bg-coffee-50 rounded-lg p-4 flex items-center gap-3">
                <span className="text-2xl">{confirmReward.icon}</span>
                <div>
                  <p className="font-medium text-coffee-900">{confirmReward.nama}</p>
                  <p className="text-xs text-coffee-600">{confirmReward.desc}</p>
                </div>
              </div>
              <p className="text-sm text-coffee-700">
                Poin kamu akan berkurang <span className="font-semibold">{confirmReward.poin} poin</span>, dari{" "}
                <span className="font-semibold">{poin}</span> jadi{" "}
                <span className="font-semibold">{poin - confirmReward.poin}</span>. Lanjutkan?
              </p>
              <DialogFooter>
                <button
                  onClick={() => setConfirmReward(null)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium border border-coffee-300 text-coffee-700 hover:bg-coffee-50 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmRedeem}
                  disabled={redeeming}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium bg-coffee-800 hover:bg-coffee-900 text-white transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {redeeming && <Loader2 className="w-4 h-4 animate-spin" />}
                  Ya, Tukar Poin
                </button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}