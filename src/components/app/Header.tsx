// import UserLogin from "./Auth/UserLogin";
import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "./Auth/UserProfile";
import { useEffect } from "react";
import { toast } from "sonner";
import UserMembership from "@/page/UserMembership";

function Header() {
  const { authState, dispatch: dispatchAuthState } = useAuth()

  async function checkAuth() {
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/check-auth`, {
        method: 'GET',
        credentials: 'include',
      });

      const apiData = await response.json();
      if (!apiData.isLogin) {
        toast.error("User not Logged in", { description: "Please login...." })
        return;
      }

      dispatchAuthState({
        type: "LOGIN",
        payload: {
          name: apiData.userdata.username || ""
        }
      })

    } catch (error) {
      console.log(error)
      toast.error("User not Logged in", { description: "Please login...." })
    }
  }

  useEffect(() => {
    checkAuth()
  }, []);


  return (
    <div className="flex justify-between items-center px-10 py-2">
      <div className="font-semibold text-2xl">
        <span className="dark:text-white mr-2 text-black">Nexus</span>
        <span className="text-blue-700">Society</span>
      </div>
      <div className="flex justify-start items-center gap-x-10">
        {authState.isLoggedIn ? <UserProfile /> : <UserMembership/>}
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Header;
