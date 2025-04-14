import { Button } from "@/components/ui/button"
import { CalendarPlus } from "lucide-react";

export default function CreateEventSection() {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold mb-6 justify-center">
          Be The <span className="text-purple-600">Organizer</span>
        </h2>
      </div>

      <section className="bg-purple-300 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-5/12 p-8 flex items-center justify-center">
            <img
              src="./createevent.jpg"
              alt="People creating an event"
              className="max-w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center text-white">
            <h2 className="text-3xl font-bold mb-4">Create Your Own Event</h2>
            <p className="text-white mb-6 font-medium text-lg">
              Be more than just a resident — be a creator of memories. Plan your
              own events that bring people closer, celebrate diversity, and
              build unity. From festive functions to meaningful meetups, make it
              all happen in just a few clicks. Let your ideas shine and let the
              society celebrate with you. Because great communities are built
              through shared moments
            </p>
            <div>
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 font-semibold " />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

