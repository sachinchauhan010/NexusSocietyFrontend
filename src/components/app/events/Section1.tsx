import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventType } from "@/types/eventType";
import { formatDate } from "../../../utils/dateFormate.ts";

function Section1({event}: { event: EventType }) {

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={event.banner ?? "/default-banner.jpg"}
          alt="CSSE event banner"
          className="w-full h-full object-cover brightness-75"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-10 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <Link
              to="#"
              className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>

            <div className="mt-6 md:mt-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {event.name ?? "No Name of Event"}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                Organized by NexusSociety @ {event.venue}
              </h2>
              {/* <p className="text-white text-sm md:text-base max-w-2xl mb-8">
                {event.description ??
                  "No description available for this event."}
              </p> */}

              <button className="inline-flex items-center text-white border border-white rounded-md px-4 py-2 text-sm">
                <MapPin className="mr-2 h-4 w-4" />
                View Location
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 mt-10 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Event Date & Time</h3>
              <p className="text-gray-700 mb-4">{formatDate(event.start_date ?? "")} - {formatDate(event.end_date ?? "")} </p>
              <p className="text-gray-700 mb-4">{event.start_time} - {event.end_time} </p>

              <div className="space-y-3">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Join Event
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Society
                </Button>
                <p className="text-center text-gray-500 text-sm mt-4">
                  *No entry without registration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
