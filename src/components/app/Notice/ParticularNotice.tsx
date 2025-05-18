import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NoticeType } from "@/types/noticeType";
import { formatDate } from "@/utils/dateFormate";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUserCircle,
  FaFileDownload,
  FaRegEye,
} from "react-icons/fa";

export default function ParticularNotice() {
  const { id } = useParams();
  const [notice, setNotice] = useState<NoticeType | null>(null);

  useEffect(() => {
    fetchNotice(id);
  }, [id]);

  const fetchNotice = async (id: string | undefined) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_PRODUCTION_API_URI
        }/api/notice/get-notice/${id}`,
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold text-muted-foreground"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.section
      className="p-6 md:p-12 lg:p-16 min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 text-gray-800 dark:text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-purple-600 mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {notice.title}
          </motion.h1>
          <motion.p
            className="flex items-center gap-2 text-gray-500 dark:text-gray-300 text-sm md:text-base"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FaCalendarAlt /> {formatDate(notice.date)} | <FaUserCircle /> Admin
          </motion.p>
        </div>

        <motion.div
          className="mt-8 space-y-6 text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
            {notice.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <FaFileDownload /> Download PDF
            </button>

            <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <FaRegEye className="w-4 h-4" /> View Events
            </button>
          </div>
        </motion.div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Related Notices</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow hover:shadow-md cursor-pointer transition-all"
              >
                <h3 className="font-semibold text-lg mb-1">{notice.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {notice.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
