// src/pages/MembersPage.jsx
import MemberTable from "../components/MemberTable";
import membersData from "../data/members.json";
import { Users, UserPlus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import StatCard from "../components/StatCard";

export default function MembersPage() {
  const vipCount = membersData.filter((m) => m.tier === "VIP").length;
  const regularCount = membersData.filter((m) => m.tier === "Regular").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Member Management" subtitle="Kelola data pelanggan member Papi Coffee" breadcrumb="Member Management" />
        <Button type="primary" className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Tambah Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Member" value={membersData.length} icon={Users} color="blue" />
        <StatCard label="VIP Members" value={vipCount} icon={null} trend={`${Math.round((vipCount / membersData.length) * 100)}% dari total`} color="amber" />
        <StatCard label="Regular Members" value={regularCount} icon={Users} trend={`${Math.round((regularCount / membersData.length) * 100)}% dari total`} color="gray" />
      </div>

      <MemberTable members={membersData} />
    </div>
  );
}