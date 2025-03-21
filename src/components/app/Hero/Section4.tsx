export default function BrandsSection() {
  // const brands = [
  //   { name: "Spotify", logo: "/logos/spotify.svg" },
  //   { name: "Google", logo: "/logos/google.svg" },
  //   { name: "Stripe", logo: "/logos/stripe.svg" },
  //   { name: "YouTube", logo: "/logos/youtube.svg" },
  //   { name: "Microsoft", logo: "/logos/microsoft.svg" },
  //   { name: "Medium", logo: "/logos/medium.svg" },
  //   { name: "Zoom", logo: "/logos/zoom.svg" },
  //   { name: "Uber", logo: "/logos/uber.svg" },
  //   { name: "Grab", logo: "/logos/grab.svg" },
  // ]

  return (
    <section className="text-center">
      <h2 className="text-2xl font-bold mb-2">
        Join these <span className="text-purple-600">brands</span>
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        We've had the pleasure of working with industry-defining brands. These are just some of them.
      </p>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
        {/* For demonstration, using colored divs with brand names */}
        {/* In a real implementation, you would use actual logo images */}
        <div className="flex items-center justify-center h-12">
          <span className="text-green-500 font-bold">Spotify</span>
        </div>
        <div className="flex items-center justify-center h-12">
          <span className="text-blue-500 font-bold">Google</span>
        </div>
        <div className="flex items-center justify-center h-12">
          <span className="text-purple-500 font-bold">Stripe</span>
        </div>
        <div className="flex items-center justify-center h-12">
          <span className="text-red-500 font-bold">YouTube</span>
        </div>
        <div className="flex items-center justify-center h-12">
          <span className="text-blue-500 font-bold">Microsoft</span>
        </div>
        <div className="flex items-center justify-center h-12">
          <span className="text-black font-bold">Medium</span>
        </div>
        <div className="flex items-center justify-center h-12">
          <span className="text-blue-400 font-bold">Zoom</span>
        </div>
        <div className="flex items-center justify-center h-12">
          <span className="text-black font-bold">Uber</span>
        </div>
        <div className="flex items-center justify-center h-12">
          <span className="text-green-400 font-bold">Grab</span>
        </div>
      </div>
    </section>
  )
}

