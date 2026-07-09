// src/pages/MembersPage.jsx
import { useState, useMemo, useEffect } from "react";
import MemberTable from "../components/MemberTable";
import {
  fetchMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../services/membersAPI";
import { Users, UserPlus, Crown, Mail, Phone, Calendar, Coffee, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import SearchInput from "../components/SearchInput";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ITEMS_PER_PAGE = 20;

// Field-nya sekarang persis nama kolom tabel `members` di Supabase
// (name, phone, birth_date, tier, total_points, segment, favorite_menu).
// id, created_at, total_transactions, visit_count, last_visit_at gak ada
// di form karena itu diisi otomatis oleh database.
const emptyForm = {
  name: "",
  phone: "",
  email: "",
  birth_date: "",
  tier: "Silver",
  total_points: 0,
  segment: "Baru",
  favorite_menu: "",
};

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" | "edit"
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Ambil data member dari Supabase begitu halaman dibuka
  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    setLoading(true);
    setError("");
    fetchMembers()
      .then((data) => setMembers(data))
      .catch(() => setError("Gagal memuat data member dari database."))
      .finally(() => setLoading(false));
  };

  const silverCount = members.filter((m) => m.tier === "Silver").length;
  const goldCount = members.filter((m) => m.tier === "Gold").length;
  const platinumCount = members.filter((m) => m.tier === "Platinum").length;

  // Filter berdasarkan nama, no HP, atau email — dicek tiap kali search berubah
  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.phone?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q)
    );
  }, [search, members]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / ITEMS_PER_PAGE));

  // Balikin ke halaman 1 tiap kali pencarian berubah, biar gak nyangkut di halaman kosong
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const rangeStart = filteredMembers.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const rangeEnd = Math.min(currentPage * ITEMS_PER_PAGE, filteredMembers.length);

  const handleViewDetail = (member) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  const handleOpenAdd = () => {
    setFormMode("add");
    setFormData(emptyForm);
    setFormOpen(true);
  };

  const handleOpenEdit = (member) => {
    setFormMode("edit");
    setFormData({ ...member });
    setDialogOpen(false);
    setFormOpen(true);
  };

  const handleDelete = async (member) => {
    const yakin = window.confirm(`Hapus member "${member.name}"? Tindakan ini gak bisa dibatalkan.`);
    if (!yakin) return;

    try {
      await deleteMember(member.id);
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    } catch {
      alert("Gagal menghapus member. Coba lagi.");
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSaving(true);
    try {
      if (formMode === "add") {
        // id, created_at, total_transactions, visit_count, last_visit_at
        // gak dikirim — biar database yang isi otomatis (default value)
        const newMember = await createMember({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          birth_date: formData.birth_date || null,
          tier: formData.tier,
          total_points: Number(formData.total_points) || 0,
          segment: formData.segment,
          favorite_menu: formData.favorite_menu || null,
        });
        setMembers((prev) => [newMember, ...prev]);
      } else {
        const changes = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          birth_date: formData.birth_date || null,
          tier: formData.tier,
          total_points: Number(formData.total_points) || 0,
          segment: formData.segment,
          favorite_menu: formData.favorite_menu || null,
        };
        const updated = await updateMember(formData.id, changes);
        setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      }
      setFormOpen(false);
    } catch {
      alert("Gagal menyimpan data member. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-coffee-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent";
  const labelClass = "text-xs font-medium text-coffee-600 mb-1 block";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Member Management"
          subtitle="Kelola data pelanggan member Papi Coffee"
          breadcrumb="Member Management"
        />

        <Button type="primary" className="flex items-center gap-2" onClick={handleOpenAdd}>
          <UserPlus className="w-4 h-4" />
          Tambah Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Member" value={members.length} icon={Users} color="blue" />
        <StatCard
          label="Silver Members"
          value={silverCount}
          icon={Users}
          trend={members.length ? `${Math.round((silverCount / members.length) * 100)}% dari total` : undefined}
          color="blue"
        />
        <StatCard
          label="Gold Members"
          value={goldCount}
          icon={Crown}
          trend={members.length ? `${Math.round((goldCount / members.length) * 100)}% dari total` : undefined}
          color="amber"
        />
        <StatCard
          label="Platinum Members"
          value={platinumCount}
          icon={Crown}
          trend={members.length ? `${Math.round((platinumCount / members.length) * 100)}% dari total` : undefined}
          color="purple"
        />
      </div>

      <div className="bg-white rounded-xl border border-coffee-300 overflow-hidden">
        <div className="p-4 border-b border-coffee-100">
          <SearchInput
            placeholder="Cari nama, no HP, atau email member..."
            value={search}
            onChange={setSearch}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="px-6 py-16 flex items-center justify-center gap-2 text-sm text-coffee-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Memuat data member dari database...
          </div>
        ) : error ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-red-600 mb-3">{error}</p>
            <button
              onClick={loadMembers}
              className="text-sm font-medium text-coffee-700 bg-coffee-100 hover:bg-coffee-200 px-4 py-2 rounded-lg transition-all"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-coffee-500">
            {search
              ? `Gak ada member yang cocok dengan pencarian "${search}".`
              : "Belum ada data member. Klik \"Tambah Member\" untuk mulai."}
          </div>
        ) : (
          <MemberTable
            members={paginatedMembers}
            onViewDetail={handleViewDetail}
            onDelete={handleDelete}
          />
        )}

        {!loading && !error && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-coffee-100">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-coffee-500 border border-coffee-200 rounded-lg hover:bg-coffee-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm text-coffee-500">
              {filteredMembers.length === 0
                ? "Tidak ada data"
                : `Menampilkan ${rangeStart}-${rangeEnd} dari ${filteredMembers.length} member`}
              {" · "}Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-coffee-500 border border-coffee-200 rounded-lg hover:bg-coffee-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Dialog Detail Member */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-coffee-600" />
              Detail Member
            </DialogTitle>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-coffee-100">
                <Avatar name={selectedMember.name} size="lg" />
                <div>
                  <h3 className="text-lg font-semibold text-coffee-900">{selectedMember.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <Badge
                      type={
                        selectedMember.tier === "Gold"
                          ? "amber"
                          : selectedMember.tier === "Platinum"
                          ? "purple"
                          : "default"
                      }
                    >
                      {selectedMember.tier}
                    </Badge>
                    <Badge type="info">{selectedMember.segment}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-coffee-400" />
                  <div>
                    <p className="text-xs text-coffee-500">Email</p>
                    <p className="text-sm font-medium text-coffee-900">{selectedMember.email || "-"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-coffee-400" />
                  <div>
                    <p className="text-xs text-coffee-500">No. HP</p>
                    <p className="text-sm font-medium text-coffee-900">{selectedMember.phone || "-"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-coffee-400" />
                  <div>
                    <p className="text-xs text-coffee-500">Bergabung Sejak</p>
                    <p className="text-sm font-medium text-coffee-900">
                      {selectedMember.created_at
                        ? new Date(selectedMember.created_at).toLocaleDateString("id-ID")
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Coffee className="w-4 h-4 text-coffee-400" />
                  <div>
                    <p className="text-xs text-coffee-500">Menu Favorit</p>
                    <p className="text-sm font-medium text-coffee-900">{selectedMember.favorite_menu || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-coffee-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-coffee-500">Poin</p>
                  <p className="text-lg font-bold text-coffee-600">{selectedMember.total_points || 0}</p>
                </div>
                <div className="bg-coffee-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-coffee-500">Jumlah Transaksi</p>
                  <p className="text-lg font-bold text-coffee-600">{selectedMember.total_transactions || 0}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="outline" onClick={() => setDialogOpen(false)}>
              Tutup
            </Button>
            <Button type="primary" onClick={() => selectedMember && handleOpenEdit(selectedMember)}>
              Edit Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Tambah / Edit Member */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-coffee-600" />
              {formMode === "add" ? "Tambah Member Baru" : "Edit Data Member"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-3">
            <div>
              <label className={labelClass}>Nama Lengkap *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className={inputClass}
                placeholder="Nama member"
              />
            </div>

            <div>
              <label className={labelClass}>No. HP *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => handleFormChange("phone", e.target.value)}
                className={inputClass}
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                className={inputClass}
                placeholder="email@contoh.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tanggal Lahir</label>
                <input
                  type="date"
                  value={formData.birth_date || ""}
                  onChange={(e) => handleFormChange("birth_date", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => handleFormChange("tier", e.target.value)}
                  className={inputClass}
                >
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Poin Awal</label>
                <input
                  type="number"
                  min="0"
                  value={formData.total_points}
                  onChange={(e) => handleFormChange("total_points", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Segmen</label>
                <select
                  value={formData.segment}
                  onChange={(e) => handleFormChange("segment", e.target.value)}
                  className={inputClass}
                >
                  <option value="Baru">Baru</option>
                  <option value="Reguler">Reguler</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Menu Favorit</label>
              <input
                type="text"
                value={formData.favorite_menu}
                onChange={(e) => handleFormChange("favorite_menu", e.target.value)}
                className={inputClass}
                placeholder="Contoh: Americano"
              />
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
                {formMode === "add" ? "Simpan Member" : "Simpan Perubahan"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}