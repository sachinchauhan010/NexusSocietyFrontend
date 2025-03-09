import { useState, useEffect } from "react";
import { EventType } from "@/types/eventType";
import { Link } from "react-router-dom";
import { CalendarDays,  Clock, MapPin, Ticket, Users } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-0 py-0 flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full mt-6">
        <div className="lg:w-1/3 text-center lg:text-left">
          <p className="text-sm text-black font-semibold">
            Thriving Above Event Expectations.
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-normal mt-0">
            Event<span className="text-purple-500">Hive</span>-ing
            <br />
            the Best Day
            <br /> Ever.
          </h1>
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-6">
            <div className="bg-purple-500 text-white font-bold text-lg px-4 py-8 rounded-lg shadow">
              2k+ <br />
              <span className="text-sm text-white font-bold">
                Total Events Hosted
              </span>
            </div>
            <div className="bg-purple-500 text-white font-bold text-lg px-5 py-8 rounded-lg shadow">
              100+ <br />
              <span className="text-sm text-white font-bold">
                Total Events Live
              </span>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 w-full flex justify-center lg:justify-end">
          <img
            src="/image6.jpg"
            alt="Event Image"
            className="w-full max-w-2xl lg:max-w-2xl h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center py-4 mb-2">
        <h2 className="text-3xl font-bold text-black">All Events</h2>
        <p className="text-black text-lg mt-1 font-semibold">
          Every Moment Counts , Be Part of Something Amazing!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <Link
              to={`${event.id}`}
              key={event.id}
              className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={event.banner}
                alt={`${event.name} banner`}
                className="w-full h-52 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-2xl font-bold mt-4 text-gray-800">
                {event.name}
              </h3>
              <p className="text-gray-600 mt-2">{event.description}</p>

              <div className="mt-4 space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <MapPin size={22} className="text-red-500" />
                  <strong>Venue:</strong> {event.venue}
                </p>
                <p className="flex items-center gap-2">
                  <Users size={22} className="text-blue-500" />
                  <strong>DC Team:</strong> {event.dc_team.join(", ")}
                </p>
                <p className="flex items-center gap-2">
                  <Ticket size={22} className="text-green-500" />
                  <strong>Participants:</strong> {event.participants}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays size={22} className="text-yellow-500" />
                  <strong>Start Date:</strong> {event.start_date}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays size={22} className="text-orange-500" />
                  <strong>End Date:</strong> {event.end_date}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={22} className="text-purple-500" />
                  <strong>Start Time:</strong> {event.start_time}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={22} className="text-pink-500" />
                  <strong>End Time:</strong> {event.end_time}
                </p>
              </div>

              {event.registration_link && (
                <a
                  href={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
                >
                  Register Now
                </a>
              )}
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No events found.</p>
        )}
      </div>
    </div>
  );
}

export default AllEvents;