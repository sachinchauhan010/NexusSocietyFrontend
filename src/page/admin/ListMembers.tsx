import { AddMembers } from "@/components/app/Admin/AddMembers";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useEffect, useState } from "react"
import { User } from "@/types/userType";
function ListMembers() {
  const [members, setMembers] = useState<User[]>([]);

  const fetchMembership = async () => {
    const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/members`, {
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
      <AddMembers />
      <div>
        <HoverEffect
          items={members}
          className="overflow-y-auto h-[calc(100vh-100px)]"
        />
      </div>
    </div>
  );
}

export default ListMembers
