import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Coffee,
  ShieldCheck,
  Sparkles,
  Users,
  CupSoda,
  Leaf,
  Cookie,
  Cake,
  Droplet,
  Star,
  Flame,
  Mail,
  Instagram,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { usersAPI } from "../services/usersAPI";
import logo from "../assets/logo.png";
import products from "../data/products.json";

const CATEGORY_ICONS = {
  "Kopi Susu": Coffee,
  "Non Coffee": CupSoda,
  "Black Coffee": Droplet,
  "Matcha Series": Leaf,
  "Affogato Series": Sparkles,
  Snack: Cookie,
};

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Rating & jumlah review deterministik dari id produk (bukan foto+harga polos)
function getProductRating(id) {
  const rating = (3.8 + ((id * 7) % 12) / 10).toFixed(1);
  const reviews = 80 + ((id * 53) % 420);
  return { rating, reviews };
}

function ProductRating({ id }) {
  const { rating, reviews } = getProductRating(id);
  return (
    <div className="mt-2 flex items-center gap-1.5 text-xs text-coffee-600">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      <span className="font-semibold text-coffee-800">{rating}</span>
      <span className="text-coffee-400">·</span>
      <span>{reviews} ulasan</span>
    </div>
  );
}

function ProductCardItem({ item, popular }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-coffee-200 bg-white shadow-sm transition hover:shadow-md">
      {popular && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-coffee-900/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
          <Flame className="h-3 w-3 text-amber-400" />
          Populer minggu ini
        </div>
      )}
      <div className="aspect-square w-full overflow-hidden bg-coffee-50">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-coffee-500">{item.category}</p>
        <h3 className="mt-1 text-base font-semibold text-coffee-900">{item.title}</h3>
        <ProductRating id={item.id} />
        <p className="mt-2 text-sm font-semibold text-coffee-800">Rp{item.price.toLocaleString("id-ID")}</p>
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  { name: "Riska", tier: "Member Gold", quote: "Program poinnya bikin saya kembali tiap minggu. Reward kopi gratisnya cepat sekali dicapai." },
  { name: "Andi", tier: "Member Silver", quote: "Custom order gula dan promo ulang tahun bikin belanja di Papi Coffee jadi lebih personal.", highlight: true },
  { name: "Maya", tier: "Member Platinum", quote: "Dashboard loyalty-nya sederhana tapi informatif. Saya tahu kapan bisa naik ke Platinum." },
  { name: "Budi", tier: "Member Gold", quote: "Antrian pesanan gampang dipantau, jadi nggak perlu nunggu lama di kasir." },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birth: "",
    sugar: "Normal",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      await usersAPI.createUser({
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        birth: formData.birth,
        sugar: formData.sugar,
        role: "member",
        poin: 0,
        tier: "Silver",
        segmen: "Pelanggan Baru",
      });
      alert("Pendaftaran berhasil! Silakan login untuk masuk ke dashboard.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Gagal mendaftar.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(products.map((item) => item.category))].slice(0, 6);
  const menuFavorit = products.slice(0, 4);
  const menuTerlaris = products.slice(4, 8);

  // Data bento grid promo — ambil foto asli dari products.json per kategori,
  // ukuran kotak campur (besar / sedang / kecil) biar nggak seragam kayak sebelumnya
  const bySlug = (slug) => products.find((p) => p.category === slug);
  const bentoBig = bySlug("Kopi Susu");
  const bentoMed1 = bySlug("Matcha Series");
  const bentoMed2 = bySlug("Snack");
  const bentoSmall1 = bySlug("Affogato Series");
  const bentoSmall2 = bySlug("Non Coffee");

  return (
    <div className="min-h-screen bg-white text-coffee-800">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-coffee-300 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full shadow-sm">
              <img src={logo} alt="Papi Coffee" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-coffee-600">Papi Coffee</p>
              <p className="text-xs text-coffee-700">Loyalty Platform</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-coffee-800 lg:flex">
            <a href="#home" className="transition hover:text-coffee-500">Home</a>
            <a href="#menu" className="transition hover:text-coffee-500">Menu</a>
            <a href="#fitur" className="transition hover:text-coffee-500">Fitur</a>
            <a href="#membership" className="transition hover:text-coffee-500">Membership</a>
            <a href="#testimoni" className="transition hover:text-coffee-500">Testimoni</a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-full border border-coffee-300 bg-white px-4 py-2 text-sm font-semibold text-coffee-800 transition hover:bg-coffee-50"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-coffee-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-coffee-300 transition hover:bg-coffee-600"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO — split asimetris: headline kiri, foto besar kanan (bukan center generik) */}
        <section id="home" className="mx-auto max-w-7xl px-6 pt-14 pb-20 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-coffee-300 bg-coffee-100 px-4 py-2 text-sm font-semibold text-coffee-600">
                <Sparkles className="h-4 w-4" />
                Loyalty platform coffee shop lokal
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-coffee-900 sm:text-5xl">
                Tiap cangkir kopi, <span className="text-coffee-500">satu langkah</span> lebih dekat ke reward
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-coffee-700">
                Papi Coffee mencatat setiap transaksi jadi poin otomatis. Member naik tier, dapat minuman gratis, dan staff pantau semuanya dari satu dashboard.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-coffee-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-coffee-300 transition hover:bg-coffee-600"
                >
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-coffee-300 bg-white px-6 py-3 text-sm font-semibold text-coffee-800 transition hover:bg-coffee-50"
                >
                  Masuk
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-coffee-200 pt-8">
                <div>
                  <p className="text-2xl font-semibold text-coffee-900">1.250+</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-coffee-600">Member aktif</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-coffee-900">82.3K</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-coffee-600">Poin ditukar</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-coffee-900">80%</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-coffee-600">Retensi member</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] bg-coffee-900">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80"
                  alt="Barista menyeduh kopi"
                  className="h-[420px] w-full object-cover opacity-90"
                />
              </div>
              <div className="absolute -bottom-8 left-6 w-64 rounded-2xl border border-coffee-200 bg-white p-5 shadow-lg sm:w-72">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-coffee-600">Menu favorit</p>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-500 text-white">
                    <Coffee className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-2 text-lg font-semibold text-coffee-900">Americano</p>
                <p className="text-sm text-coffee-600">4 kali dipesan bulan ini</p>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID PROMO — persis di bawah hero, ukuran kotak campur (besar/sedang/kecil),
            pakai foto menu asli dari products.json, bukan grid seragam lagi */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-coffee-600">Promo Berjalan</p>
              <h2 className="mt-2 text-2xl font-semibold text-coffee-900 sm:text-3xl">Pilihan menu lagi rame dipesan</h2>
            </div>
          </div>

          <div className="grid h-[520px] grid-cols-5 grid-rows-2 gap-4">
            {/* Banner besar */}
            <Link
              to="/login"
              className="group relative col-span-2 row-span-2 overflow-hidden rounded-[1.75rem]"
            >
              <img
                src={bentoBig?.image}
                alt={bentoBig?.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-coffee-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-coffee-200">Kopi Susu Series</p>
                <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">Creamy, manis pas, harga bersahabat</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white">
                  Lihat menu <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            {/* Kotak sedang 1 */}
            <Link
              to="/login"
              className="group relative col-span-2 col-start-3 row-span-1 row-start-1 overflow-hidden rounded-[1.5rem]"
            >
              <img
                src={bentoMed1?.image}
                alt={bentoMed1?.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/75 via-coffee-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee-200">Matcha Series</p>
                <p className="mt-1 text-base font-semibold text-white">Racikan matcha premium</p>
              </div>
            </Link>

            {/* Kotak sedang 2 — tinggi penuh di kanan */}
            <Link
              to="/login"
              className="group relative col-span-1 col-start-5 row-span-2 row-start-1 overflow-hidden rounded-[1.5rem]"
            >
              <img
                src={bentoMed2?.image}
                alt={bentoMed2?.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/75 via-coffee-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coffee-200">Snack</p>
                <p className="mt-1 text-sm font-semibold text-white">Temen ngobrol santai</p>
              </div>
            </Link>

            {/* Banner kecil 1 */}
            <Link
              to="/login"
              className="group relative col-span-1 col-start-3 row-span-1 row-start-2 overflow-hidden rounded-[1.25rem]"
            >
              <img
                src={bentoSmall1?.image}
                alt={bentoSmall1?.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/75 via-coffee-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-xs font-semibold text-white">Affogato Series</p>
              </div>
            </Link>

            {/* Banner kecil 2 */}
            <Link
              to="/login"
              className="group relative col-span-1 col-start-4 row-span-1 row-start-2 overflow-hidden rounded-[1.25rem]"
            >
              <img
                src={bentoSmall2?.image}
                alt={bentoSmall2?.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/75 via-coffee-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-xs font-semibold text-white">Non Coffee</p>
              </div>
            </Link>
          </div>
        </section>

        {/* STRIP KATEGORI */}
        <section className="border-y border-coffee-200 bg-coffee-50/60">
          <div className="mx-auto max-w-7xl px-6 py-10">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:justify-between">
              {categories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat] || Coffee;
                return (
                  <div key={cat} className="flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-coffee-600 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-coffee-800">{cat}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MENU FAVORIT */}
        <section id="menu" className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-coffee-600">Menu Favorit</p>
              <h2 className="mt-3 text-3xl font-semibold text-coffee-900 sm:text-4xl">Paling sering dipesan minggu ini</h2>
            </div>
            <Link to="/login" className="hidden text-sm font-semibold text-coffee-600 hover:text-coffee-800 sm:block">
              Lihat semua menu →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {menuFavorit.map((item, index) => (
              <ProductCardItem key={item.id} item={item} popular={index < 2} />
            ))}
          </div>
        </section>

        {/* BANNER PROMO — full width, khas dealport, isinya loyalty (bukan diskon checkout) */}
        <section className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-6 rounded-[2rem] bg-coffee-900 px-8 py-12 text-center text-white sm:px-14 lg:flex-row lg:justify-between lg:text-left">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-coffee-300">Loyalty Program</p>
              <h3 className="mt-3 max-w-xl text-2xl font-semibold sm:text-3xl">1 minuman gratis setiap 50 poin yang kamu kumpulkan</h3>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-coffee-900 shadow-md transition hover:bg-coffee-100"
            >
              Mulai Kumpulkan Poin
            </Link>
          </div>
        </section>

        {/* FITUR — 1 kartu besar + 2 kecil, bukan 3 kartu identik */}
        <section id="fitur" className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm uppercase tracking-[0.3em] text-coffee-600">Keunggulan</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold text-coffee-900 sm:text-4xl">Fitur yang membuat member selalu balik lagi</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[2rem] border border-coffee-200 bg-coffee-100 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-500 text-white">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-coffee-900">Poin otomatis, tanpa repot</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-coffee-700">
                Setiap transaksi di kasir langsung tercatat dan dikonversi jadi poin member — nggak perlu isi manual atau scan kartu terpisah.
              </p>
            </div>
            <div className="grid gap-6">
              <div className="rounded-2xl border border-coffee-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coffee-100 text-coffee-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-coffee-900">Custom order</h3>
                <p className="mt-2 text-sm leading-6 text-coffee-700">Preferensi gula tersimpan di profil member.</p>
              </div>
              <div className="rounded-2xl border border-coffee-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coffee-100 text-coffee-600">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-coffee-900">Reward cepat</h3>
                <p className="mt-2 text-sm leading-6 text-coffee-700">Progress ke reward berikutnya kelihatan langsung di dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MENU TERLARIS — grid produk kedua */}
        {menuTerlaris.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-coffee-600">Menu Terlaris</p>
                <h2 className="mt-3 text-3xl font-semibold text-coffee-900 sm:text-4xl">Rekomendasi barista Papi Coffee</h2>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {menuTerlaris.map((item, index) => (
                <ProductCardItem key={item.id} item={item} popular={index === 1} />
              ))}
            </div>
          </section>
        )}

        {/* MEMBERSHIP */}
        <section id="membership" className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm uppercase tracking-[0.3em] text-coffee-600">Membership Tier</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-coffee-900 sm:text-4xl">Silver, Gold, dan Platinum untuk member setia</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-coffee-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coffee-500">Silver</p>
              <h3 className="mt-4 text-2xl font-semibold text-coffee-900">0–199 poin</h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-coffee-700">
                <li>1 poin per Rp10.000</li>
                <li>Diskon spesial member</li>
                <li>Rekomendasi menu kopi</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-coffee-500 bg-coffee-900 p-8 text-white shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coffee-300">Gold</p>
              <h3 className="mt-4 text-2xl font-semibold">200–499 poin</h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-coffee-100">
                <li>Reward minuman gratis setiap 50 poin</li>
                <li>Custom order lebih cepat</li>
                <li>Akses promo khusus member</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-coffee-200 bg-white p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coffee-500">Platinum</p>
              <h3 className="mt-4 text-2xl font-semibold text-coffee-900">500+ poin</h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-coffee-700">
                <li>Preview menu baru lebih dulu</li>
                <li>Hadiah eksklusif ulang tahun</li>
                <li>Prioritas layanan</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TESTIMONI — avatar inisial, satu kartu di-highlight */}
        <section id="testimoni" className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-coffee-600">Testimoni</p>
            <h2 className="mt-3 text-3xl font-semibold text-coffee-900 sm:text-4xl">Kata member Papi Coffee</h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className={`rounded-2xl border p-6 ${
                  t.highlight ? "border-coffee-500 bg-coffee-100" : "border-coffee-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coffee-500 text-sm font-semibold text-white">
                    {initials(t.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-coffee-900">{t.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-coffee-700">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-xs uppercase tracking-wide text-coffee-500">{t.tier}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-coffee-200 bg-coffee-50 px-8 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-lg font-semibold text-coffee-900">Dapatkan info promo terbaru</p>
              <p className="mt-1 text-sm text-coffee-700">Kabar reward dan menu baru langsung ke email kamu.</p>
            </div>
            <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-coffee-300 bg-white p-1.5 pl-4">
              <Mail className="h-4 w-4 text-coffee-500" />
              <input
                type="email"
                placeholder="Alamat email"
                className="w-full bg-transparent text-sm text-coffee-800 outline-none"
              />
              <button
                type="button"
                className="whitespace-nowrap rounded-full bg-coffee-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-coffee-600"
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* FORM PENDAFTARAN */}
        <section id="daftar" className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-10 rounded-[2rem] border border-coffee-200 bg-white p-10 shadow-sm lg:grid-cols-[0.8fr_0.6fr] lg:items-center sm:p-14">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-coffee-600">Form Pendaftaran</p>
              <h2 className="mt-4 text-3xl font-semibold text-coffee-900 sm:text-4xl">Daftar member dan mulai kumpulkan poin</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-coffee-700">
                Isi data singkat di bawah untuk mengamankan akun membermu dan nikmati loyalty program khusus Papi Coffee.
              </p>
            </div>
            <form className="space-y-4 rounded-2xl border border-coffee-200 bg-coffee-50 p-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label className="mb-2 block text-sm font-semibold text-coffee-800">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Dita Rahma"
                  className="w-full rounded-xl border border-coffee-300 bg-white px-4 py-3 text-sm text-coffee-800 shadow-sm outline-none focus:border-coffee-500"
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-coffee-800">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@contoh.com"
                    className="w-full rounded-xl border border-coffee-300 bg-white px-4 py-3 text-sm text-coffee-800 shadow-sm outline-none focus:border-coffee-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-coffee-800">No. HP</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812xxxxxxx"
                    className="w-full rounded-xl border border-coffee-300 bg-white px-4 py-3 text-sm text-coffee-800 shadow-sm outline-none focus:border-coffee-500"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-coffee-800">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 6 karakter"
                    className="w-full rounded-xl border border-coffee-300 bg-white px-4 py-3 text-sm text-coffee-800 shadow-sm outline-none focus:border-coffee-500"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-coffee-800">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi password"
                    className="w-full rounded-xl border border-coffee-300 bg-white px-4 py-3 text-sm text-coffee-800 shadow-sm outline-none focus:border-coffee-500"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-coffee-800">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="birth"
                    value={formData.birth}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-coffee-300 bg-white px-4 py-3 text-sm text-coffee-800 shadow-sm outline-none focus:border-coffee-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-coffee-800">Preferensi Gula</label>
                  <select
                    name="sugar"
                    value={formData.sugar}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-coffee-300 bg-white px-4 py-3 text-sm text-coffee-800 shadow-sm outline-none focus:border-coffee-500"
                  >
                    <option>No Sugar</option>
                    <option>Less Sugar</option>
                    <option>Normal</option>
                    <option>Extra Sugar</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-coffee-800 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-coffee-900 disabled:opacity-60"
              >
                {loading ? "Memproses..." : "Kirim Pendaftaran"}
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER — 4 kolom seperti Dealport */}
        <footer className="border-t border-coffee-200 bg-coffee-50">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full">
                    <img src={logo} alt="Papi Coffee" className="h-full w-full object-contain" />
                  </div>
                  <p className="font-semibold text-coffee-900">Papi Coffee</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-coffee-700">
                  CRM loyalty untuk coffee shop modern. Kelola member, poin, dan reward dalam satu platform.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-coffee-900">Customer Support</p>
                <ul className="mt-4 space-y-3 text-sm text-coffee-700">
                  <li className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-coffee-500" /> 0823-8514-0539
                  </li>
                  <li className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-coffee-500" /> @papi.coffee
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coffee-500" />
                    Jl. Paus No.1, Limbungan Baru, Rumbai, Kota Pekanbaru, Riau 28266
                  </li>
                  <li className="pl-6 text-xs text-coffee-500">Buka setiap hari, 07.30–22.00</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-coffee-900">Explore</p>
                <ul className="mt-4 space-y-3 text-sm text-coffee-700">
                  <li><a href="#menu" className="hover:text-coffee-500">Menu</a></li>
                  <li><a href="#membership" className="hover:text-coffee-500">Membership</a></li>
                  <li><a href="#testimoni" className="hover:text-coffee-500">Testimoni</a></li>
                  <li><Link to="/register" className="hover:text-coffee-500">Daftar Member</Link></li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-coffee-900">Legal</p>
                <ul className="mt-4 space-y-3 text-sm text-coffee-700">
                  <li>Syarat & Ketentuan</li>
                  <li>Kebijakan Privasi</li>
                  <li>Ketentuan Poin & Reward</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4 border-t border-coffee-200 pt-6 text-xs text-coffee-600 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 Papi Coffee. Seluruh hak cipta dilindungi.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}