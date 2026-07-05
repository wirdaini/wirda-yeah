import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Search } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="h-16 bg-white border-b border-coffee-300 px-6 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-700" />
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full pl-10 pr-4 py-2 border border-coffee-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-coffee-400 hover:text-coffee-700 hover:bg-coffee-50 rounded-lg transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coffee-500 rounded-full"></span>
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}