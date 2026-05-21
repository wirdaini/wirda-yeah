// src/pages/Products.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import SearchInput from "../components/SearchInput";
import Card from "../components/Card";
import Badge from "../components/Badge";
import products from "../data/products.json";

export default function Products() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Coffee Menu" subtitle="Daftar menu Papi Coffee" breadcrumb="Products" />

      <Card>
        <div className="flex items-center gap-4 mb-6">
          <SearchInput placeholder="Cari menu coffee..." value={search} onChange={setSearch} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Menu</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-4 py-4 text-sm">
                    <Link to={`/products/${item.id}`} className="text-amber-600 hover:underline font-semibold">
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{item.code}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Rp {item.price.toLocaleString("id-ID")}</td>
                  <td className="px-4 py-4">
                    <Badge type="success">{item.stock}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}