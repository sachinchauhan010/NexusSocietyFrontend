import Section1 from "@/components/app/events/Section1";
import Section2 from "@/components/app/events/Section2";
import Section3 from "@/components/app/events/Section3";
import { EventType } from "@/types/eventType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserEvent() {
  const { id } = useParams<{ id: string }>(); // Get the event ID from the URL
  const [event, setEvent] = useState<EventType | null>(null); // Store a single event

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/${id}`, // Use the event ID in the API URL
        {
          method: "GET",
          // headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const apiData = await response.json();
      setEvent(apiData.eventData || null); // Set the fetched event data
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  if (!event) {
    return <p className="text-center text-gray-500">Loading event details...</p>;
  }

  console.log(event, "Event data fetched successfully");

  return (
    <div className="min-h-screen">
      {/* Pass the event data to each section */}
      <Section1 event={event} />
      <Section2 event={event} />
      <Section3 event={event} />
    </div>
  );
}

export default UserEvent;