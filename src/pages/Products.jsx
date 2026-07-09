// src/pages/Products.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Coffee, Milk, IceCream, Cookie, GlassWater, Snowflake, Loader2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { useProducts } from "../hooks/useProducts";
import { createProduct, updateProduct, deleteProduct } from "../services/productsAPI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Ikon per kategori menu Papi Coffee
const categoryIcons = {
  "Kopi Susu": Coffee,
  "Black Coffee": Coffee,
  "Non Coffee": Milk,
  "Matcha Series": GlassWater,
  "Affogato Series": IceCream,
  Snack: Cookie,
};

const CATEGORY_OPTIONS = ["Kopi Susu", "Black Coffee", "Non Coffee", "Matcha Series", "Affogato Series", "Snack"];

const stockTabs = ["Semua Produk", "Stok Tersedia", "Stok Menipis", "Stok Habis"];

const emptyForm = {
  title: "",
  code: "",
  category: CATEGORY_OPTIONS[0],
  brand: "Papi Coffee",
  price: 0,
  stock: 0,
  image: "",
};

export default function Products() {
  // Data produk sekarang diambil dari tabel `products` Supabase,
  // bukan dari data/products.json lagi.
  const { products, loading, error, reload } = useProducts();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [stockTab, setStockTab] = useState("Semua Produk");

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // "add" | "edit"
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const categories = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return Object.entries(map);
  }, [products]);

  const matchesStockTab = (item) => {
    if (stockTab === "Stok Tersedia") return item.stock > 5;
    if (stockTab === "Stok Menipis") return item.stock > 0 && item.stock <= 5;
    if (stockTab === "Stok Habis") return item.stock === 0;
    return true;
  };

  const filteredProducts = products.filter(
    (item) =>
      (item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase())) &&
      (!activeCategory || item.category === activeCategory) &&
      matchesStockTab(item)
  );

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenAdd = () => {
    setFormMode("add");
    setFormData(emptyForm);
    setFormError("");
    setFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setFormMode("edit");
    setFormData({ ...product });
    setFormError("");
    setFormOpen(true);
  };

  const handleDelete = async (product) => {
    const yakin = window.confirm(`Hapus menu "${product.title}"? Tindakan ini gak bisa dibatalkan.`);
    if (!yakin) return;

    try {
      await deleteProduct(product.id);
      reload();
    } catch {
      alert("Gagal menghapus menu. Coba lagi.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.code.trim()) return;

    setSaving(true);
    setFormError("");
    try {
      const payload = {
        title: formData.title,
        code: formData.code,
        category: formData.category,
        brand: formData.brand || "Papi Coffee",
        price: Number(formData.price) || 0,
        stock: Number(formData.stock) || 0,
        image: formData.image || null,
      };

      if (formMode === "add") {
        await createProduct(payload);
      } else {
        await updateProduct(formData.id, payload);
      }
      await reload();
      setFormOpen(false);
    } catch {
      // code unik — pesan error paling sering terjadi kalau kode menu dobel
      setFormError("Gagal menyimpan menu. Cek lagi, mungkin kode menu sudah dipakai.");
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
        <PageHeader title="Coffee Menu" subtitle="Daftar menu Papi Coffee" breadcrumb="Products" />

        <div className="flex items-center gap-3">
          <Button type="primary" className="flex items-center gap-2" onClick={handleOpenAdd}>
            <Plus className="w-4 h-4" />
            Tambah Menu
          </Button>
        </div>
      </div>

      {/* Kategori menu */}
      <Card>
        <h3 className="font-semibold text-coffee-900 mb-4">Kategori Menu</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(([category, count]) => {
            const Icon = categoryIcons[category] || Snowflake;
            const active = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(active ? null : category)}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                  active
                    ? "bg-coffee-800 border-coffee-800 text-white"
                    : "bg-coffee-50 border-coffee-100 text-coffee-700 hover:border-coffee-300"
                }`}
              >
                <Icon className={`w-6 h-6 ${active ? "text-white" : "text-coffee-500"}`} />
                <span className="text-sm font-medium text-center leading-tight">{category}</span>
                <span className={`text-xs ${active ? "text-coffee-100" : "text-coffee-400"}`}>{count} menu</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card padding="p-0" className="overflow-hidden">
        <div className="flex items-center gap-2 px-6 pt-6 flex-wrap">
          {stockTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setStockTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                stockTab === tab
                  ? "bg-coffee-800 text-white"
                  : "bg-coffee-50 text-coffee-700 hover:bg-coffee-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 px-6 pt-4 pb-6">
          <SearchInput placeholder="Cari menu coffee..." value={search} onChange={setSearch} />
          <span className="text-sm text-coffee-500 bg-coffee-100 px-3 py-1.5 rounded-full whitespace-nowrap">
            {filteredProducts.length} menu ditemukan
          </span>
        </div>

        {loading ? (
          <div className="px-6 py-16 flex items-center justify-center gap-2 text-sm text-coffee-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Memuat data menu dari database...
          </div>
        ) : error ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-red-600 mb-3">{error}</p>
            <button
              onClick={reload}
              className="text-sm font-medium text-coffee-700 bg-coffee-100 hover:bg-coffee-200 px-4 py-2 rounded-lg transition-all"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-coffee-50 border-b border-coffee-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Menu</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-100">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-coffee-50 transition-colors">
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-9 h-9 rounded-lg object-cover" />
                        <Link to={`/products/${item.id}`} className="text-coffee-600 hover:underline font-semibold">
                          {item.title}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-coffee-600">{item.code}</td>
                    <td className="px-4 py-4 text-sm text-coffee-600">{item.category}</td>
                    <td className="px-4 py-4 text-sm font-medium text-coffee-900">Rp {item.price.toLocaleString("id-ID")}</td>
                    <td className="px-4 py-4">
                      <Badge type={item.stock === 0 ? "danger" : item.stock <= 5 ? "warning" : "success"}>
                        {item.stock === 0 ? "Habis" : item.stock}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3 text-coffee-400">
                        <button className="hover:text-coffee-700 transition-colors" onClick={() => handleOpenEdit(item)}>
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="hover:text-red-600 transition-colors" onClick={() => handleDelete(item)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Dialog Tambah / Edit Menu */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-coffee-600" />
              {formMode === "add" ? "Tambah Menu Baru" : "Edit Menu"}
            </DialogTitle>
          </DialogHeader>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
              {formError}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-3">
            <div>
              <label className={labelClass}>Nama Menu *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                className={inputClass}
                placeholder="Contoh: Kopi Mami Premium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Kode Menu *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => handleFormChange("code", e.target.value)}
                  className={inputClass}
                  placeholder="Contoh: KM001"
                />
              </div>
              <div>
                <label className={labelClass}>Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                  className={inputClass}
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Harga (Rp)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleFormChange("price", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Stok</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleFormChange("stock", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>URL Gambar</label>
              <input
                type="text"
                value={formData.image || ""}
                onChange={(e) => handleFormChange("image", e.target.value)}
                className={inputClass}
                placeholder="https://..."
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
                {formMode === "add" ? "Simpan Menu" : "Simpan Perubahan"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}