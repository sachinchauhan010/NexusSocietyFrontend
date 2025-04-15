import HeroSection from "@/components/app/Hero/Section1"
import EventsSection from "@/components/app/Hero/Section2"
import CreateEventSection from "@/components/app/Hero/Section3"
import BrandsSection from "@/components/app/Hero/Section4"
import TrendingEventsSection from "@/components/app/Hero/Section5"

function Hero() {
  return (
    <div>
      <HeroSection />
      <div className="mx-auto px-4 py-12 space-y-20">
        <EventsSection />
        <CreateEventSection />
        <BrandsSection />
        <TrendingEventsSection />
      </div>
    </div>
  )
}

export default Hero
