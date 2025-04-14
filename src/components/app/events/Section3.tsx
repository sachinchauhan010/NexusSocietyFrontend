
import { EventType } from "@/types/eventType";
import EventsSection from "../Hero/Section2";

function Section3({ event }: { event: EventType }) {
  console.log(event, "Event data in Section3")
  return (
    <EventsSection />
  )
}

export default Section3
