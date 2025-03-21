import HeroSection from "@/components/app/Hero/Section1"
import EventsSection from "@/components/app/Hero/Section2"
import CreateEventSection from "@/components/app/Hero/Section3"
import BrandsSection from "@/components/app/Hero/Section4"
import CollegesSection from "@/components/app/Hero/Section5"
import BlogsSection from "@/components/app/Hero/Section6"

function Hero() {
  return (
    <div>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <EventsSection />
        <CreateEventSection />
        <BrandsSection />
        <CollegesSection />
        <BlogsSection />
      </div>
    </div>
  )
}

export default Hero
