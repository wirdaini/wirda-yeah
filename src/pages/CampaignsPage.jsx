// src/pages/CampaignsPage.jsx
import { Plus, Filter, Megaphone, Loader2 } from "lucide-react";
import CampaignCard from "../components/CampaignCard";
import { fetchCampaigns, createCampaign } from "../services/campaignsAPI";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const emptyForm = {
  nama: "",
  deskripsi: "",
  targetSegmen: "Semua Member",
  diskon: "",
  tanggalMulai: "",
  tanggalSelesai: "",
  status: "Terjadwal",
  estimasiJangkauan: 100,
};

const inputClass =
  "w-full px-3 py-2 border border-coffee-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent";
const labelClass = "text-xs font-medium text-coffee-600 mb-1 block";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [filter, setFilter] = useState("Semua");
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  // Ambil data kampanye dari Supabase begitu halaman dibuka
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = () => {
    setLoading(true);
    setError("");
    fetchCampaigns()
      .then((data) => setCampaigns(data))
      .catch(() => setError("Gagal memuat data kampanye dari database."))
      .finally(() => setLoading(false));
  };

  const filteredCampaigns = filter === "Semua" ? campaigns : campaigns.filter((c) => c.status === filter);

  const statusCounts = {
    Aktif: campaigns.filter((c) => c.status === "Aktif").length,
    Terjadwal: campaigns.filter((c) => c.status === "Terjadwal").length,
    Selesai: campaigns.filter((c) => c.status === "Selesai").length,
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.tanggalMulai || !formData.tanggalSelesai) return;

    // id, jumlahPengguna (mulai dari 0), dan createdAt diisi otomatis oleh
    // database, jadi gak perlu dikirim manual dari sini.
    const newCampaign = {
      nama: formData.nama,
      deskripsi: formData.deskripsi,
      targetSegmen: formData.targetSegmen,
      diskon: formData.diskon,
      tanggalMulai: formData.tanggalMulai,
      tanggalSelesai: formData.tanggalSelesai,
      status: formData.status,
      estimasiJangkauan: Number(formData.estimasiJangkauan) || 0,
    };

    setSaving(true);
    try {
      const saved = await createCampaign(newCampaign);
      setCampaigns((prev) => [saved, ...prev]);
      setFormOpen(false);
      setFormData(emptyForm);
    } catch {
      alert("Gagal menyimpan kampanye. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Campaign & Promo" subtitle="Kelola kampanye marketing dan promosi" breadcrumb="Campaign & Promo" />
        <Button type="primary" className="flex items-center gap-2" onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4" />
          Buat Kampanye
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Kampanye" value={campaigns.length} icon={null} color="gray" />
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === status ? "bg-coffee-600 text-white" : "bg-white text-coffee-600 border border-coffee-200 hover:bg-coffee-50"}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-coffee-200 p-12 text-center flex items-center justify-center gap-2 text-sm text-coffee-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          Memuat data kampanye...
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl border border-coffee-200 p-12 text-center text-sm text-red-600">
          {error}
        </div>
      ) : (
        <>
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
        </>
      )}

      {/* Dialog Buat Kampanye Baru */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-coffee-600" />
              Buat Kampanye Baru
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-3">
            <div>
              <label className={labelClass}>Nama Kampanye *</label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => handleFormChange("nama", e.target.value)}
                className={inputClass}
                placeholder="Contoh: Promo Akhir Bulan"
              />
            </div>

            <div>
              <label className={labelClass}>Deskripsi</label>
              <textarea
                rows={2}
                value={formData.deskripsi}
                onChange={(e) => handleFormChange("deskripsi", e.target.value)}
                className={inputClass}
                placeholder="Jelaskan promo ini secara singkat"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Target Segmen</label>
                <select
                  value={formData.targetSegmen}
                  onChange={(e) => handleFormChange("targetSegmen", e.target.value)}
                  className={inputClass}
                >
                  <option value="Semua Member">Semua Member</option>
                  <option value="Pelanggan Aktif">Pelanggan Aktif</option>
                  <option value="Pelanggan Baru">Pelanggan Baru</option>
                  <option value="Pelanggan Tidak Aktif">Pelanggan Tidak Aktif</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Diskon / Benefit *</label>
                <input
                  type="text"
                  required
                  value={formData.diskon}
                  onChange={(e) => handleFormChange("diskon", e.target.value)}
                  className={inputClass}
                  placeholder="Contoh: 15% / Gratis Topping"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tanggal Mulai *</label>
                <input
                  type="date"
                  required
                  value={formData.tanggalMulai}
                  onChange={(e) => handleFormChange("tanggalMulai", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tanggal Selesai *</label>
                <input
                  type="date"
                  required
                  value={formData.tanggalSelesai}
                  onChange={(e) => handleFormChange("tanggalSelesai", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleFormChange("status", e.target.value)}
                  className={inputClass}
                >
                  <option value="Terjadwal">Terjadwal</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Estimasi Jangkauan</label>
                <input
                  type="number"
                  min="0"
                  value={formData.estimasiJangkauan}
                  onChange={(e) => handleFormChange("estimasiJangkauan", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium border border-coffee-300 text-coffee-700 hover:bg-coffee-50 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2.5 rounded-lg text-sm font-medium bg-coffee-800 hover:bg-coffee-900 text-white transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Simpan Kampanye
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}