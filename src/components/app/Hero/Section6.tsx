import EventCard from "./event-card"

const blogs = [
  {
    id: 1,
    title: "Particular Rock Resonance: write, Market & Publish Your Book - London",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Sj1PC8So4ZzJl8CQD6xX6AuPDjc8OT.png",
    date: "Saturday, March 18, 4:30pm",
    type: "ONLINE EVENT",
    attendees: "About 6 attendees",
  },
  {
    id: 2,
    title: "Particular Rock Resonance: write, Market & Publish Your Book - London",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Sj1PC8So4ZzJl8CQD6xX6AuPDjc8OT.png",
    date: "Saturday, March 18, 4:30pm",
    type: "ONLINE EVENT",
    attendees: "About 6 attendees",
  },
  {
    id: 3,
    title: "Particular Rock Resonance: write, Market & Publish Your Book - London",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Sj1PC8So4ZzJl8CQD6xX6AuPDjc8OT.png",
    date: "Saturday, March 18, 4:30pm",
    type: "ONLINE EVENT",
    attendees: "About 6 attendees",
  },
]

export default function BlogsSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">
        Our <span className="text-purple-600">Blogs</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <EventCard key={blog.id} event={blog} />
        ))}
      </div>
    </section>
  )
}

