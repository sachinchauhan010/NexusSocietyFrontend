import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { NoticeType } from "@/types/noticeType";
import { formatDate } from "@/utils/dateFormate";
import { Link } from "react-router-dom"; // or use `next/link` for Next.js

export default function NoticeCard({ notice }: { notice: NoticeType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/notice/${notice.id}`} className="block"> {/* Link to the dynamic notice page */}
        <Card className="bg-background border shadow-md hover:shadow-lg transition duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{notice.title}</CardTitle>
            <CardDescription>
              <p>{formatDate(notice.date)}</p>
              <p>{notice.link ?? "NA"}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{notice.description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
