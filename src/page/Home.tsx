import { Section1 } from "@/components/app/Home/Section1"
import { Section2 } from "@/components/app/Home/Section2"
import { Section3 } from "@/components/app/Home/Section3"
import Section4 from "@/components/app/Home/Section4"

//TODO: Yaha Par Society Controller ke baare me ui Banana h Ki Hamara ye Software kya kya krta h... Figma se achha UI dekh lena
function Home() {
  return (
    <div className="font-roboto">
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
    </div>
  )
}

export default Home
