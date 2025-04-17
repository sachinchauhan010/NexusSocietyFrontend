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
    >
      <Link to={`/notice/${notice.id}`} className="block">
        <Card className="bg-white border shadow-sm hover:shadow-md transition duration-300 w-[300px] h-[170px]">
          <CardHeader className="pb-1 space-y-1">
            <CardTitle className="text-base font-semibold truncate text-primary">
              {notice.title}
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              <p className="">{formatDate(notice.date)}</p>
              {notice.link && (
                <p className="truncate text-blue-600 max-w-[250px]">
                  {notice.link}
                </p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground">{shortDescription}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
