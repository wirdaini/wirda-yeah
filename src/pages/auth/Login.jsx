import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";
import logo from "../../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await usersAPI.loginUser(formData.email, formData.password);

      if (response.length > 0) {
        localStorage.setItem("user", JSON.stringify(response[0]));
        localStorage.setItem("token", "login-success");
        navigate("/dashboard");
      } else {
        setError("Email atau password salah");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden">
            <img src={logo} alt="Papi Coffee" className="w-full h-full object-contain" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Papi Coffee CRM
          </h1>

          <p className="text-sm text-gray-600">
            Silakan login untuk melanjutkan
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="bg-blue-100 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg mb-4 text-sm">
            Sedang memproses...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-medium hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 Papi Coffee. All rights reserved.
        </p>
      </div>
    </div>
  );
}
