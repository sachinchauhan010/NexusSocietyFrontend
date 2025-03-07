import { useState, useEffect } from "react";
import { EventType } from "@/types/eventType";
import { Link } from "react-router-dom";

function AllEvents() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/get-events`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length > 0 ? (
          events.map((event) => (
            <Link to={`${event.id}`} key={event.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>DC Team:</strong> {event.dc_team.join(", ")}</p>
              <p><strong>Participants:</strong> {event.participants}</p>
              <p><strong>Start Date:</strong> {event.start_date}</p>
              <p><strong>End Date:</strong> {event.end_date}</p>
              <p><strong>Start Time:</strong> {event.start_time}</p>
              <p><strong>End Time:</strong> {event.end_time}</p>
              <img src={event.banner} alt={`${event.name} banner`} className="w-full h-auto mt-2" />
              {event.registration_link && (
                <a href={event.registration_link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  Register
                </a>
              )}
            </Link>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default AllEvents;