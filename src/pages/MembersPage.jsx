import MemberTable from "../components/MemberTable";
import membersData from "../data/members.json";
import { Users, UserPlus } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function MembersPage() {
  const vipCount = membersData.filter((m) => m.tier === "VIP").length;
  const regularCount = membersData.filter((m) => m.tier === "Regular").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
      
        <PageHeader 
  title="Member Management" 
  subtitle="Kelola data pelanggan member Papi Coffee" 
      breadcrumb="Member Management"

/>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all shadow-sm">
          <UserPlus className="w-4 h-4" />
          <span className="text-sm font-medium">Tambah Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Member</p>
              <h3 className="text-3xl font-bold text-gray-900">{membersData.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">VIP Members</p>
              <h3 className="text-3xl font-bold text-gray-900">{vipCount}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((vipCount / membersData.length) * 100)}% dari total
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Regular Members</p>
              <h3 className="text-3xl font-bold text-gray-900">{regularCount}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((regularCount / membersData.length) * 100)}% dari total
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <MemberTable members={membersData} />
    </div>
  );
}
