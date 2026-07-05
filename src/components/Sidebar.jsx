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
  ExternalLink,
} from "lucide-react";
import logo from "../assets/logo.png";

const menuItems = [
  { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
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
    <div className="w-64 min-h-screen bg-white border-r border-coffee-300 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-coffee-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm overflow-hidden">
            <img src={logo} alt="Papi Coffee" className="w-full h-full object-contain" />
          </div>

          <div>
            <h2 className="font-semibold text-coffee-900 tracking-tight">
              Papi Coffee
            </h2>

            <p className="text-[11px] text-muted">CRM System</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 pt-4 pb-2">
        <label className="text-xs font-semibold text-muted uppercase tracking-wide">
          Main menu
        </label>
      </div>
      <nav className="flex-1 px-4 pb-4 space-y-1">
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
                    ? "bg-coffee-800 text-white font-medium"
                    : "text-coffee-700 hover:bg-coffee-50 hover:text-coffee-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-coffee-300 group-hover:text-coffee-600"
                    }`}
                  />

                  <span className="text-[14px]">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-coffee-200">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-coffee-50 transition-all cursor-pointer">

          <div className="w-9 h-9 rounded-full bg-coffee-100 flex items-center justify-center text-coffee-700 text-sm font-medium shadow-sm">
            {user?.full_name
              ? user.full_name.substring(0, 2).toUpperCase()
              : "US"}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-coffee-900 truncate">
              {user?.full_name || "User"}
            </p>

            <p className="text-xs text-muted truncate">
              {user?.role || "user"}
            </p>
          </div>

        </div>
        <button className="w-full flex items-center justify-center gap-2 mt-3 px-3 py-2 bg-coffee-50 text-coffee-700 hover:bg-coffee-100 rounded-lg transition-all text-sm font-medium border border-coffee-300">
          <span>Your Shop</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}