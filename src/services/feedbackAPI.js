// src/services/feedbackAPI.js
//
// Sama gayanya kayak membersAPI.js/productsAPI.js/transactionsAPI.js/
// campaignsAPI.js: axios langsung ke REST endpoint Supabase, pakai API
// key di header.
//
// PostgREST (REST API bawaan Supabase):
// - GET    /feedback                -> ambil semua data
// - POST   /feedback                -> tambah data baru
// - PATCH  /feedback?id=eq.5        -> update baris dengan id = 5
// - DELETE /feedback?id=eq.5        -> hapus baris dengan id = 5
//
// Sama kayak transactionsAPI.js/campaignsAPI.js, ada mapping snake_case
// (kolom Supabase) <-> camelCase (field yang sudah dipakai FeedbackPage.jsx
// dari jaman masih pakai feedback.json), biar komponennya gak banyak
// berubah.

import axios from 'axios'

const API_URL = 'https://jyeezagvihgqbacavape.supabase.co/rest/v1/feedback'

const API_KEY = 'sb_publishable_RJLMCC0pcLUtSvOO8i6RIQ_8EsbO7Zo'

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
}

/**
 * Ubah 1 baris hasil Supabase (snake_case) jadi objek gaya feedback.json
 * (camelCase) yang sudah dipakai di FeedbackPage.jsx & FeedbackTicket.jsx.
 */
function fromDbRow(row) {
  return {
    id: row.id,
    namaPelanggan: row.customer_name,
    memberId: row.member_id,
    keluhan: row.complaint,
    kategori: row.category,
    status: row.status,
    rating: row.rating,
    tanggal: row.submitted_at,
    tanggalSelesai: row.resolved_at,
    penanganan: row.handled_by,
    solusi: row.resolution,
    createdAt: row.created_at,
  }
}

/**
 * Ubah objek gaya feedback.json (camelCase) jadi baris siap kirim ke
 * Supabase (snake_case). Cuma field yang ada di parameter `data` yang
 * dimasukkan, jadi bisa dipakai buat create (lengkap) maupun update
 * (sebagian, misalnya cuma ubah status).
 */
function toDbRow(data) {
  const row = {}
  if ('namaPelanggan' in data) row.customer_name = data.namaPelanggan
  if ('memberId' in data) row.member_id = data.memberId
  if ('keluhan' in data) row.complaint = data.keluhan
  if ('kategori' in data) row.category = data.kategori
  if ('status' in data) row.status = data.status
  if ('rating' in data) row.rating = data.rating
  if ('tanggal' in data) row.submitted_at = data.tanggal
  if ('tanggalSelesai' in data) row.resolved_at = data.tanggalSelesai
  if ('penanganan' in data) row.handled_by = data.penanganan
  if ('solusi' in data) row.resolution = data.solusi
  return row
}

/**
 * Ambil semua feedback, urut dari yang paling baru dikirim.
 * Dipakai di: FeedbackPage.jsx
 */
export async function fetchFeedback() {
  const response = await axios.get(
    `${API_URL}?order=submitted_at.desc`,
    { headers }
  )
  return response.data.map(fromDbRow)
}

/**
 * Tambah feedback baru (belum dipakai di UI sekarang, tapi disediakan
 * kalau nanti mau ditambah form feedback dari sisi pelanggan).
 */
export async function createFeedback(feedback) {
  const response = await axios.post(
    API_URL,
    toDbRow(feedback),
    { headers }
  )
  return fromDbRow(response.data[0])
}

/**
 * Update sebagian data feedback berdasarkan id.
 * Dipakai buat UC07 (Mengelola Tiket Komplain): ubah status jadi
 * "In Progress" / "Closed", dan otomatis isi tanggalSelesai kalau ditutup.
 */
export async function updateFeedback(id, changes) {
  const response = await axios.patch(
    `${API_URL}?id=eq.${id}`,
    toDbRow(changes),
    { headers }
  )
  return fromDbRow(response.data[0])
}

/**
 * Hapus feedback berdasarkan id.
 */
export async function deleteFeedback(id) {
  await axios.delete(
    `${API_URL}?id=eq.${id}`,
    { headers }
  )
  return true
}