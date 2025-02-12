import { Login } from "./Auth/Login";
import { ThemeToggle } from "../ThemeToggle";

function Header() {
  return (
    <div className="flex justify-between items-center px-10 py-2">
      <div className="font-semibold text-2xl">
        <span className="dark:text-white mr-2 text-black">Nexus</span>
        <span className="text-blue-700">Society</span>
      </div>
      <div className="flex justify-start items-center gap-x-10">
        <Login/>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Header;
