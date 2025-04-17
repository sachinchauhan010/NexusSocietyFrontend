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
  // Truncate description to first 12 words
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
    >
      <Link to={`/notice/${notice.id}`} className="block">
        <Card className="bg-background border shadow-md hover:shadow-lg transition duration-300 w-[300px] h-[150px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold line-clamp-1">
              {notice.title}
            </CardTitle>
            <CardDescription className="text-xs">
              <p>{formatDate(notice.date)}</p>
              <p className="truncate">{notice.link ?? "NA"}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {shortDescription}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
