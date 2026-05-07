import { Star, User, Clock } from "lucide-react";

const statusColors = {
  Open: "bg-red-100 text-red-800 border-red-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
  Closed: "bg-gray-100 text-gray-800 border-gray-200",
};

const categoryColors = {
  Produk: "bg-purple-50 text-purple-700",
  Pelayanan: "bg-blue-50 text-blue-700",
  Fasilitas: "bg-green-50 text-green-700",
  Sistem: "bg-orange-50 text-orange-700",
  Pujian: "bg-pink-50 text-pink-700",
  Saran: "bg-indigo-50 text-indigo-700",
};

// Hanya SATU export default, dan tanpa interface
export default function FeedbackTicket({ feedback = {} }) {
  // Default value jika feedback tidak ada
  const {
    id = "#FB001",
    status = "Open",
    kategori = "Pelayanan",
    namaPelanggan = "Pelanggan",
    keluhan = "Tidak ada keluhan",
    tanggal = new Date().toISOString(),
    penanganan = "Belum ditangani",
    rating = 3
  } = feedback;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-900">{id}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                statusColors[status] || statusColors.Open
              }`}
            >
              {status}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                categoryColors[kategori] || categoryColors.Pelayanan
              }`}
            >
              {kategori}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <User className="w-3.5 h-3.5" />
            <span>{namaPelanggan}</span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{keluhan}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>
                {new Date(tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <span>•</span>
            <span>Penanganan: {penanganan}</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5 ml-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}