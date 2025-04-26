import HeroSection from "@/components/app/Hero/Section1"
import EventsSection from "@/components/app/Hero/Section2"
import CreateEventSection from "@/components/app/Hero/Section3"
import BrandsSection from "@/components/app/Hero/Section4"
import TrendingEventsSection from "@/components/app/Hero/Section5"
import MerchandiseList from "@/components/app/Product/MerchandiseList"
import { useEffect, useState } from "react"
import Loader from "@/components/app/Loader"
import Result from "@/components/app/Hero/Result"

function Hero() {

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <div className="mx-auto px-4 py-12 space-y-20">
        <Result/>
        <BrandsSection />
        <EventsSection />
        <CreateEventSection />
        <MerchandiseList />
        <TrendingEventsSection />
      </div>
    </div>
  );
}

export default Hero
