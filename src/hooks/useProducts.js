
// src/hooks/useProducts.js
//
// Hook bersama buat ambil data products dari Supabase.
// Sama modelnya kayak useMembers.js.

import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../services/productsAPI";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    return fetchProducts()
      .then((data) => {
        setProducts(data);
        return data;
      })
      .catch(() => {
        setError("Gagal memuat data produk dari database.");
        return [];
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { products, loading, error, reload };
}