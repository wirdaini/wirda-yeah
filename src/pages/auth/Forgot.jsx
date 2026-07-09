import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Forgot() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulasi API reset password
    setTimeout(() => {
      if (email) {
        setSuccess(true);
      } else {
        setError("Email tidak valid");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden">
            <img src={logo} alt="Papi Coffee" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-coffee-900 mb-2">
            Lupa Password
          </h1>
          <p className="text-sm text-coffee-600">
            Masukkan email Anda, kami akan kirim link reset password
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

        {success ? (
          <div className="text-center">
            <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              ✅ Link reset password telah dikirim ke {email}
            </div>
            <button
              onClick={() => navigate("/login")}
              className="text-coffee-600 hover:underline text-sm"
            >
              Kembali ke Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  className="w-full pl-11 pr-4 py-3 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-coffee-600 to-coffee-700 text-white py-3 rounded-lg font-medium hover:from-coffee-700 hover:to-coffee-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? "Loading..." : "Kirim Link Reset"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 text-coffee-500 hover:text-coffee-700 text-sm mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}