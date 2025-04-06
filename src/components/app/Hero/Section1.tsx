import HomeImage from '/HomePage1.png'
import './homeStyle.css'

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded overflow-hidden">
        <div className="absolute inset-0 z-10"></div>
        <img
          src={HomeImage}
          alt="Event crowd"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container d-flex justify-content-center align-items-center vh-100 ml-20">
        <h1 className="animated-text text-center mb-4">Your next adventure awaits...</h1>
      </div>

    </section>
  )
}

