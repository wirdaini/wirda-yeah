
// src/services/productsAPI.js
//
// Sama gayanya kayak membersAPI.js: axios langsung ke REST endpoint
// Supabase, pakai API key di header.
//
// PostgREST (REST API bawaan Supabase):
// - GET    /products                -> ambil semua data
// - POST   /products                -> tambah data baru
// - PATCH  /products?id=eq.5        -> update baris dengan id = 5
// - DELETE /products?id=eq.5        -> hapus baris dengan id = 5

import axios from 'axios'

const API_URL = 'https://jyeezagvihgqbacavape.supabase.co/rest/v1/products'

const API_KEY = 'sb_publishable_RJLMCC0pcLUtSvOO8i6RIQ_8EsbO7Zo'

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
}

/**
 * Ambil semua produk, urut dari yang paling baru dibuat.
 * Dipakai di: Products.jsx, ProductDetail.jsx, LandingPage.jsx, OrdersPage.jsx
 */
export async function fetchProducts() {
  const response = await axios.get(
    `${API_URL}?order=created_at.desc`,
    { headers }
  )
  return response.data
}

/**
 * Ambil satu produk berdasarkan id.
 * Dipakai di: ProductDetail.jsx
 */
export async function fetchProductById(id) {
  const response = await axios.get(
    `${API_URL}?id=eq.${id}`,
    { headers }
  )
  return response.data[0] || null
}

/**
 * Tambah produk baru.
 * `product` contohnya: { title, code, category, brand, price, stock, image }
 * id dan created_at otomatis diisi database.
 */
export async function createProduct(product) {
  const response = await axios.post(
    API_URL,
    product,
    { headers }
  )
  return response.data[0]
}

/**
 * Update sebagian data produk berdasarkan id.
 */
export async function updateProduct(id, changes) {
  const response = await axios.patch(
    `${API_URL}?id=eq.${id}`,
    changes,
    { headers }
  )
  return response.data[0]
}

/**
 * Hapus produk berdasarkan id.
 */
export async function deleteProduct(id) {
  await axios.delete(
    `${API_URL}?id=eq.${id}`,
    { headers }
  )
  return true
}