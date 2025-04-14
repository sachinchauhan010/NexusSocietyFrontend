// import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "./Auth/UserProfile";
import { useEffect } from "react";
import { toast } from "sonner";
import UserMembership from "@/page/UserMembership";
import AdminProtected from "../AdminProtected";
import { Link } from "react-router-dom";

function Header() {
  const { authState, dispatch: dispatchAuthState } = useAuth();

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
        dispatchAuthState({ type: "LOGOUT" }); // Update authState on logout
        toast.error("User not Logged in", { description: "Please login...." });
        return;
      }

      dispatchAuthState({
        type: "LOGIN",
        payload: {
          name: apiData.userdata.username || "",
        },
      });
    } catch (error) {
      console.log(error);
      dispatchAuthState({ type: "LOGOUT" }); // Ensure authState is updated on error
      toast.error("User not Logged in", { description: "Please login...." });
    }
  }

  useEffect(() => {
    checkAuth();
  }, [dispatchAuthState]); // Ensure the effect runs when authState changes

  return (
    <div className="flex justify-between items-center px-10 py-2 bg-purple-100">
      <div className="font-semibold text-2xl">
        <span className="dark:text-white mr-2 text-black">Nexus</span>
        <span className="text-blue-700">Society</span>
      </div>
      <div className="flex gap-x-10 font-semibold ">
        <Link className="hover:text-purple-500" to="/event">
          Event
        </Link>
        <Link className="hover:text-purple-500" to="/services">
          Services
        </Link>
        <Link className="hover:text-purple-500" to="/about">
          About us
        </Link>
        <Link className="hover:text-purple-500" to="/faq">
          FAQs
        </Link>
        <Link className="hover:text-purple-500" to="/get-in-touch">
          Contact
        </Link>
      </div>
      <div className="flex justify-start items-center gap-x-10">
        {authState.isLoggedIn && (
          <AdminProtected>
            <Link to="/admin">Admin Panel</Link>
          </AdminProtected>
        )}
        {authState.isLoggedIn ? <UserProfile /> : <UserMembership />}
        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
}

export default Header;