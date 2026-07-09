// src/services/membersAPI.js
//
// Sama gayanya kayak usersAPI.js: axios langsung ke REST endpoint
// Supabase, pakai API key di header. Gak butuh library @supabase/supabase-js
// atau file supabaseClient.js — cukup file ini aja.
//
// PostgREST (REST API bawaan Supabase) punya aturan sendiri:
// - GET    /members                -> ambil semua data
// - POST   /members                -> tambah data baru
// - PATCH  /members?id=eq.5        -> update baris dengan id = 5
// - DELETE /members?id=eq.5        -> hapus baris dengan id = 5
// Header "Prefer: return=representation" bikin POST/PATCH balikin data
// yang baru disimpan (bukan cuma status kosong), makanya dipakai di sini.

import axios from 'axios'

const API_URL = 'https://jyeezagvihgqbacavape.supabase.co/rest/v1/members'

const API_KEY = 'sb_publishable_RJLMCC0pcLUtSvOO8i6RIQ_8EsbO7Zo'

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
}

/**
 * Ambil semua member, urut dari yang paling baru daftar.
 * Dipakai di: MembersPage.jsx
 */
export async function fetchMembers() {
  const response = await axios.get(
    `${API_URL}?order=created_at.desc`,
    { headers }
  )
  return response.data
}

/**
 * Tambah member baru.
 * `member` contohnya: { name, phone, email, birth_date, tier, total_points, segment, favorite_menu }
 * id, created_at, total_transactions, visit_count, last_visit_at otomatis
 * diisi database, jadi gak perlu dikirim dari sini.
 */
export async function createMember(member) {
  const response = await axios.post(
    API_URL,
    member,
    { headers }
  )
  // PostgREST selalu balikin array (walau cuma nambah 1 baris), makanya [0]
  return response.data[0]
}

/**
 * Update sebagian data member berdasarkan id.
 * `changes` cuma perlu berisi field yang mau diubah.
 */
export async function updateMember(id, changes) {
  const response = await axios.patch(
    `${API_URL}?id=eq.${id}`,
    changes,
    { headers }
  )
  return response.data[0]
}

/**
 * Hapus member berdasarkan id.
 */
export async function deleteMember(id) {
  await axios.delete(
    `${API_URL}?id=eq.${id}`,
    { headers }
  )
  return true
}

/*
CONTOH PEMAKAIAN di komponen React (sudah dipraktikkan di MembersPage.jsx):

  useEffect(() => {
    fetchMembers()
      .then((data) => setMembers(data))
      .catch(() => setError("Gagal memuat data member"));
  }, []);

  async function handleTambah() {
    const baru = await createMember({ name: "Budi", phone: "0812xxxx" });
    setMembers((prev) => [baru, ...prev]);
  }
*/