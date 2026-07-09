// src/services/campaignsAPI.js
//
// Sama gayanya kayak membersAPI.js/productsAPI.js/transactionsAPI.js:
// axios langsung ke REST endpoint Supabase, pakai API key di header.
//
// PostgREST (REST API bawaan Supabase):
// - GET    /campaigns                -> ambil semua data
// - POST   /campaigns                -> tambah data baru
// - PATCH  /campaigns?id=eq.5        -> update baris dengan id = 5
// - DELETE /campaigns?id=eq.5        -> hapus baris dengan id = 5
//
// Sama kayak transactionsAPI.js, ada mapping snake_case (kolom Supabase)
// <-> camelCase (field yang sudah dipakai CampaignsPage.jsx dari jaman
// masih pakai campaigns.json), biar komponennya gak banyak berubah.

import axios from 'axios'

const API_URL = 'https://jyeezagvihgqbacavape.supabase.co/rest/v1/campaigns'

const API_KEY = 'sb_publishable_RJLMCC0pcLUtSvOO8i6RIQ_8EsbO7Zo'

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
}

/**
 * Ubah 1 baris hasil Supabase (snake_case) jadi objek gaya campaigns.json
 * (camelCase) yang sudah dipakai di CampaignsPage.jsx.
 */
function fromDbRow(row) {
  return {
    id: row.id,
    nama: row.nama,
    deskripsi: row.deskripsi,
    targetSegmen: row.target_segmen,
    diskon: row.diskon,
    tanggalMulai: row.tanggal_mulai,
    tanggalSelesai: row.tanggal_selesai,
    status: row.status,
    jumlahPengguna: row.jumlah_pengguna,
    estimasiJangkauan: row.estimasi_jangkauan,
    createdAt: row.created_at,
  }
}

/**
 * Ubah objek gaya campaigns.json (camelCase) jadi baris siap kirim ke
 * Supabase (snake_case). Cuma field yang ada di parameter `data` yang
 * dimasukkan, jadi bisa dipakai buat create (lengkap) maupun update
 * (sebagian).
 */
function toDbRow(data) {
  const row = {}
  if ('nama' in data) row.nama = data.nama
  if ('deskripsi' in data) row.deskripsi = data.deskripsi
  if ('targetSegmen' in data) row.target_segmen = data.targetSegmen
  if ('diskon' in data) row.diskon = data.diskon
  if ('tanggalMulai' in data) row.tanggal_mulai = data.tanggalMulai
  if ('tanggalSelesai' in data) row.tanggal_selesai = data.tanggalSelesai
  if ('status' in data) row.status = data.status
  if ('jumlahPengguna' in data) row.jumlah_pengguna = data.jumlahPengguna
  if ('estimasiJangkauan' in data) row.estimasi_jangkauan = data.estimasiJangkauan
  return row
}

/**
 * Ambil semua kampanye, urut dari yang paling baru dibuat.
 * Dipakai di: CampaignsPage.jsx
 */
export async function fetchCampaigns() {
  const response = await axios.get(
    `${API_URL}?order=created_at.desc`,
    { headers }
  )
  return response.data.map(fromDbRow)
}

/**
 * Tambah kampanye baru.
 * `campaign` contohnya: { nama, deskripsi, targetSegmen, diskon,
 * tanggalMulai, tanggalSelesai, status, estimasiJangkauan }
 * id, jumlah_pengguna (default 0), dan created_at otomatis diisi database.
 */
export async function createCampaign(campaign) {
  const response = await axios.post(
    API_URL,
    toDbRow(campaign),
    { headers }
  )
  return fromDbRow(response.data[0])
}

/**
 * Update sebagian data kampanye berdasarkan id.
 * `changes` cuma perlu berisi field (gaya campaigns.json) yang mau diubah,
 * misalnya { status: "Aktif" } atau { jumlahPengguna: 150 }.
 */
export async function updateCampaign(id, changes) {
  const response = await axios.patch(
    `${API_URL}?id=eq.${id}`,
    toDbRow(changes),
    { headers }
  )
  return fromDbRow(response.data[0])
}

/**
 * Hapus kampanye berdasarkan id.
 */
export async function deleteCampaign(id) {
  await axios.delete(
    `${API_URL}?id=eq.${id}`,
    { headers }
  )
  return true
}