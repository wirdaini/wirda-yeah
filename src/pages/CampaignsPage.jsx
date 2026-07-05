// src/pages/CampaignsPage.jsx
import { Plus, Filter } from "lucide-react";
import CampaignCard from "../components/CampaignCard";
import campaignsData from "../data/campaigns.json";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";

export default function CampaignsPage() {
  const [filter, setFilter] = useState("Semua");

  const filteredCampaigns = filter === "Semua" ? campaignsData : campaignsData.filter((c) => c.status === filter);

  const statusCounts = {
    Aktif: campaignsData.filter((c) => c.status === "Aktif").length,
    Terjadwal: campaignsData.filter((c) => c.status === "Terjadwal").length,
    Selesai: campaignsData.filter((c) => c.status === "Selesai").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Campaign & Promo" subtitle="Kelola kampanye marketing dan promosi" breadcrumb="Campaign & Promo" />
        <Button type="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Buat Kampanye
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Kampanye" value={campaignsData.length} icon={null} color="gray" />
        <StatCard label="Aktif" value={statusCounts.Aktif} icon={null} color="green" />
        <StatCard label="Terjadwal" value={statusCounts.Terjadwal} icon={null} color="blue" />
        <StatCard label="Selesai" value={statusCounts.Selesai} icon={null} color="gray" />
      </div>

      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-coffee-600" />
        <div className="flex gap-2">
          {["Semua", "Aktif", "Terjadwal", "Selesai"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === status ? "bg-amber-600 text-white" : "bg-white text-coffee-600 border border-coffee-200 hover:bg-coffee-50"}`}
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
        <div className="bg-white rounded-xl border border-coffee-200 p-12 text-center">
          <p className="text-coffee-600">Tidak ada kampanye dengan status "{filter}"</p>
        </div>
      )}
    </div>
  );
}