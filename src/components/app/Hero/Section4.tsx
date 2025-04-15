import NoticeCard from "../Notice/NoticeCard";
import Marquee from "react-fast-marquee";
export default function BrandsSection() {

  return (
    <section>
      <h1 className="text-2xl " >Notice</h1>

      <Marquee>

      <NoticeCard/>
      </Marquee>
    </section>
  )
}

