export default function ElementsGuest({ data }) {
  const getGolonganColor = (golongan) => {
    const colors = {
      "Nonlogam": "bg-slate-100 border-slate-300",
      "Gas Mulia": "bg-indigo-50 border-indigo-200",
      "Logam Alkali": "bg-emerald-50 border-emerald-200",
      "Logam Alkali Tanah": "bg-teal-50 border-teal-200",
      "Metaloid": "bg-amber-50 border-amber-200",
      "Halogen": "bg-cyan-50 border-cyan-200",
      "Logam": "bg-blue-50 border-blue-200",
    };
    return colors[golongan] || "bg-white border-slate-200";
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.map((el) => (
        <div
          key={el.id}
          className={`${getGolonganColor(el.golongan)} border rounded-md p-4 transition-all hover:shadow-md hover:-translate-y-0.5`}
        >
          {/* Nomor Atom */}
          <div className="text-xs text-slate-400 mb-1">{el.nomor_atom}</div>
          
          {/* Baris: Simbol Besar di kiri, GAMBAR di kanan */}
          <div className="flex items-center justify-between gap-3 my-1">
            {/* Simbol Besar */}
            <div className="text-4xl font-bold text-slate-800 tracking-tight">
              {el.simbol}
            </div>
            {/* GAMBAR dari folder assets */}
            <div className="w-26 h-24 bg-white/70 rounded-lg border-2 border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={new URL(`../assets/elements/${el.simbol}.jpg`, import.meta.url).href}
                alt={el.nama}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/64x64/e2e8f0/475569?text=?";
                }}
              />
            </div>
          </div>
          
          {/* Nama */}
          <div className="text-sm font-medium text-slate-700 mt-2">
            {el.nama}
          </div>
          
          {/* Massa Atom */}
          <div className="text-[11px] text-slate-400 mt-1">
            {el.massa_atom} u
          </div>
          
          {/* Golongan & Periode */}
          <div className="mt-3 pt-2 border-t border-slate-200/50 text-[10px] text-slate-400 flex justify-between">
            <span>{el.golongan}</span>
            <span>Periode {el.periode}</span>
          </div>
        </div>
      ))}
    </div>
  );
}