import { Button } from "@/components/ui/button"
import EventCard from "./event-card"

const events = [
  {
    id: 1,
    title: "Particular Rock Resonance: write, Market & Publish Your Book - London",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IRHWPdNyXJOy1G1YgLXX1IZL92Pody.png",
    date: "Saturday, March 18, 4:30pm",
    type: "ONLINE EVENT",
    attendees: "About 6 attendees",
  },
  {
    id: 2,
    title: "Particular Rock Resonance: write, Market & Publish Your Book - London",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IRHWPdNyXJOy1G1YgLXX1IZL92Pody.png",
    date: "Saturday, March 18, 4:30pm",
    type: "ONLINE EVENT",
    attendees: "About 6 attendees",
  },
  {
    id: 3,
    title: "Particular Rock Resonance: write, Market & Publish Your Book - London",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IRHWPdNyXJOy1G1YgLXX1IZL92Pody.png",
    date: "Saturday, March 18, 4:30pm",
    type: "ONLINE EVENT",
    attendees: "About 6 attendees",
  },
  {
    id: 4,
    title: "Particular Rock Resonance: write, Market & Publish Your Book - London",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IRHWPdNyXJOy1G1YgLXX1IZL92Pody.png",
    date: "Saturday, March 18, 4:30pm",
    type: "ONLINE EVENT",
    attendees: "About 6 attendees",
  },
  {
    id: 5,
    title: "Particular Rock Resonance: write, Market & Publish Your Book - London",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IRHWPdNyXJOy1G1YgLXX1IZL92Pody.png",
    date: "Saturday, March 18, 4:30pm",
    type: "ONLINE EVENT",
    attendees: "About 6 attendees",
  },
  {
    id: 6,
    title: "Particular Rock Resonance: write, Market & Publish Your Book - London",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IRHWPdNyXJOy1G1YgLXX1IZL92Pody.png",
    date: "Saturday, March 18, 4:30pm",
    type: "ONLINE EVENT",
    attendees: "About 6 attendees",
  },
]

export default function EventsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Upcoming <span className="text-purple-600">Events</span>
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Filter by
          </Button>
          <Button variant="outline" size="sm">
            Event type
          </Button>
          <Button variant="outline" size="sm">
            Category
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button className="bg-purple-600 hover:bg-purple-700">Load more...</Button>
      </div>
    </section>
  )
}

