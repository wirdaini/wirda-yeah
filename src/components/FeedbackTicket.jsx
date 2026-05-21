// src/components/FeedbackTicket.jsx (UPDATE)
import Badge from "./Badge";
import Avatar from "./Avatar";
import { Star } from "lucide-react";

export default function FeedbackTicket({ feedback }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar name={feedback.namaPelanggan} />
          <div>
            <h4 className="font-medium text-gray-900">{feedback.namaPelanggan}</h4>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < feedback.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
              ))}
            </div>
          </div>
        </div>
        <Badge type={feedback.status === "Open" ? "danger" : feedback.status === "In Progress" ? "warning" : "success"}>
          {feedback.status}
        </Badge>
      </div>
      <p className="text-gray-700 text-sm mb-3">{feedback.message}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="bg-gray-100 px-2 py-1 rounded">{feedback.kategori}</span>
        <span>{new Date(feedback.tanggal).toLocaleDateString("id-ID")}</span>
      </div>
    </div>
  );
}