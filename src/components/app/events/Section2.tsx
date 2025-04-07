import { Link } from "react-router-dom"
import {  Facebook, Twitter} from "lucide-react"
import { Badge } from "@/components/ui/badge"

function Section2() {
  return (
    <div className="px-4 py-12 md:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Column */}
      <div>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. The workshop taught
              participants the magic of creating stunning 3D models and animations using Blender. It was suitable
              for both beginners and experienced users. The event was followed by a blender-render competition,
              which added to the excitement.
            </p>
            <p>
              DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. The workshop taught
              participants the magic of creating stunning 3D models and animations using Blender. It was suitable
              for both beginners and experienced users. The event was followed by a blender-render competition,
              which added to the excitement.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Hours</h2>
          <div className="space-y-2">
            <div className="flex">
              <span className="w-36 text-gray-600">Weekdays hour:</span>
              <span className="text-purple-600 font-medium">7PM - 10PM</span>
            </div>
            <div className="flex">
              <span className="w-36 text-gray-600">Sunday hour:</span>
              <span className="text-purple-600 font-medium">7PM - 10PM</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Organizer Contact</h2>
          <p className="text-gray-600">
            Please go to{" "}
            <Link to="http://www.sneakypeeks.com" className="text-purple-600 hover:underline">
              www.sneakypeeks.com
            </Link>{" "}
            and refer the FAQ section for more detail
          </p>
        </section>
      </div>

      {/* Right Column */}
      <div>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Event location</h2>
          <div className="rounded-lg overflow-hidden mb-4 h-48 bg-gray-100">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Event location map"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-lg mb-2">Dream world wide in jakarta</h3>
          <p className="text-gray-600">
            Dummy location generation model by RSU ... Our approach generates more realistic dummy locations
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-md">
              Indonesia event
            </Badge>
            <Badge variant="outline" className="rounded-md">
              Jaskaran event
            </Badge>
            <Badge variant="outline" className="rounded-md">
              UI
            </Badge>
            <Badge variant="outline" className="rounded-md">
              Jaskaran event
            </Badge>
            <Badge variant="outline" className="rounded-md">
              Seminar
            </Badge>
            <Badge variant="outline" className="rounded-md">
              Jaskaran event
            </Badge>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Share with friends</h2>
          <div className="flex gap-4">
            <Link to="#" className="text-blue-600 hover:text-blue-800">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100">
                <Facebook className="h-6 w-6" />
              </div>
            </Link>
            <Link to="#" className="text-green-600 hover:text-green-800">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M13.5 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M9 14h6a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1Z" />
                </svg>
              </div>
            </Link>
            <Link to="#" className="text-blue-600 hover:text-blue-800">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
            </Link>
            <Link to="#" className="text-blue-400 hover:text-blue-600">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-50">
                <Twitter className="h-6 w-6" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  </div>
  )
}

export default Section2
