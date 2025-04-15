import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const notices = [
  {
    title: "Hackathon 2025",
    description: "Join the annual coding hackathon. Teams up to 4 allowed.",
    date: "April 28, 2025",
    location: "Auditorium Hall A",
  },
  {
    title: "Tech Quiz Challenge",
    description: "Participate in a 3-round quiz based on tech and coding.",
    date: "May 4, 2025",
    location: "Seminar Hall 3",
  },
  {
    title: "AI Workshop",
    description: "Hands-on session on building AI models using Python.",
    date: "May 10, 2025",
    location: "Lab 101",
  },
  {
    title: "Web Design Contest",
    description: "Create a landing page UI in under 90 minutes.",
    date: "May 18, 2025",
    location: "Room 204",
  },
  {
    title: "Group Discussion Round",
    description: "Pre-placement discussion for shortlisted students.",
    date: "May 22, 2025",
    location: "Placement Cell",
  },
  {
    title: "TechWhiz Meetup",
    description: "All members are invited for a session + snacks.",
    date: "May 25, 2025",
    location: "TechWhiz Office",
  },
]

export default function NoticeCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {notices.map((notice, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="bg-background border shadow-md hover:shadow-lg transition duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{notice.title}</CardTitle>
              <CardDescription>{notice.date} • {notice.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{notice.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
