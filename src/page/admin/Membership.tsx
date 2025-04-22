import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useEffect, useState } from "react";
import { User } from "@/types/userType.ts";
import Loader from "@/components/app/Loader";

function Membership() {

  const [membershipStudents, setMembershipStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMembership = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/admin/membership`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      })
      const apiData = await response.json();
      setMembershipStudents(apiData.users)
    } catch (error) {
      console.error("Error fetching membership data:", error);
    }finally {
      setLoading(false);
    }
  }
  
  useEffect(()=>{
    fetchMembership()
  },[])

  if (loading && membershipStudents.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overflow-y-auto scrollbar-hide h-[calc(100vh-100px)]">
      <HoverEffect items={membershipStudents} />
    </div>
  );
}

export default Membership
