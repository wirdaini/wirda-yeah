// src/pages/AnalyticsPage.jsx
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTransactions } from "../hooks/useTransactions";
import { useMembers } from "../hooks/useMembers";
import { DollarSign, ShoppingBag, Users, Loader2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Card from "../components/Card";
import Badge from "../components/Badge";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dailySales = [
  { day: "Sen", penjualan: 1200000, orders: 24 },
  { day: "Sel", penjualan: 950000, orders: 19 },
  { day: "Rab", penjualan: 1450000, orders: 29 },
  { day: "Kam", penjualan: 1100000, orders: 22 },
  { day: "Jum", penjualan: 1800000, orders: 36 },
  { day: "Sab", penjualan: 2300000, orders: 46 },
  { day: "Min", penjualan: 2100000, orders: 42 },
];

const weeklyTrend = [
  { week: "Minggu 1", revenue: 5800000, newMembers: 8 },
  { week: "Minggu 2", revenue: 6200000, newMembers: 12 },
  { week: "Minggu 3", revenue: 5900000, newMembers: 7 },
  { week: "Minggu 4", revenue: 7100000, newMembers: 15 },
];

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"];

export default function AnalyticsPage() {
  // Data member sekarang diambil dari tabel `members` Supabase,
  // bukan dari data/members.json lagi.
  const { members, loading: loadingMembers, error: errorMembers } = useMembers();
  // Data transaksi sekarang diambil dari tabel `transactions` Supabase,
  // bukan dari data/orders.json lagi (Fase 3).
  const { transactions, loading: loadingTransactions, error: errorTransactions } = useTransactions();

  const loading = loadingMembers || loadingTransactions;
  const error = errorMembers || errorTransactions;

  const menuSales = {};
  transactions.forEach((order) => {
    order.items.forEach((item) => {
      menuSales[item.menu] =
        (menuSales[item.menu] || 0) + item.harga * item.qty;
    });
  });

  const topProducts = Object.entries(menuSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  const segmentSales = members.reduce((acc, member) => {
    acc[member.segment] = (acc[member.segment] || 0) + (member.total_transactions || 0);
    return acc;
  }, {});

  const segmentData = Object.entries(segmentSales).map(([name, value]) => ({
    name,
    value,
  }));

  const totalRevenue = dailySales.reduce((sum, day) => sum + day.penjualan, 0);
  const totalOrders = dailySales.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);
  const newMembers = members.filter((m) => m.segment === "Baru").length;

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center gap-2 text-sm text-coffee-500 h-64">
        <Loader2 className="w-4 h-4 animate-spin" />
        Memuat data analitik dari database...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Analitik"
        subtitle="Dashboard analytics dan insights bisnis"
        breadcrumb="Analitik"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value={`Rp ${(totalRevenue / 1000000).toFixed(1)}jt`}
          icon={DollarSign}
          trend="18% vs minggu lalu"
          trendUp={true}
          color="green"
        />
        <StatCard
          label="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          trend="12% vs minggu lalu"
          trendUp={true}
          color="blue"
        />
        <StatCard
          label="Avg Order Value"
          value={`Rp ${(avgOrderValue / 1000).toFixed(0)}K`}
          icon={null}
          trend="5% vs minggu lalu"
          trendUp={true}
          color="amber"
        />
        <StatCard
          label="New Members"
          value={newMembers}
          icon={Users}
          trend="22% vs minggu lalu"
          trendUp={true}
          color="purple"
        />
      </div>

      {/* TABS dengan efek aktif */}
      <Tabs defaultValue="sales">
        <TabsList className="bg-coffee-100 p-1 rounded-lg w-fit">
          <TabsTrigger
            value="sales"
            className="data-[state=active]:bg-coffee-600 data-[state=active]:text-white data-[state=active]:shadow-sm px-6 py-2 rounded-md transition-all duration-200"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger
            value="customer"
            className="data-[state=active]:bg-coffee-600 data-[state=active]:text-white data-[state=active]:shadow-sm px-6 py-2 rounded-md transition-all duration-200"
          >
            Customer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <h3 className="font-semibold text-coffee-900 mb-4">Penjualan Harian</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "penjualan")
                        return [`Rp ${value.toLocaleString("id-ID")}`, "Penjualan"];
                      return [value, "Orders"];
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="penjualan"
                    fill="#d97706"
                    radius={[8, 8, 0, 0]}
                    name="Penjualan"
                  />
                  <Bar
                    dataKey="orders"
                    fill="#3b82f6"
                    radius={[8, 8, 0, 0]}
                    name="Orders"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h3 className="font-semibold text-coffee-900 mb-4">Tren Mingguan</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "revenue")
                        return [`Rp ${value.toLocaleString("id-ID")}`, "Revenue"];
                      return [value, "New Members"];
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 5 }}
                    name="Revenue"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="newMembers"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", r: 5 }}
                    name="New Members"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <h3 className="font-semibold text-coffee-900 mb-4">Top 5 Produk Terlaris</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={topProducts}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    dataKey="value"
                  >
                    {topProducts.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h3 className="font-semibold text-coffee-900 mb-4">Penjualan per Segmen</h3>
              <div className="space-y-4">
                {segmentData
                  .sort((a, b) => b.value - a.value)
                  .map((segment, index) => (
                    <div key={segment.name}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge type="info">{segment.name}</Badge>
                        <span className="text-sm font-semibold text-coffee-900">
                          Rp {(segment.value / 1000000).toFixed(1)}jt
                        </span>
                      </div>
                      <div className="w-full h-3 bg-coffee-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${(segment.value / Math.max(...segmentData.map((s) => s.value))) * 100}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}