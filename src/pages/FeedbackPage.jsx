// src/pages/FeedbackPage.jsx
import { useState } from "react";
import { Filter, Star } from "lucide-react";
import FeedbackTicket from "../components/FeedbackTicket";
import feedbackData from "../data/feedback.json";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";

export default function FeedbackPage() {
  const [filter, setFilter] = useState("Semua");

  const filteredFeedback = filter === "Semua" ? feedbackData : feedbackData.filter((f) => f.status === filter);

  const statusCounts = {
    Open: feedbackData.filter((f) => f.status === "Open").length,
    "In Progress": feedbackData.filter((f) => f.status === "In Progress").length,
    Closed: feedbackData.filter((f) => f.status === "Closed").length,
  };

  const avgRating = (feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1);
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({ star, count: feedbackData.filter((f) => f.rating === star).length }));

  const categories = [
    { name: "Produk", count: feedbackData.filter((f) => f.kategori === "Produk").length, color: "purple" },
    { name: "Pelayanan", count: feedbackData.filter((f) => f.kategori === "Pelayanan").length, color: "blue" },
    { name: "Fasilitas", count: feedbackData.filter((f) => f.kategori === "Fasilitas").length, color: "green" },
    { name: "Sistem", count: feedbackData.filter((f) => f.kategori === "Sistem").length, color: "orange" },
    { name: "Pujian", count: feedbackData.filter((f) => f.kategori === "Pujian").length, color: "pink" },
    { name: "Saran", count: feedbackData.filter((f) => f.kategori === "Saran").length, color: "indigo" },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Feedback & Komplain" subtitle="Kelola feedback dan komplain pelanggan" breadcrumb="Feedback & Komplain" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <p className="text-sm text-gray-600 mb-1">Total Feedback</p>
          <h3 className="text-3xl font-bold text-gray-900">{feedbackData.length}</h3>
        </Card>
        <Card className="border-red-200 bg-red-50 text-center">
          <p className="text-sm text-red-700 mb-1">Open</p>
          <h3 className="text-3xl font-bold text-red-600">{statusCounts.Open}</h3>
        </Card>
        <Card className="border-blue-200 bg-blue-50 text-center">
          <p className="text-sm text-blue-700 mb-1">In Progress</p>
          <h3 className="text-3xl font-bold text-blue-600">{statusCounts["In Progress"]}</h3>
        </Card>
        <Card className="border-gray-200 bg-gray-50 text-center">
          <p className="text-sm text-gray-600 mb-1">Closed</p>
          <h3 className="text-3xl font-bold text-gray-900">{statusCounts.Closed}</h3>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Rating Rata-rata</h3>
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-gray-900 mb-2">{avgRating}</div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(avgRating)) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
              ))}
            </div>
            <p className="text-sm text-gray-600">Dari {feedbackData.length} feedback</p>
          </div>
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-12">{star} bintang</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(count / feedbackData.length) * 100}%` }} />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Kategori Feedback</h3>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat.name} className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">{cat.name}</p>
                  <h4 className="text-2xl font-bold text-gray-900">{cat.count}</h4>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-gray-600" />
        <div className="flex gap-2">
          {["Semua", "Open", "In Progress", "Closed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === status ? "bg-amber-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <FeedbackTicket key={feedback.id} feedback={feedback} />
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-600">Tidak ada feedback dengan status "{filter}"</p>
        </div>
      )}
    </div>
  );
}