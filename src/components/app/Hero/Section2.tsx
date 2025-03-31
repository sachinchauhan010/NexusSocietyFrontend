import { Button } from "@/components/ui/button"
import EventCard from "./event-card"
import { useEffect, useState } from "react"
import { EventType } from "@/types/eventType"


export default function EventsSection() {

const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/get-events`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const apiData = await response.json();
        setEvents(apiData.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events?.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-center col-span-full">No events available.</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Button className="bg-purple-600 hover:bg-purple-700">Load more...</Button>
      </div>
    </section>
  )
}

