import { useEffect, useState } from "react"
import { User } from "@/types/userType";
import { ListedMembers } from "@/components/app/Admin/member/ListedMembers";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

function ListMembers() {
  const [members, setMembers] = useState<User[]>([]);

  const fetchMembership = async () => {
    const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/admin/members`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    })
    const apiData = await response.json();
    setMembers(apiData.members)
    console.log(members, "&&&&&")
  }

  useEffect(() => {
    fetchMembership()
  }, [])



  return (
    <div>
      <Link to="/admin/official-bearers" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 w-fit">
        <UserPlus size={18} /> Add Member
      </Link>
      <ListedMembers items={members} />
    </div>
  );
}

export default ListMembers
