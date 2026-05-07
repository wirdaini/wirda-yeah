import { Gift, Award, TrendingUp } from "lucide-react";
import LoyaltyBadge from "../components/LoyaltyBadge";
import membersData from "../data/members.json";
import PageHeader from "../components/PageHeader";

export default function LoyaltyPage() {
  const totalPoin = membersData.reduce((sum, m) => sum + m.poin, 0);
  const avgPoin = Math.round(totalPoin / membersData.length);
  const readyToRedeem = membersData.filter((m) => m.poin >= 50).length;

  return (
    <div className="p-6 space-y-6">
     
      <PageHeader 
  title="Loyalty & Poin" 
  subtitle="Kelola program loyalitas dan reward member" 
    breadcrumb="Loyalty & Poin"

/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Poin Aktif</p>
              <h3 className="text-3xl font-bold text-gray-900">{totalPoin.toLocaleString("id-ID")}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Rata-rata Poin</p>
              <h3 className="text-3xl font-bold text-gray-900">{avgPoin}</h3>
              <p className="text-xs text-gray-500 mt-1">Per member</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Siap Tukar Reward</p>
              <h3 className="text-3xl font-bold text-gray-900">{readyToRedeem}</h3>
              <p className="text-xs text-gray-500 mt-1">Member dengan poin ≥ 50</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Daftar Reward</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">☕</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Minuman Gratis</h4>
                <p className="text-xs text-gray-600">50 poin</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">1x minuman pilihan (max Rp 35.000)</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🍰</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Gratis Snack</h4>
                <p className="text-xs text-gray-600">30 poin</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">1x snack atau dessert pilihan</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Voucher Diskon</h4>
                <p className="text-xs text-gray-600">100 poin</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Voucher diskon 20% untuk 3 transaksi</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Poin Per Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {membersData
            .sort((a, b) => b.poin - a.poin)
            .slice(0, 12)
            .map((member) => (
              <div key={member.id}>
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{member.nama}</span>
                    <span className="text-xs text-gray-600">{member.tier}</span>
                  </div>
                </div>
                <LoyaltyBadge tier={member.tier} poin={member.poin} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
