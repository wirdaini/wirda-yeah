// src/pages/ProfilePage.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Calendar, Award, Gift, ShoppingBag, Coffee, LogOut } from "lucide-react";
import membersData from "../data/members.json";
import ordersData from "../data/orders.json";
import { getLoyaltyTier, nextTierProgress, tierClassName } from "../lib/utils";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import StatCard from "../components/StatCard";

const REWARDS = [
  { nama: "Minuman Gratis", poin: 50, icon: "☕", desc: "1x minuman pilihan (max Rp 35.000)" },
  { nama: "Gratis Snack", poin: 30, icon: "🍰", desc: "1x snack atau dessert pilihan" },
  { nama: "Voucher Diskon", poin: 100, icon: "💳", desc: "Voucher diskon 20% untuk 3 transaksi" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setAccount(JSON.parse(saved));
  }, []);

  // Cocokkan akun login (tabel users di Supabase) dengan data member CRM (dari Excel)
  // lewat email, karena keduanya sumber data yang berbeda dan belum ada relasi id langsung.
  const memberRecord = useMemo(() => {
    if (!account?.email) return null;
    return membersData.find(
      (m) => m.email?.toLowerCase() === account.email.toLowerCase()
    );
  }, [account]);

  const myOrders = useMemo(() => {
    if (!memberRecord) return [];
    return ordersData
      .filter((o) => o.memberId === memberRecord.id)
      .sort((a, b) => new Date(b.waktuPesan) - new Date(a.waktuPesan));
  }, [memberRecord]);

  const poin = memberRecord?.poin ?? 0;
  const tier = getLoyaltyTier(poin);
  const progress = nextTierProgress(poin);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!account) {
    return (
      <div className="p-6">
        <Card>
          <p className="text-sm text-coffee-600">
            Data akun tidak ditemukan. Silakan{" "}
            <button className="text-amber-600 underline" onClick={() => navigate("/login")}>
              login
            </button>{" "}
            kembali.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Profile Saya" subtitle="Info akun, poin, dan reward kamu" breadcrumb="Profile" />

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
                {memberRecord?.noHP && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {memberRecord.noHP}
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <Badge type="info">{account.role || "member"}</Badge>
                {memberRecord && <Badge type="default">{memberRecord.segmen}</Badge>}
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
                value={`Rp ${(memberRecord.totalTransaksi || 0).toLocaleString("id-ID")}`}
                icon={ShoppingBag}
                color="amber"
              />
              <StatCard label="Jumlah Kunjungan" value={memberRecord.jumlahKunjungan || 0} icon={Calendar} color="blue" />
              <StatCard label="Menu Favorit" value={memberRecord.menuFavorit || "-"} icon={Coffee} color="green" />
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

          {/* Reward yang bisa ditukar */}
          <Card>
            <h3 className="font-semibold text-coffee-900 mb-4">Reward yang Bisa Ditukar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {REWARDS.map((r) => {
                const eligible = poin >= r.poin;
                return (
                  <div
                    key={r.nama}
                    className={`border rounded-lg p-4 transition-all ${
                      eligible ? "border-amber-300 bg-amber-50/40" : "border-coffee-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">{r.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-coffee-900">{r.nama}</h4>
                        <p className="text-xs text-coffee-600">{r.poin} poin</p>
                      </div>
                    </div>
                    <p className="text-sm text-coffee-600 mb-3">{r.desc}</p>
                    <Badge type={eligible ? "success" : "default"}>
                      {eligible ? (
                        <span className="flex items-center gap-1">
                          <Gift className="w-3.5 h-3.5" /> Siap ditukar
                        </span>
                      ) : (
                        `Butuh ${r.poin - poin} poin lagi`
                      )}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
