import Section1 from "@/components/app/events/Section1";
import Section2 from "@/components/app/events/Section2";
import Section3 from "@/components/app/events/Section3";
import { EventType } from "@/types/eventType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "@/components/app/Loader";


function UserEvent() {
  const { id } = useParams<{ id: string }>(); 
  const [event, setEvent] = useState<EventType | null>(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true)
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
    } finally{
      setLoading(false)
    }
  };

  if (loading || !event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }


  return (
    <div className="min-h-screen">
      {/* Pass the event data to each section */}
      <Section1 event={event} />
      <Section2 event={event} />
      <Section3 />
    </div>
  );
}

export default UserEvent;