import { Link } from "react-router-dom"
import { ArrowLeft, MapPin} from "lucide-react"
import { Button } from "@/components/ui/button"

function Section1() {
  return (
    <div className="relative w-full">
    <div className="absolute inset-0">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-flAgyYjcsuTxiV5k6FR4QJlHJIFjEu.png"
        alt="Event crowd with pink flags"
        className="object-cover brightness-75"
      />
    </div>

    <div className="relative z-10 px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Link
            to="#"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>

          <div className="mt-8 md:mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Dream world wide in jakarta
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">IIIT Sonepat</h2>
            <p className="text-white text-sm md:text-base max-w-2xl mb-8">
              DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. The workshop taught
              participants the magic of creating stunning 3D models and animations using Blender. It was suitable
              for both beginners and experienced users. The event was followed by a blender-render competition,
              which added to the excitement.
            </p>

            <button className="inline-flex items-center text-white border border-white rounded-md px-4 py-2 text-sm">
              <MapPin className="mr-2 h-4 w-4" />
              View map
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 mt-8 md:mt-16">
            <h3 className="text-lg font-semibold mb-4">Date & time</h3>
            <p className="text-gray-700 mb-4">Saturday, March 18 2023, 9:30PM</p>

            <button className="text-purple-600 hover:underline mb-6">Add to calendar</button>

            <div className="space-y-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Book now</Button>
              <Button variant="outline" className="w-full">
                Program promoter
              </Button>
              <p className="text-center text-gray-500 text-sm mt-4">No Refunds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Section1
