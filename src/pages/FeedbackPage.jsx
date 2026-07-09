// src/pages/FeedbackPage.jsx
import { useState, useEffect } from "react";
import { Filter, Star, Loader2 } from "lucide-react";
import FeedbackTicket from "../components/FeedbackTicket";
import { fetchFeedback, updateFeedback } from "../services/feedbackAPI";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("Semua");

  // Ambil data feedback dari Supabase begitu halaman dibuka
  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = () => {
    setLoading(true);
    setError("");
    fetchFeedback()
      .then((data) => setFeedbackList(data))
      .catch(() => setError("Gagal memuat data feedback dari database."))
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (id, newStatus) => {
    const current = feedbackList.find((f) => f.id === id);
    if (!current) return;

    const changes = { status: newStatus };
    // Sama kayak logika lama: kalau ditutup dan belum ada tanggalSelesai,
    // otomatis diisi waktu sekarang.
    if (newStatus === "Closed" && !current.tanggalSelesai) {
      changes.tanggalSelesai = new Date().toISOString();
    }

    try {
      const updated = await updateFeedback(id, changes);
      setFeedbackList((prev) => prev.map((f) => (f.id === id ? updated : f)));
    } catch {
      alert("Gagal mengubah status feedback. Coba lagi.");
    }
  };

  const filteredFeedback =
    filter === "Semua"
      ? feedbackList
      : feedbackList.filter((f) => f.status === filter);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center gap-2 text-sm text-coffee-500 h-64">
        <Loader2 className="w-4 h-4 animate-spin" />
        Memuat data feedback dari database...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-600">{error}</div>;
  }

  const statusCounts = {
    Open: feedbackList.filter((f) => f.status === "Open").length,
    "In Progress": feedbackList.filter((f) => f.status === "In Progress")
      .length,
    Closed: feedbackList.filter((f) => f.status === "Closed").length,
  };

  const avgRating = feedbackList.length
    ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1)
    : "0.0";
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: feedbackList.filter((f) => f.rating === star).length,
  }));

  const categories = [
    {
      name: "Produk",
      count: feedbackList.filter((f) => f.kategori === "Produk").length,
      color: "purple",
    },
    {
      name: "Pelayanan",
      count: feedbackList.filter((f) => f.kategori === "Pelayanan").length,
      color: "blue",
    },
    {
      name: "Fasilitas",
      count: feedbackList.filter((f) => f.kategori === "Fasilitas").length,
      color: "green",
    },
    {
      name: "Sistem",
      count: feedbackList.filter((f) => f.kategori === "Sistem").length,
      color: "orange",
    },
    {
      name: "Pujian",
      count: feedbackList.filter((f) => f.kategori === "Pujian").length,
      color: "pink",
    },
    {
      name: "Saran",
      count: feedbackList.filter((f) => f.kategori === "Saran").length,
      color: "indigo",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Feedback & Komplain"
        subtitle="Kelola feedback dan komplain pelanggan"
        breadcrumb="Feedback & Komplain"
      />

      <div className="bg-white rounded-xl border border-coffee-200 overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="statistics" className="border-0">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-coffee-50/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                <span className="font-semibold text-coffee-900">Ringkasan Statistik Feedback</span>
                <Badge className="ml-2 bg-coffee-100 text-coffee-700 hover:bg-coffee-100">
                  {feedbackList.length} Total
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-coffee-50 to-coffee-100/50 p-4 rounded-lg">
                  <p className="text-sm text-coffee-700 mb-1">⭐ Rata-rata Rating</p>
                  <p className="text-2xl font-bold text-coffee-900">{avgRating} / 5.0</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.round(Number(avgRating)) ? "fill-coffee-500 text-coffee-500" : "fill-coffee-300 text-coffee-300"}`} />
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 mb-1">📂 Kategori Terbanyak</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {categories.reduce((max, cat) => cat.count > max.count ? cat : max, categories[0]).name}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {categories.reduce((max, cat) => cat.count > max.count ? cat : max, categories[0]).count} feedback
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-lg">
                  <p className="text-sm text-green-700 mb-1">🔄 Perlu Tindakan</p>
                  <p className="text-2xl font-bold text-green-900">
                    {statusCounts.Open + statusCounts["In Progress"]}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Open: {statusCounts.Open} | Progress: {statusCounts["In Progress"]}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 bg-coffee-50 p-3 rounded-lg border border-coffee-100">
                <p className="text-xs text-coffee-600">
                  💡 Insight: {
                    Number(avgRating) >= 4 
                      ? "Rating sangat baik! Pertahankan kualitas layanan."
                      : Number(avgRating) >= 3
                      ? "Rating cukup baik. Fokus pada peningkatan kategori dengan rating terendah."
                      : "Perlu perhatian khusus. Segera tindak lanjuti feedback negatif."
                  }
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <p className="text-sm text-coffee-600 mb-1">Total Feedback</p>
          <h3 className="text-3xl font-bold text-coffee-900">
            {feedbackList.length}
          </h3>
        </Card>
        <Card className="border-red-200 bg-red-50 text-center">
          <p className="text-sm text-red-700 mb-1">Open</p>
          <h3 className="text-3xl font-bold text-red-600">
            {statusCounts.Open}
          </h3>
        </Card>
        <Card className="border-blue-200 bg-blue-50 text-center">
          <p className="text-sm text-blue-700 mb-1">In Progress</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {statusCounts["In Progress"]}
          </h3>
        </Card>
        <Card className="border-coffee-200 bg-coffee-50 text-center">
          <p className="text-sm text-coffee-600 mb-1">Closed</p>
          <h3 className="text-3xl font-bold text-coffee-900">
            {statusCounts.Closed}
          </h3>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold text-coffee-900 mb-4">Rating Rata-rata</h3>
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-coffee-900 mb-2">
              {avgRating}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(Number(avgRating)) ? "fill-coffee-400 text-coffee-400" : "fill-coffee-200 text-coffee-200"}`}
                />
              ))}
            </div>
            <p className="text-sm text-coffee-600">
              Dari {feedbackList.length} feedback
            </p>
          </div>
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm text-coffee-600 w-12">
                  {star} bintang
                </span>
                <div className="flex-1 h-2 bg-coffee-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-coffee-400 rounded-full"
                    style={{ width: `${feedbackList.length ? (count / feedbackList.length) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm text-coffee-600 w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-semibold text-coffee-900 mb-4">
              Kategori Feedback
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="border border-coffee-200 rounded-lg p-4"
                >
                  <p className="text-sm text-coffee-600 mb-1">{cat.name}</p>
                  <h4 className="text-2xl font-bold text-coffee-900">
                    {cat.count}
                  </h4>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-coffee-600" />
        <div className="flex gap-2">
          {["Semua", "Open", "In Progress", "Closed"].map((status) => (
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

      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <FeedbackTicket
            key={feedback.id}
            feedback={feedback}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="bg-white rounded-xl border border-coffee-200 p-12 text-center">
          <p className="text-coffee-600">
            Tidak ada feedback dengan status "{filter}"
          </p>
        </div>
      )}
    </div>
  );
}