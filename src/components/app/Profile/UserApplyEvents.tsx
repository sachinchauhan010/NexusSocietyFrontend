import { useEffect, useState } from "react";
import { EventType } from "@/types/eventType";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Users, Compass, CalendarX } from "lucide-react";
import { Link } from "react-router-dom";

function UserApplyEvents() {
  const [appliedEvents, setAppliedEvents] = useState<EventType[]>([]);

  useEffect(() => {
    fetchAppliedEvents();
  }, []);

  const fetchAppliedEvents = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_PRODUCTION_API_URI
        }/api/event/get-applied-events-details`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setAppliedEvents(data.appliedEvents);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log(appliedEvents, "appliedEvents");

  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Events You've Applied For
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {appliedEvents.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="flex flex-col items-center justify-center space-y-4">
              <CalendarX className="w-12 h-12 text-purple-500" />
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                No Events Yet
              </h2>
              <p className="text-base text-gray-500 max-w-md">
                You haven’t applied to any events yet. When you do, they’ll
                appear here.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded-md text-sm font-semibold">
                <Link to="/event" className="flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Discover Exciting Events
                </Link>
              </button>
            </div>
          </div>
        ) : (
          appliedEvents.map((event, index) => (
            <motion.div
              key={event?.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300 ease-in-out"
            >
              {event?.banner && (
                <img
                  src={event.banner}
                  alt={event?.name || "Event Banner"}
                  className="rounded-xl mb-4 w-full object-cover h-64"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {event?.name || "Unnamed Event"}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {event?.description
                  ? event.description.split(" ").slice(0, 15).join(" ") +
                    (event.description.split(" ").length > 15 ? "..." : "")
                  : "No description available."}
              </p>

              <div className="text-sm text-gray-500 space-y-1">
                {event?.venue && (
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-600" />
                    <span>
                      <span className="font-medium">Venue:</span> {event.venue}
                    </span>
                  </p>
                )}
                {event?.start_date && (
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-gray-600" />
                    <span>
                      <span className="font-medium">Start:</span>{" "}
                      {new Date(event.start_date).toLocaleDateString()}{" "}
                      {event?.start_time && `at ${event.start_time}`}
                    </span>
                  </p>
                )}
                {event?.end_date && (
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-gray-600" />
                    <span>
                      <span className="font-medium">End:</span>{" "}
                      {new Date(event.end_date).toLocaleDateString()}{" "}
                      {event?.end_time && `at ${event.end_time}`}
                    </span>
                  </p>
                )}
                {event?.participants !== undefined && (
                  <p className="flex items-center gap-2">
                    <Users size={16} className="text-gray-600" />
                    <span>
                      <span className="font-medium">Participants:</span>{" "}
                      {event.participants}
                    </span>
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

export default UserApplyEvents;
