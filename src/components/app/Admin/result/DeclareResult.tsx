import { useState, useEffect } from "react";
import { EventType } from "@/types/eventType";
import { formatDate } from "@/utils/dateFormate";
import { ResultForm } from "./ResultForm";

function DeclareResult() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [completedEvents, setCompletedEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/get-events`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
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

    fetchEvents();
  }, []);

  useEffect(() => {
    const currentDate = new Date();

    // Filter events that have been completed
    const filteredEvents = events.filter((event) => {
      const endDate = new Date(event.end_date || 0);
      return endDate < currentDate; // Event is completed if its end_date is in the past
    });

    setCompletedEvents(filteredEvents);
  }, [events]);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Completed Events</h1>
      {completedEvents.length === 0 ? (
        <p className="text-gray-600">No completed events to display.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedEvents.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg shadow-md p-4 bg-white dark:bg-neutral-800"
            >
              <img
                src={event.banner}
                alt={event.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Event ID:</span> {event.id}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Date:</span>{" "}
                {formatDate(event?.start_date || "")} - {formatDate(event?.end_date || "")}
              </p>
              <div className="mt-4">
                <ResultForm event={{ ...event, participants: event.participants || 0 }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeclareResult;