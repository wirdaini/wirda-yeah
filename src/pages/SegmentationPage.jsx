// src/pages/SegmentationPage.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import membersData from "../data/members.json";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";

export default function SegmentationPage() {
  const segmentCounts = membersData.reduce((acc, member) => {
    acc[member.segmen] = (acc[member.segmen] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(segmentCounts).map(([name, value]) => ({ name, value }));

  const COLORS = {
    "Pelanggan Baru": "#3b82f6",
    "Pelanggan Aktif": "#10b981",
    "Pelanggan Tidur": "#ef4444",
    "Pelanggan VIP": "#f59e0b",
  };

  const segmentDetails = Object.entries(segmentCounts).map(([segmen, count]) => {
    const members = membersData.filter((m) => m.segmen === segmen);
    const totalTransaksi = members.reduce((sum, m) => sum + m.totalTransaksi, 0);
    const avgTransaksi = Math.round(totalTransaksi / count);
    return { segmen, count, totalTransaksi, avgTransaksi, members };
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Segmentasi Pelanggan" subtitle="Analisis segmentasi pelanggan berdasarkan perilaku" breadcrumb="Segmentasi Pelanggan" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Distribusi Segmen</h3>
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
          <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Segmen</h3>
          <div className="space-y-4">
            {segmentDetails.map((detail) => (
              <div key={detail.segmen} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[detail.segmen] || "#8884d8" }} />
                  <h4 className="font-semibold text-gray-900">{detail.segmen}</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Jumlah</p>
                    <p className="font-semibold text-gray-900">{detail.count} member</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Transaksi</p>
                    <p className="font-semibold text-gray-900">Rp {(detail.totalTransaksi / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rata-rata</p>
                    <p className="font-semibold text-gray-900">Rp {(detail.avgTransaksi / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {segmentDetails.map((detail) => (
        <Card key={detail.segmen}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[detail.segmen] || "#8884d8" }} />
            <h3 className="font-semibold text-gray-900">{detail.segmen}</h3>
            <span className="text-sm text-gray-600">({detail.count} member)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Nama</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Tier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Poin</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Total Transaksi</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Kunjungan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {detail.members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{member.nama}</td>
                    <td className="px-4 py-3">
                      <Badge type={member.tier === "VIP" ? "amber" : "default"}>{member.tier}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{member.poin}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Rp {member.totalTransaksi.toLocaleString("id-ID")}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{member.jumlahKunjungan}x</td>
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