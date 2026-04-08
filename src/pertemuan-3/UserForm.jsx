import { useState } from "react";

export default function UserForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    birthPlace: "",
    birthDate: "",
    phone: "",
    email: "",
    school: "",
    graduationYear: "",
    selectionPath: "umpcr",
    studyProgram: "trpl"
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Program Studi PCR (Politeknik Caltex Riau)
  const studyPrograms = {
    d3: [
      { value: "trpl_d3", label: "D3 - Teknologi Rekayasa Perangkat Lunak" },
      { value: "tmi_d3", label: "D3 - Teknologi Mekatronika" },
      { value: "tkom_d3", label: "D3 - Teknik Komputer" }
    ],
    d4: [
      { value: "trpl_d4", label: "D4 - Teknologi Rekayasa Perangkat Lunak" },
      { value: "tmi_d4", label: "D4 - Teknologi Mekatronika" },
      { value: "tkom_d4", label: "D4 - Teknik Komputer" },
      { value: "tpb", label: "D4 - Teknologi Pembangkit Energi" },
      { value: "tata", label: "D4 - Teknologi Akuntansi" }
    ]
  };

  // Validasi form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!formData.nik) newErrors.nik = "NIK wajib diisi";
    if (formData.nik && formData.nik.length !== 16) newErrors.nik = "NIK harus 16 digit";
    if (!formData.birthPlace) newErrors.birthPlace = "Tempat lahir wajib diisi";
    if (!formData.birthDate) newErrors.birthDate = "Tanggal lahir wajib diisi";
    if (!formData.phone) newErrors.phone = "Nomor telepon wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.school) newErrors.school = "Asal sekolah wajib diisi";
    if (!formData.graduationYear) newErrors.graduationYear = "Tahun lulus wajib diisi";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const getAvailablePrograms = () => {
    if (formData.selectionPath === "psud") {
      return studyPrograms.d4;
    }
    return [...studyPrograms.d3, ...studyPrograms.d4];
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-12 font-sans">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-[#004B5F] px-6 py-5">
            <h2 className="text-2xl font-bold text-white text-center">
              Formulir Pendaftaran Mahasiswa Baru PCR
            </h2>
            <p className="text-white/80 text-sm text-center mt-1">
              Isi data diri Anda dengan benar dan lengkap
            </p>
          </div>

          <div className="p-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Data Pribadi */}
                <div>
                  <h3 className="text-lg font-semibold text-[#004B5F] border-b border-gray-200 pb-2 mb-4">
                    Data Pribadi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Sesuai dengan Ijazah/KTP"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B5F] ${
                          errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">⚠️ {errors.fullName}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        NIK <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nik"
                        value={formData.nik}
                        onChange={handleChange}
                        placeholder="16 digit angka"
                        maxLength="16"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B5F] ${
                          errors.nik ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.nik && <p className="text-red-500 text-xs mt-1">⚠️ {errors.nik}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Tempat Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleChange}
                        placeholder="Contoh: Pekanbaru"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B5F] ${
                          errors.birthPlace ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.birthPlace && <p className="text-red-500 text-xs mt-1">⚠️ {errors.birthPlace}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B5F] ${
                          errors.birthDate ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.birthDate && <p className="text-red-500 text-xs mt-1">⚠️ {errors.birthDate}</p>}
                    </div>
                  </div>
                </div>

                {/* Kontak */}
                <div>
                  <h3 className="text-lg font-semibold text-[#004B5F] border-b border-gray-200 pb-2 mb-4">
                    Kontak
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Nomor Telepon/WA <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08xxxxxxxxxx"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B5F] ${
                          errors.phone ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">⚠️ {errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B5F] ${
                          errors.email ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Data Pendidikan */}
                <div>
                  <h3 className="text-lg font-semibold text-[#004B5F] border-b border-gray-200 pb-2 mb-4">
                    Data Pendidikan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Asal Sekolah <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        placeholder="Nama SMA/SMK/MA"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B5F] ${
                          errors.school ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                      />
                      {errors.school && <p className="text-red-500 text-xs mt-1">⚠️ {errors.school}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Tahun Lulus <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B5F] ${
                          errors.graduationYear ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                      >
                        <option value="">Pilih Tahun Lulus</option>
                        {[2026, 2025, 2024, 2023, 2022].map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.graduationYear && <p className="text-red-500 text-xs mt-1">⚠️ {errors.graduationYear}</p>}
                    </div>
                  </div>
                </div>

                {/* Pilihan Seleksi */}
                <div>
                  <h3 className="text-lg font-semibold text-[#004B5F] border-b border-gray-200 pb-2 mb-4">
                    Pilihan Seleksi
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Jalur Masuk <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "psud", label: "PSUD", desc: "Nilai Rapor" },
                          { value: "umpcr", label: "UMPCR", desc: "CBT Terjadwal" },
                          { value: "mandiri", label: "Mandiri", desc: "Jadwal Fleksibel" }
                        ].map(jalur => (
                          <label
                            key={jalur.value}
                            className={`cursor-pointer border-2 rounded-lg p-3 text-center transition-all ${
                              formData.selectionPath === jalur.value
                                ? "border-[#004B5F] bg-[#004B5F]/5"
                                : "border-gray-200 hover:border-[#004B5F]/30"
                            }`}
                          >
                            <input
                              type="radio"
                              name="selectionPath"
                              value={jalur.value}
                              checked={formData.selectionPath === jalur.value}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <div className="font-semibold text-sm">{jalur.label}</div>
                            <div className="text-xs text-gray-400">{jalur.desc}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Program Studi Pilihan <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="studyProgram"
                        value={formData.studyProgram}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004B5F]"
                      >
                        <option value="">Pilih Program Studi</option>
                        {getAvailablePrograms().map(prodi => (
                          <option key={prodi.value} value={prodi.value}>{prodi.label}</option>
                        ))}
                      </select>
                      {formData.selectionPath === "psud" && (
                        <p className="text-xs text-gray-400 mt-1">* Jalur PSUD hanya untuk jenjang D4/Sarjana Terapan</p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#004B5F] hover:bg-[#003545] text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
                >
                  Daftar Sekarang
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-[#004B5F] mb-2">
                  Pendaftaran Berhasil!
                </h3>
                <p className="text-gray-500 mb-6">
                  Terima kasih, <span className="font-semibold">{formData.fullName}</span>
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 text-left space-y-3 mb-6">
                  <p className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Nama Lengkap:</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </p>
                  <p className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">NIK:</span>
                    <span className="font-mono text-sm">{formData.nik}</span>
                  </p>
                  <p className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Email/No. HP:</span>
                    <span>{formData.email} / {formData.phone}</span>
                  </p>
                  <p className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Asal Sekolah:</span>
                    <span>{formData.school} ({formData.graduationYear})</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Jalur/Prodi:</span>
                    <span className="font-medium uppercase">{formData.selectionPath} - {formData.studyProgram}</span>
                  </p>
                </div>
                
                <div className="bg-[#004B5F]/10 rounded-xl p-4 text-sm text-[#004B5F]">
                  <p>📋 Selanjutnya, panitia PMB akan menghubungi Anda untuk jadwal ujian.</p>
                </div>
                
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: "", nik: "", birthPlace: "", birthDate: "", phone: "", email: "",
                      school: "", graduationYear: "", selectionPath: "umpcr", studyProgram: "trpl"
                    });
                  }}
                  className="mt-6 text-gray-400 hover:text-gray-600 text-sm underline"
                >
                  ← Kembali ke Form Pendaftaran
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER - Tambahkan ini di paling bawah */}
      <footer className="bg-[#004B5F] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            Politeknik Caltex Riau — Jl. Umban Sari No. 1, Rumbai, Pekanbaru, Riau 28265
          </p>
          <p className="text-xs text-white/70 mt-3">
            © 2026 Penerimaan Mahasiswa Baru Politeknik Caltex Riau | Akreditasi Institusi BAN-PT
          </p>
        </div>
      </footer>
    </>
  );
}