// src/components/ProtectedRoute.jsx
// Menjaga semua route di dalam <Route element={<ProtectedRoute />}> (App.jsx)
// supaya cuma bisa diakses kalau user sudah login. Sumber kebenaran "sudah
// login atau belum" adalah localStorage("token"), yang di-set oleh
// Login.jsx (UC: Login) tepat setelah usersAPI.loginUser() sukses.

import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProtectedRoute() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Token & user disimpan bareng saat login (lihat Login.jsx handleSubmit).
    // Cukup cek keberadaannya di sini — tidak perlu panggil API lagi.
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsAuthenticated(Boolean(token && user));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coffee-600"></div>
      </div>
    );
  }

  // Belum login -> tendang ke /login, sambil bawa asal halaman (state.from)
  // supaya nanti (opsional) bisa diarahkan balik ke halaman yang dituju.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}