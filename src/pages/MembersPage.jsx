// src/pages/MembersPage.jsx
import { useState } from "react";
import MemberTable from "../components/MemberTable";
import membersData from "../data/members.json";
import { Users, UserPlus, Crown, User, Mail, Phone, Calendar, MapPin, X } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function MembersPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const vipCount = membersData.filter((m) => m.tier === "VIP").length;
  const regularCount = membersData.filter((m) => m.tier === "Regular").length;
  const totalPoin = membersData.reduce((sum, m) => sum + (m.poin || 0), 0);

  const handleViewDetail = (member) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Member Management"
          subtitle="Kelola data pelanggan member Papi Coffee"
          breadcrumb="Member Management"
        />

        <Button type="primary" className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Tambah Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Member"
          value={membersData.length}
          icon={Users}
          color="blue"
        />
        <StatCard
          label="VIP Members"
          value={vipCount}
          icon={Crown}
          trend={`${Math.round((vipCount / membersData.length) * 100)}% dari total`}
          color="amber"
        />
        <StatCard
          label="Total Poin"
          value={totalPoin.toLocaleString("id-ID")}
          icon={User}
          color="gray"
        />
      </div>

      <MemberTable 
        members={membersData} 
        onViewDetail={handleViewDetail}
      />

      {/* Dialog Detail Member */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              Detail Member
            </DialogTitle>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-4">
              {/* Profile Section */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <Avatar name={selectedMember.nama} size="lg" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedMember.nama}</h3>
                  <div className="flex gap-2 mt-1">
                    <Badge type={selectedMember.tier === "VIP" ? "amber" : "default"}>
                      {selectedMember.tier}
                    </Badge>
                    <Badge type="info">{selectedMember.segmen}</Badge>
                  </div>
                </div>
              </div>

              {/* Info Detail */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.email || "-"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Telepon</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.telepon || selectedMember.phone || "-"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Bergabung Sejak</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.joinDate || "-"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Lokasi</p>
                    <p className="text-sm font-medium text-gray-900">{selectedMember.lokasi || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Statistik Member */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Poin</p>
                  <p className="text-lg font-bold text-amber-600">{selectedMember.poin || 0}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-500">Total Transaksi</p>
                  <p className="text-lg font-bold text-amber-600">
                    Rp {(selectedMember.totalTransaksi || 0).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Tutup
            </Button>
            <Button type="primary">
              Edit Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}