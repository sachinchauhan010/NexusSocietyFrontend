import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { NoticeType } from "@/types/noticeType";
import { formatDate } from "@/utils/dateFormate";
import { Link } from "react-router-dom";

export default function NoticeCard({ notice }: { notice: NoticeType }) {
  const maxWords = 12;
  const words = notice.description.trim().split(" ");
  const shortDescription =
    words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "... See more"
      : notice.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className=""
    >
      <Link to={`/notice/${notice.id}`} className="items-center justify-center">
        <Card className="bg-white border shadow-sm hover:shadow-md transition duration-300 w-[400px] h-auto">
          <CardHeader className="pb-1 space-y-1 leading-relaxed">
            <CardTitle className="text-base font-semibold truncate text-primary mb-3">
              {notice.title}
            </CardTitle>
            <CardDescription className="text-xs mb-3">
              <p className="text-black font-semibold mb-3">
                {formatDate(notice.date)}
              </p>
              {/* {notice.link && (
                <p className="truncate text-blue-600 max-w-[250px]">
                  {notice.link}
                </p>
              )} */}
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <p className="text-sm font-semibold">
              {shortDescription.split(" ").slice(0, 6).join(" ")}...
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
