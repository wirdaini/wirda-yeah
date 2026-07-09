// src/components/MemberTable.jsx
import Badge from "./Badge";
import Avatar from "./Avatar";
import { Eye, Trash2 } from "lucide-react";

// Tier sekarang dibaca langsung dari kolom `tier` di database (bukan
// dihitung ulang dari poin di frontend), karena kolom ini sudah jadi
// sumber kebenaran (source of truth) begitu datanya di Supabase.
const tierBadgeType = {
  Silver: "default",
  Gold: "amber",
  Platinum: "purple",
};

export default function MemberTable({ members, onViewDetail, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-coffee-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-coffee-50 border-b border-coffee-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Member</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Tier</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Poin</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Transaksi</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Segmen</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-coffee-600 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-coffee-100">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-coffee-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} size="sm" />
                    <span className="text-sm font-medium text-coffee-900">{member.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge type={tierBadgeType[member.tier] || "default"}>
                    {member.tier || "Silver"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-coffee-900">{member.total_points ?? 0}</td>
                <td className="px-4 py-3 text-sm text-coffee-900">
                  {member.total_transactions ?? 0}x
                </td>
                <td className="px-4 py-3">
                  <Badge type="info">{member.segment}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onViewDetail(member)}
                      className="text-coffee-600 hover:text-coffee-700 flex items-center gap-1 text-sm transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Detail
                    </button>
                    <button
                      onClick={() => onDelete?.(member)}
                      className="text-coffee-300 hover:text-red-600 transition-colors"
                      title="Hapus member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
               </tr>
            ))}
          </tbody>
         </table>
      </div>
    </div>
  );
}