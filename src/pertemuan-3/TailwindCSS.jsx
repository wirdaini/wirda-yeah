import React from "react";

export default function TailwindCSS() {
  return (
    <div className="font-sans antialiased" style={{ fontFamily: "'Barlow', system-ui, sans-serif" }}>
      
      {/* HEADER - Midnight Green (Warna Resmi PCR) */}
      <div className="bg-[#004B5F] text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-3 md:mb-0">
            <h1 className="text-2xl font-bold tracking-tight">POLITEKNIK CALTEX RIAU</h1>
            <p className="text-sm text-white/80">Empowers You to Global Competition</p>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="border-l border-white/30 pl-4">Akreditasi BAN-PT</span>
            <span>Kampus Vokasi Terbaik</span>
          </div>
        </div>
      </div>

      {/* HERO SECTION - PMB PCR */}
      <div className="relative bg-gradient-to-br from-[#004B5F]/5 via-white to-[#EE152A]/5 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-[#EE152A] text-white rounded-full text-xs font-semibold tracking-wide">
            PMB 2026/2027
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#004B5F] mb-4">
            Penerimaan Mahasiswa Baru
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Politeknik Caltex Riau — Kampus Vokasi Berstandar Industri
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-[#004B5F] rounded-full"></span>
              <span>8 Program Studi</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-[#EE152A] rounded-full"></span>
              <span>Beasiswa Tersedia</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-[#004B5F] rounded-full"></span>
              <span>Kampus Ramah Lingkungan</span>
            </div>
          </div>
        </div>
      </div>

      {/* JALUR SELEKSI - Card Informasi */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md border-l-4 border-[#004B5F] p-5">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-bold text-[#004B5F] text-lg">PSUD</h3>
            <p className="text-gray-500 text-sm mt-1">Penjaringan Siswa Unggul Daerah</p>
            <p className="text-xs text-gray-400 mt-2">Gratis biaya pendaftaran</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border-l-4 border-[#EE152A] p-5">
            <div className="text-3xl mb-2">💻</div>
            <h3 className="font-bold text-[#EE152A] text-lg">UMPCR</h3>
            <p className="text-gray-500 text-sm mt-1">Ujian Masuk Politeknik Caltex Riau</p>
            <p className="text-xs text-gray-400 mt-2">Computer Based Test (CBT)</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border-l-4 border-[#004B5F] p-5">
            <div className="text-3xl mb-2">✍️</div>
            <h3 className="font-bold text-[#004B5F] text-lg">Ujian Mandiri</h3>
            <p className="text-gray-500 text-sm mt-1">Jadwal fleksibel setiap hari kerja</p>
            <p className="text-xs text-gray-400 mt-2">Hasil langsung diketahui</p>
          </div>
        </div>
      </div>

      {/* INFO PENTING */}
      <div className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border-l-4 border-[#EE152A] shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">📋 Persyaratan Pendaftaran</h4>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Fotokopi Ijazah/SKL (1 lembar)</li>
                <li>• Fotokopi KTP (1 lembar)</li>
                <li>• Pas foto terbaru 3x4 (2 lembar)</li>
                <li>• Mengisi formulir pendaftaran online</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl border-l-4 border-[#004B5F] shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">⏰ Jadwal PMB 2026/2027</h4>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Pendaftaran: Januari - Agustus 2026</li>
                <li>• UMPCR Gel 1: Maret 2026</li>
                <li>• UMPCR Gel 2: Juni 2026</li>
                <li>• UMPCR Gel 3: Agustus 2026</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}