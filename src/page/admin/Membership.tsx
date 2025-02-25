import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useEffect, useState } from "react";
import { User } from "@/types/userType.ts";


function Membership() {

  const [membershipStudents, setMembershipStudents] = useState<User[]>([]);

  const fetchMembership = async () => {
    const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/membership`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    })
    const apiData = await response.json();
    setMembershipStudents(apiData.users)
  }
  
  useEffect(()=>{
    fetchMembership()
  },[])

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={membershipStudents} />
    </div>
  )
}

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

export default Membership
