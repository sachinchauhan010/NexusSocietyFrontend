import { Link } from "react-router-dom"
import { EventType } from "@/types/eventType";

function Section2({ event }: { event: EventType }) {
  
  return (
    <div className="py-12 md:px-6 w-full mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Column */}
      <div>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <div className="space-y-4 text-gray-600">
            <p>
            {event.description ?? "No description available for this event."}
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Hours</h2>
          <div className="space-y-2">
            <div className="flex">
              <span className="w-36 text-gray-600">Timing</span>
              <span className="text-purple-600 font-medium">{event.start_time} to {event.end_time}</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Organizer Contact</h2>
          <p className="text-gray-600">
            Please go to{" "}
            <Link to="http://www.sneakypeeks.com" className="text-purple-600 hover:underline">
              www.sneakypeeks.com
            </Link>{" "}
            and refer the FAQ section for more detail
          </p>
        </section>
      </div>

      {/* Right Column */}
      <div>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Event location </h2>
          <span className="text-purple-600 font-medium">{event.venue}</span>

          <div className="rounded-lg overflow-hidden mb-4 h-48 bg-gray-100">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Event location map"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

      </div>
    </div>
  </div>
  )
}

export default Section2
