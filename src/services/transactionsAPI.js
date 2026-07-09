
// src/services/transactionsAPI.js
//
// Sama gayanya kayak membersAPI.js & productsAPI.js: axios langsung ke
// REST endpoint Supabase, pakai API key di header.
//
// PostgREST (REST API bawaan Supabase):
// - GET    /transactions                -> ambil semua data
// - POST   /transactions                -> tambah data baru
// - PATCH  /transactions?id=eq.5        -> update baris dengan id = 5
// - DELETE /transactions?id=eq.5        -> hapus baris dengan id = 5
//
// PERBEDAAN dibanding membersAPI.js/productsAPI.js:
// Nama kolom di tabel Supabase pakai snake_case (member_id, customer_name,
// total_price, dst), tapi kode React yang sudah ada (OrdersPage.jsx,
// DashboardPage.jsx, dll) sejak awal dibangun pakai field ala orders.json
// yang camelCase Indonesia (memberId, namaPelanggan, totalHarga, dst).
//
// Daripada ubah semua halaman yang sudah pakai nama field lama, di file ini
// dibikin 2 fungsi mapping:
//   - toDbRow()   : ubah objek gaya React -> gaya kolom Supabase (dipakai
//                   sebelum POST/PATCH)
//   - fromDbRow() : ubah baris hasil Supabase -> gaya objek React (dipakai
//                   sesudah GET), biar OrdersPage.jsx dkk gak perlu banyak
//                   berubah.

import axios from 'axios'

const API_URL = 'https://jyeezagvihgqbacavape.supabase.co/rest/v1/transactions'

const API_KEY = 'sb_publishable_RJLMCC0pcLUtSvOO8i6RIQ_8EsbO7Zo'

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
}

/**
 * Ubah 1 baris hasil Supabase (snake_case) jadi objek gaya orders.json
 * (camelCase) yang sudah dipakai di komponen React.
 */
function fromDbRow(row) {
  return {
    id: row.id,
    memberId: row.member_id,
    namaPelanggan: row.customer_name,
    items: row.items || [],
    totalHarga: row.total_price,
    status: row.status,
    waktuPesan: row.ordered_at,
    waktuSelesai: row.completed_at,
    metodePembayaran: row.payment_method,
    channel: row.channel,
    kodePromo: row.promo_code,
    createdAt: row.created_at,
  }
}

/**
 * Ubah objek gaya orders.json (camelCase) jadi baris siap kirim ke Supabase
 * (snake_case). Cuma field yang ada di parameter `data` yang dimasukkan,
 * jadi bisa dipakai buat create (lengkap) maupun update (sebagian).
 */
function toDbRow(data) {
  const row = {}
  if ('memberId' in data) row.member_id = data.memberId
  if ('namaPelanggan' in data) row.customer_name = data.namaPelanggan
  if ('items' in data) row.items = data.items
  if ('totalHarga' in data) row.total_price = data.totalHarga
  if ('status' in data) row.status = data.status
  if ('waktuPesan' in data) row.ordered_at = data.waktuPesan
  if ('waktuSelesai' in data) row.completed_at = data.waktuSelesai
  if ('metodePembayaran' in data) row.payment_method = data.metodePembayaran
  if ('channel' in data) row.channel = data.channel
  if ('kodePromo' in data) row.promo_code = data.kodePromo
  return row
}

/**
 * Ambil semua transaksi, urut dari yang paling baru dipesan.
 * Dipakai di: OrdersPage.jsx, DashboardPage.jsx, AnalyticsPage.jsx,
 * ProfilePage.jsx, QueuePage.jsx
 */
export async function fetchTransactions() {
  const response = await axios.get(
    `${API_URL}?order=ordered_at.desc`,
    { headers }
  )
  return response.data.map(fromDbRow)
}

/**
 * Tambah transaksi baru.
 * `order` contohnya: { memberId, namaPelanggan, items, totalHarga, status,
 * waktuPesan, channel } — id dan created_at otomatis diisi database.
 */
export async function createTransaction(order) {
  const response = await axios.post(
    API_URL,
    toDbRow(order),
    { headers }
  )
  return fromDbRow(response.data[0])
}

/**
 * Update sebagian data transaksi berdasarkan id.
 * `changes` cuma perlu berisi field (gaya orders.json) yang mau diubah,
 * misalnya { status: "Selesai", metodePembayaran: "Cash", waktuSelesai: ... }
 */
export async function updateTransaction(id, changes) {
  const response = await axios.patch(
    `${API_URL}?id=eq.${id}`,
    toDbRow(changes),
    { headers }
  )
  return fromDbRow(response.data[0])
}

/**
 * Hapus transaksi berdasarkan id.
 */
export async function deleteTransaction(id) {
  await axios.delete(
    `${API_URL}?id=eq.${id}`,
    { headers }
  )
  return true
}

/*
CONTOH PEMAKAIAN di komponen React (dipraktikkan di OrdersPage.jsx):

  useEffect(() => {
    fetchTransactions()
      .then((data) => setOrders(data))
      .catch(() => setError("Gagal memuat data transaksi"));
  }, []);

  async function handleSubmitOrder() {
    const baru = await createTransaction({
      memberId: null,
      namaPelanggan: "Budi",
      items: [{ menu: "Americano", varian: "Reg", harga: 18000, qty: 1 }],
      totalHarga: 18000,
      status: "Dibuat",
      waktuPesan: new Date().toISOString(),
      channel: "Dine-in",
    });
    setOrders((prev) => [baru, ...prev]);
  }
*/