# PRD Landing Page CRM — Papi Coffee
Panduan lengkap Vibe Coding: Observasi Project → PRD v1 → PRD v2 → PRD v3

---

## STEP 0 — Observasi Project

### Hasil Observasi
- Struktur folder: `src/pages`, `src/components`, `src/layouts`, `src/data`, `src/lib`.
- Routing: `App.jsx` menggunakan `react-router-dom` dengan layout `AuthLayout` untuk auth dan `MainLayout` untuk dashboard. Root `/` sudah diarahkan ke landing page publik ketika tidak login, dan `/dashboard` untuk halaman admin saat login.
- Komponen tersedia: `Sidebar`, `Header`, `PageHeader`, `StatCard`, `Badge`, `MemberTable`, `LoyaltyBadge`, `Loading`, dan komponen Shadcn UI untuk dialog.
- Pola penulisan kode: React functional components, Tailwind CSS utility classes, lazy loading untuk halaman, data statis diimpor dari JSON.
- Library yang digunakan: React, React Router DOM, Tailwind CSS, Lucide React, Radix/shadcn UI, Recharts, Axios, Supabase JS.
- Struktur data member/loyalty: data statis di `src/data/members.json`; field utama `tier`, `poin`, `segmen`, `totalTransaksi`, `jumlahKunjungan`.

### Observasi Loyalty/Membership
- `src/data/members.json` berisi `tier` values: `VIP` dan `Regular`.
- `src/data/customers.json` berisi `loyaltyTier` values: `Gold`, `Silver`, `Bronze`.
- UI loyalty saat ini di `MembersPage`, `LoyaltyPage`, dan `MemberTable` menggunakan `VIP` / `Regular` tanpa logika tier otomatis.
- Tidak ada mapping tier otomatis di kode selain `Regular` menuju `VIP` untuk progress bar di `LoyaltyBadge`.
- Gap: requirement resmi meminta `Silver`, `Gold`, `Platinum`, tetapi data dan UI internal masih memakai `VIP`/`Regular` atau `Bronze`/`Silver`/`Gold`.

**Kesimpulan:** sistem perlu dinormalisasi ke `Silver` / `Gold` / `Platinum` agar landing page konsisten dengan bisnis requirement.

---

## PRD v1 — Basic

### Konteks Proyek
- Nama Brand: Papi Coffee (coffee shop, B2C).
- Framework: React JS.
- Database: Supabase (direncanakan, saat ini data lokal JSON).
- Styling: Tailwind CSS dan Shadcn UI.

### Status Proyek
- Sudah ada dashboard CRM dengan sistem member, loyalty, campaigns, analytics.
- Belum ada halaman landing page publik untuk calon member.
- Sistem dashboard masih memakai data statis lokal dan tier belum sepenuhnya konsisten.

### Tujuan PRD v1
Menyusun PRD dasar untuk landing page CRM Papi Coffee dengan fokus pada calon member yang belum login.

### Fitur yang Diinginkan
1. Hero section untuk memperkenalkan brand Papi Coffee.
2. Penjelasan singkat program membership dan poin loyalti.
3. Call to action untuk daftar member.

### Daftar Section Landing Page
- Navbar
- Hero Section
- Section Membership & Loyalty
- CTA Daftar Member
- Footer sederhana

### Evaluasi PRD v1
| Pertanyaan Evaluasi | Sesuai? | Catatan |
|---|---|---|
| Fitur sesuai kebutuhan? | Ya | Fokus pada perkenalan dan CTA pendaftaran.
| Alur bisnis sudah benar? | Ya | Calon member diarahkan ke pendaftaran.
| Tidak ada fitur yang tidak dibutuhkan? | Ya | Menghindari fungsionalitas dashboard internal.
| Struktur database masuk akal? | Ya | Hanya menampilkan ringkasan data loyalty publik.

---

## PRD v2 — Revisi

### Konteks Proyek
- Framework: React JS.
- Database: Supabase.
- Styling: Tailwind CSS dan Shadcn UI.

### Status Proyek
- PRD v1 sudah dibuat; landing page perlu diperluas dengan struktur Top/Middle/Bottom.
- Landing page harus konsisten dengan brand coffee dan referensi desain modern.
- Sistem tier internal harus disesuaikan dari `VIP`/`Regular` ke `Silver`/`Gold`/`Platinum`.

### Area Struktur
- TOP: Navbar, Hero.
- MIDDLE: Fitur/Benefit, Membership & Tier, Social Proof.
- BOTTOM: CTA akhir, Footer.

### Aturan Bisnis Papi Coffee
- Tier resmi: Silver, Gold, Platinum.
- Setiap transaksi Rp10.000 = 1 poin.
- 50 poin = 1 minuman gratis.
- Custom order tingkat gula: No Sugar, Less Sugar, Normal, Extra Sugar.

### Catatan Konsistensi Data
- Dashboard internal masih menggunakan tier `VIP` dan `Regular`.
- Untuk landing page, tier harus mencerminkan `Silver`/`Gold`/`Platinum`.
- Migrasi atau mapping perlu dilakukan sebelum data tier tampil di landing page.

### Referensi Desain
- Navbar: logo kiri, menu tengah, tombol auth kanan.
- Hero: headline bold, deskripsi, dua CTA, mockup kopi.
- Section Fitur: 3 kolom card dengan ikon, judul, deskripsi, link.
- Section Highlight: card gradasi cream-amber dengan foto produk.
- Section Statistik: kartu angka besar dengan gaya card.

### Palet Warna
- Primary/Accent: `#E8963B`.
- Background card: `#FDF3DC` / `#F5E1A8`.
- Base background: `#FFFFFF`.
- Teks utama: `#2B1B12`.
- Badge/CTA: amber gradasi.

### Required Sections
1. Navbar
2. Hero Section
3. Section Keunggulan/Fitur
4. Section Membership & Tier
5. Section Testimoni/Social Proof
6. Section CTA akhir
7. Footer

### Output PRD v2
- PRD lengkap per section.
- Alur bisnis pendaftaran member & perhitungan poin.
- Rencana implementasi bertahap.

### Evaluasi PRD v2
| Pertanyaan Evaluasi | Sesuai? | Catatan |
|---|---|---|
| Fitur sesuai kebutuhan? |  |  |
| Alur bisnis sudah benar? |  |  |
| Tidak ada fitur yang tidak dibutuhkan? |  |  |
| Struktur database masuk akal? |  |  |
| Sudah ikuti struktur Top/Middle/Bottom? |  |  |
| Gap tier VIP/Regular vs Silver/Gold/Platinum sudah ditangani? |  |  |

---

## PRD v3 — Final

### Konteks Proyek
- Framework: React JS.
- Database: Supabase.
- Styling: Tailwind CSS dan Shadcn UI.

### Status Proyek
- PRD v2 sudah tersedia.
- Landing page perlu versi final dengan form pendaftaran dan workflow lengkap.
- Migrasi tier VIP/Regular → Silver/Gold/Platinum harus dilakukan sebelum final.

### Aturan
- Solusi sederhana.
- Ikuti pola kode yang ada.
- Jangan ubah halaman yang tidak terkait.
- Landing page harus responsif.

### Aturan Bisnis
- Tier: Silver, Gold, Platinum.
- Rp10.000 = 1 poin; 50 poin = 1 minuman gratis.
- Custom gula: No Sugar, Less Sugar, Normal, Extra Sugar.
- Data member: nama, no_hp, email, tanggal_lahir, is_member, tanggal_daftar.

### Struktur Final
- Navbar
- Hero
- Fitur 3 kolom
- Membership & Tier
- Cara Kerja Poin
- Testimoni
- Form Daftar Member
- CTA akhir + Footer

### Output PRD v3
- PRD lengkap.
- Desain database tabel member/pendaftaran.
- Relasi tabel customer/loyalty.
- Aturan RLS Supabase.
- Rencana implementasi.

### Evaluasi PRD v3
| Pertanyaan Evaluasi | Sesuai? | Catatan |
|---|---|---|
| Fitur sesuai kebutuhan? |  |  |
| Alur bisnis sudah benar? |  |  |
| Tidak ada fitur yang tidak dibutuhkan? |  |  |
| Struktur database masuk akal? |  |  |
| Desain tabel form member tidak duplikat dengan tabel customer/loyalty? |  |  |
| RLS/aturan akses data sudah jelas? |  |  |
| Tier sudah konsisten Silver/Gold/Platinum di semua bagian? |  |  |

---

## Rencana Implementasi Saat Ini
1. Perbaiki route publik agar landing page bisa diakses langsung.
2. Lengkapi halaman `src/pages/LandingPage.jsx` dengan struktur landing page.
3. Buat PRD Markdown di repo sebagai bukti dokumentasi.
4. Tambahkan screenshot/commit evidence di laporan akhir.

---

## Catatan Tambahan
- Dalam kode saat ini, `LandingPage` sudah dibuat di `src/pages/LandingPage.jsx`.
- Route publik baru `'/landing'` sudah ditambahkan.
- Root `/` saat ini menggunakan `PublicLanding()` di `App.jsx` dan redirect ke `/dashboard` jika `localStorage.user` terdeteksi.
- Untuk tugas landing page, rute `/landing` bisa dijadikan akses langsung bagi publik.
