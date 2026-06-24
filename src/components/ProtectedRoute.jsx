// src/components/ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProtectedRoute() {
  // === STATE UNTUK LOADING & AUTHENTICATED ===
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // ambil data user hasil login
      const user = localStorage.getItem("user");

      // kalau tidak ada user berarti belum login
      if (!user) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);
  // === TAMPILKAN LOADING ===
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }
  // === BELUM LOGIN ===
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  // === SUDAH LOGIN ===
  return <Outlet />;
}
