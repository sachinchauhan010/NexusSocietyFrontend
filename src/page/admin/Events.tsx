import AllEvents from "@/components/app/Admin/Events/AllEvents"
import { Link } from "react-router-dom"

function Events() {
  return (
    <div>
      <Link to="/admin/create/events">Create Event</Link>
      <AllEvents/>
    </div>
  )
}

export default Events
