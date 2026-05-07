import { Calendar, Users, Tag } from "lucide-react";

export default function CampaignCard({ campaign }) {
  const statusColors = {
    Aktif: "bg-green-100 text-green-800 border-green-200",
    Terjadwal: "bg-blue-100 text-blue-800 border-blue-200",
    Selesai: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{campaign.nama}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{campaign.deskripsi}</p>
        </div>
        <span
          className={`ml-3 px-3 py-1 rounded-full text-xs font-medium border ${
            statusColors[campaign.status] || statusColors.Terjadwal
          }`}
        >
          {campaign.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Tag className="w-4 h-4 text-amber-600" />
          <span className="font-medium text-amber-700">{campaign.diskon}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{campaign.targetSegmen}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(campaign.tanggalMulai).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            })}{" "}
            -{" "}
            {new Date(campaign.tanggalSelesai).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
        <span className="text-gray-600">
          <span className="font-semibold text-gray-900">{campaign.jumlahPengguna}</span> dari{" "}
          {campaign.estimasiJangkauan} pengguna
        </span>
        <div className="text-xs text-gray-500">
          {Math.round((campaign.jumlahPengguna / campaign.estimasiJangkauan) * 100)}%
        </div>
      </div>
    </div>
  );
}