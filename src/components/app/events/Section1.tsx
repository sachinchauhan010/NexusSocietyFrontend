import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventType } from "@/types/eventType";
import { formatDate } from "../../../utils/dateFormate.ts";
import { useAuth } from "@/context/AuthContext.tsx";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ParticipantsDetail from "./ParticipantsDetail.tsx";

type ApplyEventType = {
  eventId: string;
  email: string;
};

function Section1({ event }: { event: EventType }) {
  const [appliedEvents, setAppliedEvents] = useState<ApplyEventType[]>([]);
  const { authState } = useAuth();
  const [showParticipantDialog, setShowParticipantDialog] = useState(false);

  useEffect(() => {
    fetchAppliedEvents();
  }, []);

  const fetchAppliedEvents = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/get-applied-events`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const apiData = await response.json();

      if (!response.ok) {
        console.error("Error fetching applied events", apiData);
      }
      setAppliedEvents(apiData.appliedEvents || []);
    } catch (error) {
      console.log("Error while fetching applied events", error);
    }
  };

  const handleApply = async () => {
    try {
      if (!authState || !authState.email) {
        toast.error("Please log in first");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/apply-event/${event.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: authState.email,
          }),
        }
      );

      const apiData = await response.json();
      if (response.ok) {
        toast.success("Applied for event successfully", {
          description: "You will receive a confirmation email shortly.",
        });
        fetchAppliedEvents();
      } else {
        console.error("Error applying for event", apiData);
        toast.error("Error applying for event", {
          description: apiData.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.log("Error while applying for event", error);
      toast.error("Error applying for event", {
        description: "Something went wrong",
      });
    }
  };

  const isEventApplied = appliedEvents.some(
    (appliedEvent) => appliedEvent.eventId === event.id
  );

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0">
        <img
          src={event.banner ?? "/default-banner.jpg"}
          alt="CSSE event banner"
          className="w-full h-full object-cover brightness-75"
        />
      </div>

      <div className="relative z-10 px-4 py-10 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
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

              <button className="inline-flex items-center text-white border border-white rounded-md px-4 py-2 text-sm">
                <MapPin className="mr-2 h-4 w-4" />
                View Location
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 mt-10 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Event Date & Time</h3>
              <p className="text-gray-700 mb-4">
                {formatDate(event.start_date ?? "")} -{" "}
                {formatDate(event.end_date ?? "")}
              </p>
              <p className="text-gray-700 mb-4">
                {event.start_time} - {event.end_time}
              </p>

              <div className="space-y-3">
                {isEventApplied ? (
                  <Button className="w-full bg-green-600 text-white" disabled>
                    Applied
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => {
                      if (event.participants && event.participants > 1) {
                        setShowParticipantDialog(true);
                      } else {
                        handleApply();
                      }
                    }}
                  >
                    Join Event
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <Link to={"/get-in-touch"}>Contact Organizer</Link>
                </Button>
                <p className="text-center text-gray-500 text-sm mt-4">
                  *No entry without registration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Fixed: Passing required props to ParticipantsDetail */}
      <ParticipantsDetail
        open={showParticipantDialog}
        setOpen={setShowParticipantDialog}
        numberOfParticipants={event.participants ?? 1}
        onSubmitSuccess={fetchAppliedEvents}
      />
    </div>
  );
}

export default Section1;
