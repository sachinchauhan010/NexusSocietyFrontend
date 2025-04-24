import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MoreHorizontal, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { EventType } from "@/types/eventType";
import { Link } from "react-router-dom";

export default function TrendingEventsSection() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<EventType[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Start with 3 events
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/get-events`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const apiData = await response.json();
        const sortedEvents = (apiData.events || []).sort((a: EventType, b: EventType) => {
          const dateA = new Date(`${a.start_date}T${a.start_time}`);
          const dateB = new Date(`${b.start_date}T${b.start_time}`);
          return dateA.getTime() - dateB.getTime(); // Sort by earliest events
        });

        setEvents(sortedEvents);
        setVisibleEvents(sortedEvents.slice(0, itemsPerPage)); // Initialize visible events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [itemsPerPage]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setItemsPerPage(itemsPerPage + 6); // Load 6 more events
    setVisibleEvents(events.slice(0, itemsPerPage + 6)); // Update visible events
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">
        Trending <span className="text-purple-600">Events</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleEvents.map((event) => (
          <Link to={`/event/${event.id}`} key={event.id}>
            <Card key={event.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={event.banner || "/placeholder.svg"}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white rounded-full px-2 py-0.5">
                  <Calendar className="h-3 w-3 text-gray-500" />
                  <span className="text-xs font-medium">
                    {event.start_date} {event.start_time}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold">{event.name}</h3>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {event.venue}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Participants: {event.participants || "N/A"}
                </div>
                <button className="text-gray-500">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {visibleEvents.length < events.length && (
        <div className="flex justify-center mt-8">
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleLoadMore}
          >
            Load more...
          </Button>
        </div>
      )}
    </section>
  );
}