import { Users, TrendingUp, ShoppingCart, Award } from "lucide-react";
import StatCard from "../components/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import membersData from "../data/members.json";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";

const salesData = [
  { day: "Sen", penjualan: 1200000 },
  { day: "Sel", penjualan: 950000 },
  { day: "Rab", penjualan: 1450000 },
  { day: "Kam", penjualan: 1100000 },
  { day: "Jum", penjualan: 1800000 },
  { day: "Sab", penjualan: 2300000 },
  { day: "Min", penjualan: 2100000 },
];

const trendData = [
  { week: "W1", orders: 45 },
  { week: "W2", orders: 52 },
  { week: "W3", orders: 48 },
  { week: "W4", orders: 61 },
];

export default function DashboardPage() {
  const totalMembers = membersData.length;
  const totalPoin = membersData.reduce((sum, m) => sum + m.poin, 0);
  const todayOrders = ordersData.filter((o) => {
    const orderDate = new Date(o.waktuPesan);
    const today = new Date();
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  }).length;

const menuCount = {};
  ordersData.forEach((order) => {
    order.items.forEach((item) => {
      menuCount[item.menu] = (menuCount[item.menu] || 0) + item.qty;
    });
  });
  const topMenu = Object.entries(menuCount).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
  title="Dashboard" 
  subtitle="Ringkasan data CRM Papi Coffee" 
    breadcrumb="Dashboard"

/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Member"
          value={totalMembers}
          icon={Users}
          trend="+12% dari bulan lalu"
          trendUp={true}
        />
        <StatCard
          label="Poin Aktif"
          value={totalPoin.toLocaleString("id-ID")}
          icon={Award}
          trend="+8% dari bulan lalu"
          trendUp={true}
        />
        <StatCard
          label="Pesanan Hari Ini"
          value={todayOrders}
          icon={ShoppingCart}
          trend="+5% dari kemarin"
          trendUp={true}
        />
        <StatCard
          label="Menu Favorit"
          value={topMenu ? topMenu[0] : "-"}
          icon={TrendingUp}
          trend={`${topMenu ? topMenu[1] : 0} pesanan`}
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Penjualan Mingguan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="penjualan" fill="#d97706" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tren Pesanan Bulanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#d97706"
                strokeWidth={3}
                dot={{ fill: "#d97706", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Menu Terpopuler</h3>
        <div className="space-y-3">
          {Object.entries(menuCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([menu, count], index) => (
              <div key={menu} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{menu}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      style={{
                        width: `${(count / Math.max(...Object.values(menuCount))) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}x</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
