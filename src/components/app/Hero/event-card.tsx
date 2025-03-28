import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge.tsx"
import { MoreVertical } from "lucide-react"
import { EventType } from "@/types/eventType"

export default function EventCard({ event }: { event: EventType }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0 relative">
        <Badge className="absolute top-2 left-2 bg-white text-black font-medium">NEW</Badge>
        <img src={event.banner || "/placeholder.svg"} alt={event.name} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm line-clamp-2">{event.name}</h3>
          <button className="text-gray-500">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
        <p className="text-purple-600 text-xs mt-2">{event.start_date}</p>
        <p className="text-purple-600 text-xs mt-2">{event.end_date}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start">
        <p className="text-xs text-gray-500 uppercase">
          {event.start_time} - {event.end_time}
        </p>
      </CardFooter>
    </Card>
  )
}

