import { AddMembers } from "@/components/app/Admin/AddMembers";
import { useEffect, useState } from "react"
import { User } from "@/types/userType";
import { ListedMembers } from "@/components/app/Admin/member/ListedMembers";

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
      <AddMembers/>
      <ListedMembers items={members}/>
    </div>
  )
}

export default ListMembers
