import { useState } from "react";
import { Search, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import products from "../data/products.json";

export default function Products() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Coffee Menu"
        subtitle="Daftar menu Papi Coffee"
        breadcrumb="Products"
      />

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* SEARCH */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="
              absolute left-3 top-1/2
              -translate-y-1/2
              w-4 h-4 text-gray-400
            "
            />

            <input
              type="text"
              placeholder="Cari menu coffee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full pl-10 pr-4 py-2.5
                border border-gray-200 rounded-lg
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-amber-500
              "
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  ID
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Menu
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Code
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Category
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Price
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Stock
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {item.id}
                  </td>

                  {/* DYNAMIC ROUTE */}
                  <td className="px-4 py-4 text-sm">
                    <Link
                      to={`/products/${item.id}`}
                      className="
    text-amber-600
    hover:underline
    font-semibold
  "
                    >
                      {item.title}
                    </Link>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {item.code}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {item.category}
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    Rp {item.price.toLocaleString("id-ID")}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className="
                      inline-flex px-2.5 py-1
                      rounded-full text-xs font-medium
                      bg-green-100 text-green-700
                    "
                    >
                      {item.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
