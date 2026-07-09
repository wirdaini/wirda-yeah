// src/pages/LoyaltyPage.jsx
import { Gift, Award, TrendingUp, Loader2 } from "lucide-react";
import LoyaltyBadge from "../components/LoyaltyBadge";
import { getLoyaltyTier } from "../lib/utils";
import { useMembers } from "../hooks/useMembers";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Card from "../components/Card";

export default function LoyaltyPage() {
  // Data member sekarang diambil dari tabel `members` Supabase,
  // bukan dari data/members.json lagi.
  const { members, loading, error } = useMembers();

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center gap-2 text-sm text-coffee-500 h-64">
        <Loader2 className="w-4 h-4 animate-spin" />
        Memuat data loyalty dari database...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">{error}</div>;
  }

  const totalPoin = members.reduce((sum, m) => sum + (m.total_points || 0), 0);
  const avgPoin = members.length ? Math.round(totalPoin / members.length) : 0;
  const readyToRedeem = members.filter((m) => (m.total_points || 0) >= 50).length;

  const topMembers = [...members]
    .sort((a, b) => (b.total_points || 0) - (a.total_points || 0))
    .slice(0, 12);

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Loyalty & Poin" subtitle="Kelola program loyalitas dan reward member" breadcrumb="Loyalty & Poin" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Poin Aktif" value={totalPoin.toLocaleString("id-ID")} icon={Award} color="amber" />
        <StatCard label="Rata-rata Poin" value={avgPoin} icon={TrendingUp} trend="Per member" trendUp={true} color="blue" />
        <StatCard label="Siap Tukar Reward" value={readyToRedeem} icon={Gift} trend="Member dengan poin ≥ 50" trendUp={true} color="green" />
      </div>

      <Card>
        <h3 className="font-semibold text-coffee-900 mb-4">Daftar Reward</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-coffee-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-coffee-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">☕</span>
              </div>
              <div>
                <h4 className="font-medium text-coffee-900">Minuman Gratis</h4>
                <p className="text-xs text-coffee-600">50 poin</p>
              </div>
            </div>
            <p className="text-sm text-coffee-600">1x minuman pilihan (max Rp 35.000)</p>
          </div>
          <div className="border border-coffee-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🍰</span>
              </div>
              <div>
                <h4 className="font-medium text-coffee-900">Gratis Snack</h4>
                <p className="text-xs text-coffee-600">30 poin</p>
              </div>
            </div>
            <p className="text-sm text-coffee-600">1x snack atau dessert pilihan</p>
          </div>
          <div className="border border-coffee-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <h4 className="font-medium text-coffee-900">Voucher Diskon</h4>
                <p className="text-xs text-coffee-600">100 poin</p>
              </div>
            </div>
            <p className="text-sm text-coffee-600">Voucher diskon 20% untuk 3 transaksi</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-coffee-900 mb-4">Poin Per Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topMembers.map((member) => {
            const tier = getLoyaltyTier(member.total_points);
            return (
              <div key={member.id}>
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-coffee-900">{member.name}</span>
                    <span className="text-xs text-coffee-600">{tier}</span>
                  </div>
                </div>
                <LoyaltyBadge poin={member.total_points || 0} />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}