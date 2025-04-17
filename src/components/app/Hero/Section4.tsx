import NoticeCard from "../Notice/NoticeCard";
import Marquee from "react-fast-marquee";
import { NoticeType } from "@/types/noticeType";
import { useEffect, useState } from "react";

export default function BrandsSection() {
  const [notices, setNotices] = useState<NoticeType[]>([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/notice/get-notices`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const apiData = await response.json();
      setNotices(apiData.noticesData || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  return (
    <section>
      <h1 className="text-4xl my-10 font-bold ">
        Notices And
        <span className="text-purple-600 text-4xl my-10 font-bold">   Alerts</span>
      </h1>

      <Marquee speed={100}>
        {notices.map((notice) => (
          <div key={notice.id} className="mx-4">
            <NoticeCard notice={notice} /> {/* Pass a single notice here */}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
