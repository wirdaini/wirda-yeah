// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/productsAPI";
import { Loader2 } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Data produk sekarang diambil dari tabel `products` Supabase,
    // bukan dari data/products.json lagi.
    fetchProductById(id)
      .then((found) => {
        if (!found) {
          setError("Product not found");
        } else {
          setProduct(found);
        }
      })
      .catch(() => setError("Gagal memuat data produk dari database."))
      .finally(() => setLoading(false));
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center gap-2 text-sm text-coffee-500 h-64">
        <Loader2 className="w-4 h-4 animate-spin" />
        Memuat data produk...
      </div>
    );
  }

  // ERROR
  if (error) {
    return <div className="text-red-600 p-6">{error}</div>;
  }

  return (
    <div className="p-6 flex justify-center">
      <div
        className="
        bg-white
        rounded-xl
        border border-coffee-200
        shadow-sm
        max-w-lg
        w-full
        overflow-hidden
      "
      >
        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.title}
          className="
    w-full
    h-52
    object-cover
  "
        />

        {/* CONTENT */}
        <div className="p-6">
          {/* TITLE */}
          <h2
            className="
            text-2xl
            font-bold
            text-coffee-900
            mb-1
          "
          >
            {product.title}
          </h2>

          <p
            className="
            text-sm
            text-coffee-600
            mb-4
          "
          >
            Papi Coffee Special Menu
          </p>

          {/* CATEGORY */}
          <div className="mb-3">
            <p className="text-sm text-coffee-400">Category</p>

            <p className="text-coffee-700 font-medium">{product.category}</p>
          </div>

          {/* BRAND */}
          <div className="mb-3">
            <p className="text-sm text-coffee-400">Brand</p>

            <p className="text-coffee-700 font-medium">{product.brand}</p>
          </div>

          {/* PRICE */}
          <div className="mb-3">
            <p className="text-sm text-coffee-400">Price</p>

            <p
              className="
              text-xl
              font-bold
              text-coffee-600
            "
            >
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>

          {/* STOCK */}
          <div>
            <p className="text-sm text-coffee-400">Stock</p>

            <span
              className="
              inline-flex
              px-3 py-1
              rounded-full
              text-xs
              font-medium
              bg-green-100
              text-green-700
              mt-1
            "
            >
              {product.stock} Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}