import { useParams } from "react-router-dom"; // or `next/router` in Next.js
import { useEffect, useState } from "react";
import { NoticeType } from "@/types/noticeType";
import { formatDate } from "@/utils/dateFormate";
import { toast } from "sonner"; // For notifications, if needed
import { motion } from "framer-motion"; // Import motion from Framer Motion

export default function ParticularNotice() {
  const { id } = useParams(); // Get the notice id from the URL
  const [notice, setNotice] = useState<NoticeType | null>(null);

  useEffect(() => {
    fetchNotice(id);
  }, [id]);

  const fetchNotice = async (id: string | undefined) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/notice/get-notice/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const apiData = await response.json();
      setNotice(apiData.noticeData || null);
    } catch (error) {
      console.error("Error fetching notice:", error);
      toast.error("Error fetching notice");
    }
  };

  if (!notice) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <motion.section
      className="p-6"
      initial={{ opacity: 0, y: 30 }} // Initial state for animation
      animate={{ opacity: 1, y: 0 }} // Final state when animation is complete
      transition={{ duration: 0.6 }} // Duration of the animation
    >
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }} // Slight delay for the title
      >
        {notice.title}
      </motion.h1>
      
      <motion.p
        className="text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }} // Slight delay for the date
      >
        {formatDate(notice.date)}
      </motion.p>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }} // Slight delay for content
      >
        <motion.p
          className="text-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }} // Slight delay for description
        >
          {notice.description}
        </motion.p>

        <motion.p
          className="mt-2 text-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }} // Slight delay for the link
        >
          Link: {notice.link ?? "NA"}
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
