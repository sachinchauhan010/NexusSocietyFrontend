import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EventType } from "@/types/eventType";

function EventDetail() {
  const { eventId } = useParams(); // Ensure the route uses `eventId` properly
  const [event, setEvent] = useState<EventType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/${eventId}`
        );

        if (!response.ok) {
          throw new Error("Event not found");
        }

        const data = await response.json();
        setEvent(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleUpdate = () => {
    navigate(`/admin/update-event/${eventId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/delete/${eventId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      alert("Event deleted successfully");
      navigate("/admin/events");
    } catch (err) {
      console.log(err);
      alert("Failed to delete event");
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold">{event.name}</h2>
      <p className="text-gray-600">{event.description}</p>
      <p className="mt-2"><strong>Venue:</strong> {event.venue}</p>
      {/* <p><strong>DC Team:</strong> {event.dc_team.join(", ")}</p> */}
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
      <div className="mt-4 flex gap-4">
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventDetail;