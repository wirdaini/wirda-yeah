// src/pages/Products.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, MoreHorizontal, Pencil, Trash2, Coffee, Milk, IceCream, Cookie, GlassWater, Snowflake } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import products from "../data/products.json";

// Ikon per kategori menu Papi Coffee (bukan kategori e-commerce di template,
// disesuaikan dengan kategori asli di data produk: Kopi Susu, Black Coffee, dst)
const categoryIcons = {
  "Kopi Susu": Coffee,
  "Black Coffee": Coffee,
  "Non Coffee": Milk,
  "Matcha Series": GlassWater,
  "Affogato Series": IceCream,
  Snack: Cookie,
};

const stockTabs = ["Semua Produk", "Stok Tersedia", "Stok Menipis", "Stok Habis"];

export default function Products() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [stockTab, setStockTab] = useState("Semua Produk");

  const categories = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return Object.entries(map);
  }, []);

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader title="Coffee Menu" subtitle="Daftar menu Papi Coffee" breadcrumb="Products" />

        <div className="flex items-center gap-3">
          <Button type="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Menu
          </Button>
          <Button type="outline" className="flex items-center gap-2">
            More Action
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Kategori menu — ala bento "Discover" di template Categories */}
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
                      <Link to={`/products/${item.id}`} className="text-amber-600 hover:underline font-semibold">
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
                      <button className="hover:text-coffee-700 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-coffee-100">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-coffee-500 border border-coffee-200 rounded-lg hover:bg-coffee-50 transition-all">
            ← Previous
          </button>
          <span className="text-sm text-coffee-500">Halaman 1 dari 1</span>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-coffee-500 border border-coffee-200 rounded-lg hover:bg-coffee-50 transition-all">
            Next →
          </button>
        </div>
      </Card>
    </div>
  );
}
