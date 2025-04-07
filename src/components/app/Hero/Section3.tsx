import { Button } from "@/components/ui/button"
import WebBanner from '/Webbanner.jpg'

export default function CreateEventSection() {
  return (
    <section className="bg-indigo-900 rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-5/12 p-8 flex items-center justify-center">
          <img
            src={WebBanner}
            alt="People creating an event"
            className="max-w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center text-white">
          <h2 className="text-2xl font-bold mb-4">Make your own Event</h2>
          <p className="text-white/80 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div>
            <Button className="bg-purple-600 hover:bg-purple-700">Create Events</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

