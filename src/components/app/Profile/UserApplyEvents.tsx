import { useEffect , useState} from "react"
import { EventType } from "@/types/eventType"
import { motion } from "framer-motion";

function UserApplyEvents() {

  const [appliedEvents, setAppliedEvents] = useState<EventType[]>([])

  useEffect(()=>{
    fetchAppliedEvents()
  },[])

  const fetchAppliedEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/get-applied-events-details`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()

      setAppliedEvents(data.appliedEvents)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }
  
  console.log(appliedEvents, "appliedEvents")

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
      Your Applied Events
      </h2>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {appliedEvents.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">
        No events applied yet.
        </p>
      ) : (
        appliedEvents.map((event, index) => (

        <motion.div
          key={event?.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, type: "spring" }}
          className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300 ease-in-out"
        >
          console.log(event, "event")
          {event?.banner && (
          <img
            src={event.banner}
            alt={event?.name || "Event Banner"}
            className="rounded-xl mb-4 w-full h-40 object-cover"
          />
          )}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{event?.name || "Unnamed Event"}</h3>
          <p className="text-gray-600 text-sm mb-3">{event?.description || "No description available."}</p>
    
          <div className="text-sm text-gray-500 space-y-1">
          {event?.venue && (
            <p>
            <span className="font-medium">Venue:</span> {event.venue}
            </p>
          )}
          {event?.start_date && (
            <p>
            <span className="font-medium">Start:</span>{" "}
            {new Date(event.start_date).toLocaleDateString()}{" "}
            {event?.start_time && `at ${event.start_time}`}
            </p>
          )}
          {event?.end_date && (
            <p>
            <span className="font-medium">End:</span>{" "}
            {new Date(event.end_date).toLocaleDateString()}{" "}
            {event?.end_time && `at ${event.end_time}`}
            </p>
          )}
          {event?.participants !== undefined && (
            <p>
            <span className="font-medium">Participants:</span> {event.participants}
            </p>
          )}
          {event?.registration_link && (
            <p>
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Registration Link
            </a>
            </p>
          )}
          </div>
        </motion.div>
        ))
      )}
      </div>
    </div>
  );
  
}

export default UserApplyEvents
