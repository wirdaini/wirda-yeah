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
import ordersData from "../data/orders.json";
import membersData from "../data/members.json";
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";

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
  const menuSales = {};
  ordersData.forEach((order) => {
    order.items.forEach((item) => {
      menuSales[item.menu] = (menuSales[item.menu] || 0) + item.harga * item.qty;
    });
  });

  const topProducts = Object.entries(menuSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  const segmentSales = membersData.reduce((acc, member) => {
    acc[member.segmen] = (acc[member.segmen] || 0) + member.totalTransaksi;
    return acc;
  }, {});

  const segmentData = Object.entries(segmentSales).map(([name, value]) => ({
    name,
    value,
  }));

  const totalRevenue = dailySales.reduce((sum, day) => sum + day.penjualan, 0);
  const totalOrders = dailySales.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <div className="p-6 space-y-6">

      <PageHeader 
  title="Analitik" 
  subtitle="Dashboard analytics dan insights bisnis" 
  breadcrumb="Analitik"
/>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">
                Rp {(totalRevenue / 1000000).toFixed(1)}jt
              </h3>
              <p className="text-xs text-green-600 mt-1">↑ 18% vs minggu lalu</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">{totalOrders}</h3>
              <p className="text-xs text-green-600 mt-1">↑ 12% vs minggu lalu</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
              <h3 className="text-2xl font-bold text-gray-900">
                Rp {(avgOrderValue / 1000).toFixed(0)}K
              </h3>
              <p className="text-xs text-green-600 mt-1">↑ 5% vs minggu lalu</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">New Members</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {membersData.filter((m) => m.segmen === "Pelanggan Baru").length}
              </h3>
              <p className="text-xs text-green-600 mt-1">↑ 22% vs minggu lalu</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Penjualan Harian</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "penjualan") return [`Rp ${value.toLocaleString("id-ID")}`, "Penjualan"];
                  return [value, "Orders"];
                }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="penjualan" fill="#d97706" radius={[8, 8, 0, 0]} name="Penjualan" />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tren Mingguan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue") return [`Rp ${value.toLocaleString("id-ID")}`, "Revenue"];
                  return [value, "New Members"];
                }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top 5 Produk Terlaris</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProducts}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Penjualan per Segmen</h3>
          <div className="space-y-4">
            {segmentData
              .sort((a, b) => b.value - a.value)
              .map((segment, index) => (
                <div key={segment.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{segment.name}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      Rp {(segment.value / 1000000).toFixed(1)}jt
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
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
        </div>
      </div>
    </div>
  );
}