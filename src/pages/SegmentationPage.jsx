// src/pages/SegmentationPage.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getLoyaltyTier } from "../lib/utils";
import { useMembers } from "../hooks/useMembers";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { Loader2 } from "lucide-react";

export default function SegmentationPage() {
  // Data member sekarang diambil dari tabel `members` Supabase,
  // bukan dari data/members.json lagi.
  const { members, loading, error } = useMembers();

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center gap-2 text-sm text-coffee-500 h-64">
        <Loader2 className="w-4 h-4 animate-spin" />
        Memuat data segmentasi dari database...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">{error}</div>;
  }

  const segmentCounts = members.reduce((acc, member) => {
    acc[member.segment] = (acc[member.segment] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(segmentCounts).map(([name, value]) => ({ name, value }));

  const COLORS = {
    "Baru": "#3b82f6",
    "Reguler": "#10b981",
    "Tidak Aktif": "#ef4444",
  };

  const segmentDetails = Object.entries(segmentCounts).map(([segment, count]) => {
    const segmentMembers = members.filter((m) => m.segment === segment);
    const totalTransaksi = segmentMembers.reduce((sum, m) => sum + (m.total_transactions || 0), 0);
    const avgTransaksi = Math.round(totalTransaksi / count);
    return { segment, count, totalTransaksi, avgTransaksi, members: segmentMembers };
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Segmentasi Pelanggan" subtitle="Analisis segmentasi pelanggan berdasarkan perilaku" breadcrumb="Segmentasi Pelanggan" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-coffee-900 mb-4">Distribusi Segmen</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={120} dataKey="value">
                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#8884d8"} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold text-coffee-900 mb-4">Ringkasan Segmen</h3>
          <div className="space-y-4">
            {segmentDetails.map((detail) => (
              <div key={detail.segment} className="p-4 border border-coffee-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[detail.segment] || "#8884d8" }} />
                  <h4 className="font-semibold text-coffee-900">{detail.segment}</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-coffee-600">Jumlah</p>
                    <p className="font-semibold text-coffee-900">{detail.count} member</p>
                  </div>
                  <div>
                    <p className="text-coffee-600">Total Transaksi</p>
                    <p className="font-semibold text-coffee-900">Rp {(detail.totalTransaksi / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-coffee-600">Rata-rata</p>
                    <p className="font-semibold text-coffee-900">Rp {(detail.avgTransaksi / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {segmentDetails.map((detail) => (
        <Card key={detail.segment}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[detail.segment] || "#8884d8" }} />
            <h3 className="font-semibold text-coffee-900">{detail.segment}</h3>
            <span className="text-sm text-coffee-600">({detail.count} member)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-coffee-50 border-b border-coffee-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Nama</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Tier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Poin</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Total Transaksi</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Kunjungan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-100">
                {detail.members.map((member) => (
                  <tr key={member.id} className="hover:bg-coffee-50">
                    <td className="px-4 py-3 text-sm font-medium text-coffee-900">{member.name}</td>
                    <td className="px-4 py-3">
                      <Badge
                        type={
                          getLoyaltyTier(member.total_points) === "Gold"
                            ? "amber"
                            : getLoyaltyTier(member.total_points) === "Platinum"
                            ? "purple"
                            : "default"
                        }
                      >
                        {getLoyaltyTier(member.total_points)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-coffee-900">{member.total_points}</td>
                    <td className="px-4 py-3 text-sm text-coffee-900">Rp {(member.total_transactions || 0).toLocaleString("id-ID")}</td>
                    <td className="px-4 py-3 text-sm text-coffee-900">{member.visit_count || 0}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </div>
  );
}