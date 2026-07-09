// src/components/FeedbackTicket.jsx (UPDATE)
import { useState } from "react";
import Badge from "./Badge";
import Avatar from "./Avatar";
import { Star, ChevronDown } from "lucide-react";

const STATUS_OPTIONS = ["Open", "In Progress", "Closed"];

const STATUS_BADGE_TYPE = {
  Open: "danger",
  "In Progress": "warning",
  Closed: "success",
};

export default function FeedbackTicket({ feedback, onStatusChange }) {
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus === feedback.status) return;
    setUpdating(true);
    onStatusChange?.(feedback.id, newStatus);
    setTimeout(() => setUpdating(false), 300);
  };

  return (
    <div className="bg-white rounded-xl border border-coffee-200 p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar name={feedback.namaPelanggan} />
          <div>
            <h4 className="font-medium text-coffee-900">{feedback.namaPelanggan}</h4>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < feedback.rating ? "fill-coffee-400 text-coffee-400" : "fill-coffee-200 text-coffee-200"}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge type={STATUS_BADGE_TYPE[feedback.status] || "default"}>
            {feedback.status}
          </Badge>
          <div className="relative">
            <select
              value={feedback.status}
              onChange={handleStatusChange}
              disabled={updating}
              className={`appearance-none text-xs font-medium border border-coffee-200 rounded-lg pl-2.5 pr-6 py-1.5 bg-white text-coffee-700 hover:bg-coffee-50 focus:outline-none focus:ring-2 focus:ring-coffee-400 cursor-pointer transition-all ${updating ? "opacity-60" : ""}`}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  Ubah ke: {status}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-coffee-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <p className="text-coffee-700 text-sm mb-3">{feedback.keluhan}</p>

      <div className="flex flex-wrap items-center gap-2 text-xs text-coffee-500 mb-2">
        <span className="bg-coffee-100 px-2 py-1 rounded">{feedback.kategori}</span>
        <span>{new Date(feedback.tanggal).toLocaleDateString("id-ID")}</span>
        {feedback.penanganan && (
          <span className="text-coffee-400">Ditangani: {feedback.penanganan}</span>
        )}
      </div>

      {feedback.status === "Closed" && feedback.solusi && (
        <div className="mt-2 bg-green-50 border border-green-100 rounded-lg p-3">
          <p className="text-xs font-medium text-green-700 mb-1">✓ Solusi</p>
          <p className="text-xs text-green-800">{feedback.solusi}</p>
          {feedback.tanggalSelesai && (
            <p className="text-[11px] text-green-600 mt-1">
              Selesai: {new Date(feedback.tanggalSelesai).toLocaleDateString("id-ID")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}