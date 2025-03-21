import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge.tsx"
import { MoreVertical } from "lucide-react"

interface EventCardProps {
  event: {
    id: number
    title: string
    image: string
    date: string
    type: string
    attendees: string
  }
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 relative">
        <Badge className="absolute top-2 left-2 bg-white text-black font-medium">NEW</Badge>
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm line-clamp-2">{event.title}</h3>
          <button className="text-gray-500">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
        <p className="text-purple-600 text-xs mt-2">{event.date}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start">
        <p className="text-xs text-gray-500 uppercase">
          {event.type} · {event.attendees}
        </p>
      </CardFooter>
    </Card>
  )
}

