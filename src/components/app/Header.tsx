// import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "./Auth/UserProfile";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UserMembership from "@/page/UserMembership";
import AdminProtected from "../AdminProtected";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const { authState, dispatch: dispatchAuthState } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function checkAuth() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/check-auth`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const apiData = await response.json();
      if (!apiData.isLogin) {
        dispatchAuthState({ type: "LOGOUT" });
        toast.error("User not Logged in", { description: "Please login...." });
        return;
      }

      dispatchAuthState({
        type: "LOGIN",
        payload: {
          name: apiData.userdata.username || "",
          email: apiData.userdata.useremail || "",
        },
      });
    } catch (error) {
      console.log(error);
      dispatchAuthState({ type: "LOGOUT" });
      toast.error("User not Logged in", { description: "Please login...." });
    }
  }

  useEffect(() => {
    checkAuth();
  }, [dispatchAuthState]);

  return (
    <div className="px-4 py-2 bg-purple-100 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"} className="font-semibold text-2xl flex items-center">
          <span className="text-black dark:text-white hover:bg-purple-500 transition-colors duration-300 px-0 rounded">
            Nexus
          </span>
          <span className="text-purple-600 hover:bg-gray-500 hover:text-white transition-colors duration-300 px-0 rounded">
            Society
          </span>
        </Link>
        {/* Toggler Button (shown below md) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav Links (shown from md and above) */}
        <div className="hidden gap-x-10 items-center font-semibold ml-auto">
          <Link className="hover:text-purple-500" to="/event">
            Events
          </Link>
          <Link className="hover:text-purple-500" to="/services">
            Services
          </Link>
          <Link className="hover:text-purple-500" to="/about">
            About us
          </Link>
          <Link className="hover:text-purple-500" to="/get-merchandise">
            Merchandise
          </Link>
          <Link className="hover:text-purple-500" to="/faq">
            FAQs
          </Link>
          <Link className="hover:text-purple-500" to="/get-in-touch">
            Contact
          </Link>
        </div>
        <div className="hidden md:flex justify-end items-center gap-x-10 ">
          {authState.isLoggedIn && (
            <AdminProtected>
              <Link to="/admin">Admin Panel</Link>
            </AdminProtected>
          )}
          {authState.isLoggedIn ? <UserProfile /> : <UserMembership />}
          </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-semibold start">
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-purple-500"
            to="/services"
          >
            Services
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-purple-500"
            to="/about"
          >
            About us
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-purple-500"
            to="/faq"
          >
            FAQs
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-purple-500"
            to="/get-in-touch"
          >
            Contact
          </Link>
          {authState.isLoggedIn && (
            <AdminProtected>
              <Link onClick={() => setIsMenuOpen(false)} to="/admin">
                Admin Panel
              </Link>
            </AdminProtected>
          )}
          {authState.isLoggedIn ? <UserProfile /> : <UserMembership />}
        </div>
      )}
    </div>
  );
}

export default Header;
