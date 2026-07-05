// src/components/MemberTable.jsx
import Badge from "./Badge";
import Avatar from "./Avatar";
import { Eye } from "lucide-react";
import { getLoyaltyTier } from "../lib/utils";

export default function MemberTable({ members, onViewDetail }) {
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
                    <Avatar name={member.nama} size="sm" />
                    <span className="text-sm font-medium text-coffee-900">{member.nama}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    type={
                      getLoyaltyTier(member.poin) === "Gold"
                        ? "amber"
                        : getLoyaltyTier(member.poin) === "Platinum"
                        ? "purple"
                        : "default"
                    }
                  >
                    {getLoyaltyTier(member.poin)}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-coffee-900">{member.poin}</td>
                <td className="px-4 py-3 text-sm text-coffee-900">Rp {member.totalTransaksi?.toLocaleString("id-ID")}</td>
                <td className="px-4 py-3">
                  <Badge type="info">{member.segmen}</Badge>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onViewDetail(member)}
                    className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Detail
                  </button>
                </td>
               </tr>
            ))}
          </tbody>
         </table>
      </div>
    </div>
  );
}