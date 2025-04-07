import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

function Section3() {
  return (
    <div className="px-4 py-12 md:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
    <h2 className="text-xl font-bold mb-8">Other events you may like</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item} className="overflow-hidden">
          <div className="relative h-48">
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-white text-black">FREE</Badge>
            </div>
            <img
              src={
                item % 2 === 0
                  ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UGQKAOHp7S1n8O7h99FOWEOpWNWqOc.png"
                  : "/placeholder.svg?height=300&width=400"
              }
              alt="Event thumbnail"
              className="object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">
              BestSeller Book Bootcamp -write, Market & Publish Your Book -Lucknow
            </h3>
            <p className="text-purple-600 text-sm mb-2">Saturday, March 18, 9:30PM</p>
            <p className="text-gray-500 text-sm">ONLINE EVENT - Attend anywhere</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
  )
}

export default Section3
