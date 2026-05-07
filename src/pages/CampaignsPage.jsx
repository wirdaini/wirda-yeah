import { Plus, Filter } from "lucide-react";
import CampaignCard from "../components/CampaignCard";
import campaignsData from "../data/campaigns.json";
import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function CampaignsPage() {
  const [filter, setFilter] = useState("Semua");

  const filteredCampaigns =
    filter === "Semua"
      ? campaignsData
      : campaignsData.filter((c) => c.status === filter);

  const statusCounts = {
    Aktif: campaignsData.filter((c) => c.status === "Aktif").length,
    Terjadwal: campaignsData.filter((c) => c.status === "Terjadwal").length,
    Selesai: campaignsData.filter((c) => c.status === "Selesai").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
      
<PageHeader 
  title="Campaign & Promo" 
  subtitle="Kelola kampanye marketing dan promosi" 
  breadcrumb="Campaign & Promo"

/>
        
        <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all shadow-sm">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Buat Kampanye</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Kampanye</p>
          <h3 className="text-3xl font-bold text-gray-900">{campaignsData.length}</h3>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Aktif</p>
          <h3 className="text-3xl font-bold text-green-600">{statusCounts.Aktif}</h3>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Terjadwal</p>
          <h3 className="text-3xl font-bold text-blue-600">{statusCounts.Terjadwal}</h3>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Selesai</p>
          <h3 className="text-3xl font-bold text-gray-600">{statusCounts.Selesai}</h3>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-gray-600" />
        <div className="flex gap-2">
          {["Semua", "Aktif", "Terjadwal", "Selesai"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === status
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-600">Tidak ada kampanye dengan status "{filter}"</p>
        </div>
      )}
    </div>
  );
}
