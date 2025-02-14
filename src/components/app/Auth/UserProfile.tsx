import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export function UserProfile() {
  const {authState, dispatch: dispatchAuthState } = useAuth()

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/logout`, {
        method: "GET",
        credentials: "include",
      });

      const apiData = await response.json();
      toast.success(apiData.message || `You are logged out`);
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
    dispatchAuthState({ type: "LOGOUT" });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{authState.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link to={"#"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/"} onClick={handleLogout}>Logout</Link>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
