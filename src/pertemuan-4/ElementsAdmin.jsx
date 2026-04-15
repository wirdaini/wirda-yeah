export default function ElementsAdmin({ data }) {
  // Warna background per golongan untuk baris tabel
  const getRowColor = (golongan) => {
    const colors = {
      "Nonlogam": "bg-slate-50/50",
      "Gas Mulia": "bg-indigo-50/30",
      "Logam Alkali": "bg-emerald-50/30",
      "Logam Alkali Tanah": "bg-teal-50/30",
      "Metaloid": "bg-amber-50/30",
      "Halogen": "bg-cyan-50/30",
      "Logam": "bg-blue-50/30",
    };
    return colors[golongan] || "";
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md">
      {/* Header dengan judul dan statistik */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-white font-semibold text-lg">Data Tabel Periodik</h2>
          <p className="text-slate-300 text-xs mt-0.5">20 Unsur Kimia Pertama</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white text-sm font-medium">{data.length} Unsur</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">No</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Simbol</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nama Unsur</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nomor Atom</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Massa Atom</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Golongan</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Periode</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Penemu</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Titik Leleh</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Titik Didih</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Konfigurasi Elektron</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((el, idx) => (
              <tr 
                key={el.id} 
                className={`${getRowColor(el.golongan)} hover:shadow-inner hover:bg-slate-100/80 transition-all duration-150`}
              >
                {/* Nomor urut dengan badge */}
                <td className="px-4 py-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-200 text-slate-600 rounded-full text-xs font-medium">
                    {idx + 1}
                  </span>
                 </td>
                
                {/* Simbol - tampil menonjol */}
                <td className="px-4 py-3">
                  <span className="font-mono font-bold text-lg text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                    {el.simbol}
                  </span>
                 </td>
                
                {/* Nama */}
                <td className="px-4 py-3 font-medium text-slate-700">{el.nama}</td>
                
                {/* Nomor Atom */}
                <td className="px-4 py-3 font-mono text-slate-600">{el.nomor_atom}</td>
                
                {/* Massa Atom */}
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{el.massa_atom}</td>
                
                {/* Golongan dengan badge warna */}
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    el.golongan === "Nonlogam" ? "bg-slate-200 text-slate-700" :
                    el.golongan === "Gas Mulia" ? "bg-indigo-100 text-indigo-700" :
                    el.golongan === "Logam Alkali" ? "bg-emerald-100 text-emerald-700" :
                    el.golongan === "Logam Alkali Tanah" ? "bg-teal-100 text-teal-700" :
                    el.golongan === "Metaloid" ? "bg-amber-100 text-amber-700" :
                    el.golongan === "Halogen" ? "bg-cyan-100 text-cyan-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {el.golongan}
                  </span>
                 </td>
                
                {/* Periode */}
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                    Periode {el.periode}
                  </span>
                 </td>
                
                {/* Penemu */}
                <td className="px-4 py-3 text-xs">
                  <div className="font-medium text-slate-700">{el.penemu.nama}</div>
                  <div className="text-slate-400 text-[10px] flex items-center gap-1">
                    <span>📅 {el.penemu.tahun > 0 ? el.penemu.tahun : "Kuno"}</span>
                    <span>•</span>
                    <span>🌍 {el.penemu.negara}</span>
                  </div>
                 </td>
                
                {/* Titik Leleh */}
                <td className="px-4 py-3 font-mono text-xs">
                  {el.sifat_fisik.titik_leleh > 0 ? `${el.sifat_fisik.titik_leleh}°C` : 
                   el.sifat_fisik.titik_leleh < 0 ? `${el.sifat_fisik.titik_leleh}°C` : "-"}
                 </td>
                
                {/* Titik Didih */}
                <td className="px-4 py-3 font-mono text-xs">
                  {el.sifat_fisik.titik_didih > 0 ? `${el.sifat_fisik.titik_didih}°C` : 
                   el.sifat_fisik.titik_didih < 0 ? `${el.sifat_fisik.titik_didih}°C` : "-"}
                 </td>
                
                {/* Konfigurasi Elektron */}
                <td className="px-4 py-3">
                  <div className="font-mono text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded inline-block">
                    {el.konfigurasi_elektron.kulit}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    valensi {el.konfigurasi_elektron.valensi}
                  </div>
                 </td>
               </tr>
            ))}
          </tbody>
         </table>
      </div>

      {/* Footer dengan keterangan */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-400 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full"></span>
          <span>Logam Alkali</span>
          <span className="inline-block w-2 h-2 bg-teal-400 rounded-full ml-2"></span>
          <span>Logam Alkali Tanah</span>
          <span className="inline-block w-2 h-2 bg-amber-400 rounded-full ml-2"></span>
          <span>Metaloid</span>
        </div>
        <div>
          {data.length} dari 20 unsur ditampilkan
        </div>
      </div>
    </div>
  );
}