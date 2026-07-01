import { Link } from "react-router-dom";
import { ArrowRight, Award, Coffee, ShieldCheck, Sparkles, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E5] text-[#2B1B12]">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-amber-100 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8963B] shadow-sm shadow-amber-200">
              <Coffee className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] uppercase text-amber-700">Papi Coffee</p>
              <p className="text-xs text-[#5F4B3F]">Loyalty Platform</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#2B1B12]">
            <a href="#home" className="transition hover:text-[#E8963B]">Home</a>
            <a href="#fitur" className="transition hover:text-[#E8963B]">Fitur</a>
            <a href="#membership" className="transition hover:text-[#E8963B]">Membership</a>
            <a href="#testimoni" className="transition hover:text-[#E8963B]">Testimoni</a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button className="rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-[#2B1B12] transition hover:bg-amber-50">
              Masuk
            </button>
            <button className="rounded-full bg-[#E8963B] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-300 transition hover:bg-[#c27a2e]">
              Daftar Sekarang
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <section id="home" className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-[#FFF1D0] px-4 py-2 text-sm font-semibold text-[#A46E1F]">
              <Sparkles className="h-4 w-4" />
              Loyalty terbaik untuk startup kopi modern
            </div>
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-[#2B1B12] sm:text-5xl">
                Tingkatkan pengalaman member dengan loyalty tier modern
              </h1>
              <p className="text-base leading-8 text-[#5F4B3F] sm:text-lg">
                Kelola segmen member, point reward, dan upgrade tier dengan satu platform. Cocok untuk coffee shop yang ingin membuat member semakin setia dan transaksi lebih sering.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-[#E8963B] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber-300 transition hover:bg-[#c27a2e]"
              >
                Login Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-white px-6 py-3 text-sm font-semibold text-[#2B1B12] transition hover:bg-amber-50"
              >
                Daftar Sekarang
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-5 shadow-sm shadow-amber-100">
                <p className="text-sm uppercase tracking-[0.2em] text-amber-600">80% Retensi</p>
                <p className="mt-3 text-2xl font-semibold text-[#2B1B12]">Member aktif</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm shadow-amber-100">
                <p className="text-sm uppercase tracking-[0.2em] text-amber-600">3x</p>
                <p className="mt-3 text-2xl font-semibold text-[#2B1B12]">Rata-rata kunjungan</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm shadow-amber-100">
                <p className="text-sm uppercase tracking-[0.2em] text-amber-600">#1</p>
                <p className="mt-3 text-3xl font-semibold text-[#2B1B12]">Loyalty platform kopi</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-amber-200 bg-gradient-to-br from-[#FDF3DC] via-[#F5E1A8] to-white p-8 shadow-[0_30px_90px_rgba(232,150,59,0.16)]">
              <div className="flex items-center justify-between rounded-3xl bg-white/90 p-5 shadow-sm shadow-amber-100">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-600">Dashboard Loyalty</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#2B1B12]">Ringkas dan mudah</h2>
                </div>
                <div className="rounded-2xl bg-[#E8963B] p-3 text-white shadow-md shadow-amber-300">
                  <Coffee className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl bg-white p-5 shadow-sm shadow-amber-100">
                  <p className="text-sm font-medium text-[#2B1B12]">Total Member</p>
                  <p className="mt-3 text-3xl font-semibold text-[#2B1B12]">1,250+</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm shadow-amber-100">
                  <p className="text-sm font-medium text-[#2B1B12]">Total Points</p>
                  <p className="mt-3 text-3xl font-semibold text-[#2B1B12]">82,300</p>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-10 top-16 h-24 w-24 rounded-full bg-[#E8963B]/20 blur-2xl" />
          </div>
        </section>

        <section id="fitur" className="mt-24 space-y-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Keunggulan</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#2B1B12] sm:text-4xl">Fitur loyalty yang membuat member selalu kembali</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5F4B3F]">
              Platform ini dibuat untuk coffee shop yang butuh sistem poin sederhana, reward cepat, dan pengalaman member yang lebih personal.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm shadow-amber-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1D0] text-amber-700">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#2B1B12]">Poin Otomatis</h3>
              <p className="mt-3 text-sm leading-7 text-[#5F4B3F]">Setiap transaksi tercatat otomatis dan dikonversi menjadi poin member tanpa repot.</p>
            </div>
            <div className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm shadow-amber-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1D0] text-amber-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#2B1B12]">Custom Order</h3>
              <p className="mt-3 text-sm leading-7 text-[#5F4B3F]">Kelola pilihan gula No Sugar, Less Sugar, Normal, dan Extra Sugar langsung di profil member.</p>
            </div>
            <div className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm shadow-amber-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1D0] text-amber-700">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#2B1B12]">Reward Cepat</h3>
              <p className="mt-3 text-sm leading-7 text-[#5F4B3F]">Member dapat 1 minuman gratis setiap 50 poin yang dikumpulkan, langsung terlihat di dashboard.</p>
            </div>
          </div>
        </section>

        <section id="membership" className="mt-24">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Membership Tier</p>
            <h2 className="mt-4 text-3xl font-semibold text-[#2B1B12] sm:text-4xl">Silver, Gold, dan Platinum untuk member setia</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5F4B3F]">
              Berikan insentif yang jelas pada setiap level: lebih banyak poin, lebih banyak reward, dan pengalaman personalized untuk pelanggan kopi Anda.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm shadow-amber-100">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">Silver</p>
              <h3 className="mt-4 text-2xl font-semibold text-[#2B1B12]">0 - 199 poin</h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5F4B3F]">
                <li>1 poin per Rp10.000</li>
                <li>Diskon spesial member</li>
                <li>Rekomendasi menu kopi</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-amber-200 bg-[#FFF1D0] p-8 shadow-lg shadow-amber-200">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Gold</p>
              <h3 className="mt-4 text-2xl font-semibold text-[#2B1B12]">200 - 499 poin</h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5F4B3F]">
                <li>Reward minuman gratis setiap 50 poin</li>
                <li>Keuntungan custom order lebih cepat</li>
                <li>Akses promo khusus member</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm shadow-amber-100">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">Platinum</p>
              <h3 className="mt-4 text-2xl font-semibold text-[#2B1B12]">500+ poin</h3>
              <ul className="mt-6 space-y-3 text-sm leading-7 text-[#5F4B3F]">
                <li>Akses preview menu baru</li>
                <li>Hadiah eksklusif ulang tahun</li>
                <li>Service member prioritas</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="testimoni" className="mt-24 rounded-[2rem] bg-[#E8963B] px-6 py-14 text-white shadow-[0_30px_90px_rgba(232,150,59,0.18)] sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#FFF5E8]">Testimoni</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Kata pelanggan yang sudah menikmati program loyalty</h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm leading-7">“Program poinnya bikin saya kembali tiap minggu. Reward kopi gratisnya cepat sekali dicapai.”</p>
              <p className="mt-6 font-semibold">Riska, Member Gold</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm leading-7">“Custom order gula dan promo ulang tahun membuat belanja di Papi Coffee jadi lebih personal.”</p>
              <p className="mt-6 font-semibold">Andi, Member Silver</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm leading-7">“Dashboard loyalty-nya sederhana tapi informatif. Saya tahu kapan bisa naik ke Platinum.”</p>
              <p className="mt-6 font-semibold">Maya, Member Platinum</p>
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-[2rem] border border-amber-100 bg-white p-10 shadow-sm shadow-amber-100 sm:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_0.6fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Bergabung Sekarang</p>
              <h2 className="mt-4 text-3xl font-semibold text-[#2B1B12] sm:text-4xl">Mulai ubah loyalitas pelanggan jadi hasil nyata</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#5F4B3F]">
                Buat program membership yang mudah dikelola, terhubung dengan sistem loyalti, dan siap menarik lebih banyak pelanggan balik ke kedai kopi Anda.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-[#E8963B] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber-300 transition hover:bg-[#c27a2e]"
              >
                Daftar Sekarang
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-white px-6 py-3 text-sm font-semibold text-[#2B1B12] transition hover:bg-amber-50"
              >
                Login
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-24 border-t border-amber-100 pt-10 pb-6 text-sm text-[#5F4B3F]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-semibold text-[#2B1B12]">Papi Coffee</p>
              <p className="mt-3 max-w-xl">CRM loyalty untuk coffee shop modern. Hubungi kami lewat Instagram atau WhatsApp untuk informasi lebih lanjut.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="font-semibold text-[#2B1B12]">Instagram</p>
                <p>@papicoffee.official</p>
              </div>
              <div>
                <p className="font-semibold text-[#2B1B12]">WhatsApp</p>
                <p>0812-3456-7890</p>
              </div>
              <div>
                <p className="font-semibold text-[#2B1B12]">Alamat</p>
                <p>Jalan Kopi No. 88, Bandung</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
