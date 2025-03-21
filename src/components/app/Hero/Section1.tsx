import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HeroSection() {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IEg1G1z0eSHzq809V1QfW3xaOoYh5D.png"
          alt="Event crowd"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          MADE FOR THOSE
          <br />
          WHO DO
        </h1>

        {/* Search Form */}
        <div className="w-full max-w-4xl bg-indigo-900 rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-1">
              <label htmlFor="looking-for" className="block text-xs text-white mb-1">
                Looking for
              </label>
              <Select>
                <SelectTrigger id="looking-for" className="w-full bg-white">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concerts">Concerts</SelectItem>
                  <SelectItem value="workshops">Workshops</SelectItem>
                  <SelectItem value="conferences">Conferences</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="location" className="block text-xs text-white mb-1">
                Location
              </label>
              <Select>
                <SelectTrigger id="location" className="w-full bg-white">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1">
              <label htmlFor="when" className="block text-xs text-white mb-1">
                When
              </label>
              <Select>
                <SelectTrigger id="when" className="w-full bg-white">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1 flex items-end">
              <Button className="w-full h-10 bg-purple-600 hover:bg-purple-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

