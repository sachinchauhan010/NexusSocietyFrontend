import { SocietyLogin } from "@/components/app/head/Society/SocietyLogin"
import { Link } from "react-router-dom"

function Society() {
  return (
    <div>
      <Link to="/society/register-society">Register Society</Link>
      <SocietyLogin/>
    </div>
  )
}

export default Society
