import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { EventType } from "@/types/eventType";
import { ExternalLink } from "lucide-react"; // 👈 Lucide icon import
import Tilt from "react-parallax-tilt"; // 👈 Added for tilt effect
import HowWeHelp from "../components/app/events/HowWeHelp";
import { Link } from "react-router-dom";

export default function AllUserEvents() {
  const [events, setEvents] = useState<EventType[]>([]);

  const fetchAllEvents = async () => {
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
      setEvents(apiData.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const now = new Date();

  const pastEvents = events.filter(
    (event) => event.end_date && new Date(event.end_date) < now
  );

  const upcomingEvents = events.filter(
    (event) => event.start_date && new Date(event.start_date) >= now
  );

  const renderCard = (event: EventType, showButton = true) => (
    <Link to={`/event/${event.id}`} key={event.id}>
      <Tilt
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
        glareEnable={false}
        key={event.id}
      >
        <div className="flex flex-col justify-between h-full rounded-lg overflow-hidden shadow-md bg-white dark:bg-neutral-900 transition-all hover:scale-[1.02] hover:shadow-lg">
          <div className="w-full h-44 relative overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            <img
              src={event.banner || "/default-banner.jpg"}
              alt={event.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="p-3 flex flex-col justify-between flex-grow">
            <div>
              <h2 className="text-base font-semibold mb-1">{event.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {event.description?.slice(0, 70)}...
              </p>
              <p className="text-sm">
                <strong>Date:</strong> {event.start_date} to {event.end_date}
              </p>
              <p className="text-sm">
                <strong>Time:</strong> {event.start_time} - {event.end_time}
              </p>
              <p className="text-sm">
                <strong>Venue:</strong> {event.venue}
              </p>
            </div>

            {showButton && (
              <a
                href={event.registration_link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium bg-purple-600 text-white rounded hover:bg-purple-700 transition w-fit"
              >
                <ExternalLink size={16} />
                Register Now
              </a>
            )}
          </div>
        </div>
      </Tilt>
    </Link>

  );

  return (
    <div>
      <HowWeHelp />
      <Tabs defaultValue="upcoming" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="past" className="">Past Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
        </TabsList>

        {/* Past Events First */}
        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pastEvents.map((event) => renderCard(event, false))}
          </div>
        </TabsContent>

        {/* Upcoming Events Second */}
        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((event) => renderCard(event, true))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
