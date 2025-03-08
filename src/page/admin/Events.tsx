import AllEvents from "@/components/app/Admin/Events/AllEvents"
import { CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom"

function Events() {
  return (
    <div>
      <div className="ml-6 flex justify-start">
        <Link
          to="/admin/create/events"
          className="flex items-center gap-2 bg-purple-500 text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-purple-600 transition"
        >
          <CalendarPlus />
           Create Event
        </Link>
      </div>
      <AllEvents />
    </div>
  );
}

export default Events
