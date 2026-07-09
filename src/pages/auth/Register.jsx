// src/pages/auth/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Calendar } from "lucide-react";
import { usersAPI } from "../../services/usersAPI";
import { createMember } from "../../services/membersAPI";
import logo from "../../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    noHP: "",
    tanggalLahir: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Confirm Password tidak cocok");
      setLoading(false);
      return;
    }

    try {
      await usersAPI.createUser({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        role: "member",
        poin: 0,
        tier: "Silver",
        segmen: "Pelanggan Baru",
      });

      // UC03: selain bikin akun login, langsung daftarin juga sebagai
      // member CRM (poin, tier, dst) supaya begitu login gak nemu data
      // kosong. Sekarang beneran disimpan ke tabel `members` Supabase
      // lewat createMember — bukan localStorage lagi. id, created_at,
      // total_transactions, visit_count, last_visit_at diisi otomatis
      // oleh database.
      await createMember({
        name: formData.full_name,
        phone: formData.noHP || null,
        email: formData.email,
        birth_date: formData.tanggalLahir || null,
        tier: "Silver",
        total_points: 0,
        segment: "Baru",
        favorite_menu: null,
      });

      alert("Registrasi berhasil! Akun & data member kamu sudah dibuat. Silakan login.");
      setFormData({
        full_name: "",
        email: "",
        noHP: "",
        tanggalLahir: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);

      setError(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Registrasi gagal",
      );
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

          <h1 className="text-2xl font-bold text-coffee-900 mb-2">Daftar Akun</h1>

          <p className="text-sm text-coffee-600">
            Buat akun baru untuk bergabung
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
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              Nama Lengkap
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full pl-11 pr-4 py-3 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full pl-11 pr-4 py-3 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">
                No. HP
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />
                <input
                  type="tel"
                  name="noHP"
                  value={formData.noHP}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className="w-full pl-11 pr-3 py-3 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">
                Tgl. Lahir
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  className="w-full pl-11 pr-2 py-3 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full pl-11 pr-4 py-3 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Konfirmasi password"
                className="w-full pl-11 pr-4 py-3 border border-coffee-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-coffee-600 to-coffee-700 text-white py-3 rounded-lg font-medium"
          >
            {loading ? "Loading..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-xs text-coffee-500 mt-6">
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-coffee-600 hover:underline"
          >
            Login di sini
          </button>
        </p>
      </div>
    </div>
  );
}