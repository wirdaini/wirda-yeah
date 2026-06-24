import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Gift,
  PieChart,
  Megaphone,
  Clock,
  MessageSquare,
  BarChart3,
  Coffee,
  UserCog,
} from "lucide-react";

const menuItems = [
  { path: "/", name: "Dashboard", icon: LayoutDashboard },
  { path: "/users", name: "Users", icon: UserCog, adminOnly: true },
  { path: "/members", name: "Members", icon: Users },
  { path: "/products", name: "Products", icon: Coffee },
  { path: "/orders", name: "Orders", icon: ShoppingCart },
  { path: "/loyalty", name: "Loyalty", icon: Gift },
  { path: "/segmentation", name: "Segmentation", icon: PieChart },
  { path: "/campaigns", name: "Campaigns", icon: Megaphone },
  { path: "/queue", name: "Queue", icon: Clock },
  { path: "/feedback", name: "Feedback", icon: MessageSquare },
  { path: "/analytics", name: "Analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white text-xl">☕</span>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 tracking-tight">
              Papi Coffee
            </h2>

            <p className="text-[11px] text-gray-500">CRM System</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems
          .filter(
            (item) =>
              !item.adminOnly ||
              user?.role === "admin" ||
              user?.role === "super_admin"
          )
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-amber-50 text-amber-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-amber-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />

                  <span className="text-[14px]">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white text-sm font-medium shadow-sm">
            {user?.full_name
              ? user.full_name.substring(0, 2).toUpperCase()
              : "US"}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.full_name || "User"}
            </p>

            <p className="text-xs text-gray-500 truncate">
              {user?.email || "email"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}