// src/hooks/useTransactions.js
//
// Hook bersama buat ambil data transaksi dari Supabase.
// Dipakai di halaman-halaman yang cuma BACA data transaksi (bukan CRUD
// penuh kayak OrdersPage.jsx) — misalnya DashboardPage, AnalyticsPage,
// ProfilePage, QueuePage.
//
// Kenapa dipisah jadi hook sendiri? Biar gak 4 komponen beda-beda nulis
// ulang useState + useEffect + fetchTransactions() yang isinya sama persis.
// Sama modelnya kayak useMembers.js dan useProducts.js.

import { useState, useEffect, useCallback } from "react";
import { fetchTransactions } from "../services/transactionsAPI";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    return fetchTransactions()
      .then((data) => {
        setTransactions(data);
        return data;
      })
      .catch(() => {
        setError("Gagal memuat data transaksi dari database.");
        return [];
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { transactions, loading, error, reload };
}