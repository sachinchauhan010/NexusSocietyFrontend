import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Star } from "lucide-react"

const colleges = [
  {
    id: 1,
    name: "Harvard University",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rbW9IuEyX0VG6Zt59RF00YDP4RZBra.png",
    location: "Cambridge, Massachusetts, US",
    rating: 4.5,
    exclusive: true,
  },
  {
    id: 2,
    name: "Stanford University",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rbW9IuEyX0VG6Zt59RF00YDP4RZBra.png",
    location: "Stanford, California",
    rating: 4.8,
    exclusive: true,
  },
  {
    id: 3,
    name: "Nanyang University",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rbW9IuEyX0VG6Zt59RF00YDP4RZBra.png",
    location: "Nanyang Drive, Singapore",
    rating: 4.6,
    exclusive: true,
  },
]

export default function CollegesSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">
        Trending <span className="text-purple-600">colleges</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <Card key={college.id} className="overflow-hidden">
            <div className="relative">
              <img src={college.image || "/placeholder.svg"} alt={college.name} className="w-full h-48 object-cover" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white rounded-full px-2 py-0.5">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{college.rating}</span>
              </div>
              {college.exclusive && <Badge className="absolute bottom-2 right-2 bg-black text-white">EXCLUSIVE</Badge>}
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold">{college.name}</h3>
              <p className="text-gray-500 text-sm">{college.location}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div></div>
              <button className="text-gray-500">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button className="bg-purple-600 hover:bg-purple-700">Load more...</Button>
      </div>
    </section>
  )
}

