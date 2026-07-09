// src/hooks/useMembers.js
//
// Hook bersama buat ambil data members dari Supabase.
// Dipakai di halaman-halaman yang cuma BACA data member (bukan CRUD
// penuh kayak MembersPage.jsx) — misalnya NotificationBell, Segmentation,
// Analytics, Loyalty, Profile.
//
// Kenapa dipisah jadi hook sendiri? Biar gak 5 komponen beda-beda nulis
// ulang useState + useEffect + fetchMembers() yang isinya sama persis.

import { useState, useEffect, useCallback } from "react";
import { fetchMembers } from "../services/membersAPI";

export function useMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    return fetchMembers()
      .then((data) => {
        setMembers(data);
        return data;
      })
      .catch(() => {
        setError("Gagal memuat data member dari database.");
        return [];
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { members, loading, error, reload };
}