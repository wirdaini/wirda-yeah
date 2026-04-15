import { useState, useMemo } from "react";
import elementsData from "./elements.json";
import ElementsGuest from "./ElementsGuest";
import ElementsAdmin from "./ElementsAdmin";

export default function ElementsApp() {
  const [view, setView] = useState("guest");
  const [search, setSearch] = useState("");
  const [filterGolongan, setFilterGolongan] = useState("");
  const [filterPeriode, setFilterPeriode] = useState("");

  // Ambil daftar unik golongan untuk filter
  const golonganList = [...new Set(elementsData.map(el => el.golongan))];
  const periodeList = [...new Set(elementsData.map(el => el.periode))].sort((a,b) => a-b);

  const filteredData = useMemo(() => {
    return elementsData.filter((el) => {
      const matchSearch = el.nama.toLowerCase().includes(search.toLowerCase()) ||
                          el.simbol.toLowerCase().includes(search.toLowerCase());
      const matchGolongan = filterGolongan ? el.golongan === filterGolongan : true;
      const matchPeriode = filterPeriode ? el.periode === parseInt(filterPeriode) : true;
      return matchSearch && matchGolongan && matchPeriode;
    });
  }, [search, filterGolongan, filterPeriode]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Tabel Periodik Unsur
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              20 Unsur Kimia Pertama
            </p>
          </div>
          <div className="flex bg-white rounded-lg shadow-sm border border-slate-200">
            <button
              onClick={() => setView("guest")}
              className={`px-6 py-2 rounded-lg transition-all text-sm font-medium ${
                view === "guest"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              Guest
            </button>
            <button
              onClick={() => setView("admin")}
              className={`px-6 py-2 rounded-lg transition-all text-sm font-medium ${
                view === "admin"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Cari unsur (nama atau simbol)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 text-sm"
            />
            <select
              value={filterGolongan}
              onChange={(e) => setFilterGolongan(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 bg-white text-sm"
            >
              <option value="">Semua Golongan</option>
              {golonganList.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <select
              value={filterPeriode}
              onChange={(e) => setFilterPeriode(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 bg-white text-sm"
            >
              <option value="">Semua Periode</option>
              {periodeList.map((p) => (
                <option key={p} value={p}>Periode {p}</option>
              ))}
            </select>
          </div>
          <div className="text-xs text-slate-400 mt-3">
            Menampilkan {filteredData.length} dari {elementsData.length} unsur
          </div>
        </div>

        {/* Content */}
        {view === "guest" ? (
          <ElementsGuest data={filteredData} />
        ) : (
          <ElementsAdmin data={filteredData} />
        )}
      </div>
    </div>
  );
}