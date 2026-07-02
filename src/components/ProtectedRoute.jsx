// src/components/ProtectedRoute.jsx

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProtectedRoute() {
  // Tetap pakai state agar struktur komponen tidak banyak berubah
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Langsung selesai loading tanpa cek login
    setLoading(false);
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Langsung izinkan akses ke semua halaman yang diproteksi
  return <Outlet />;
}