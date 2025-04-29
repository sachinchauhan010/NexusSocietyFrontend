import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

import Loader from "@/components/app/Loader.tsx"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "../context/AuthContext"
import { LoginForm } from "../components/app/Auth/login-form.tsx"
import { SignupForm } from "../components/app/Auth/signup-form"


type AuthInput = {
  email: string
  password: string
  name: string
  phone: string
  id: string
  course?: string
  branch?: string
  department: string
  year?: string
  confirmPassword?: string
}

export default function UserMembership() {
  const [isLogin, setIsLogin] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const { dispatch: dispatchAuthState } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Function for handling Login
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const endpoint = `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/login`

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      })

      const loginApiData = await response.json()
      if (loginApiData.verify === false) {
        toast.error("Please verify your email address to login", {
          description: "Check your email for the verification link",
        })
        return;
      }

      if (!response.ok) throw new Error(loginApiData.message || "Login failed")

      toast.success(`Welcome, ${loginApiData.userdata.username}!`, {
        description: "Login successful",
      })

      dispatchAuthState({
        type: "LOGIN",
        payload: { name: loginApiData.userdata.username || "", email: loginApiData.userdata.useremail || "" },
      })
    } catch (error) {
      console.error(error)
      toast.error("Login failed", {
        description: "Please check your details",
      })
    }
  }

  // Function for handling Signup
  const handleSignup = async (data: AuthInput, userprofile: File | null) => {
    try {
      setIsLoading(true)
      const endpoint = `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/register`

      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key as keyof AuthInput] as string)
      })
      if (userprofile) {
        formData.append("userprofile", userprofile)
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      const apiData = await response.json()
      
      if (apiData.isStudent === false) {
        toast.error("You are not a student of this college", {
          description: "Please contact the admin for more details",
        })
        return;
      }

      if (apiData.verified === false) {
        toast.error("Please verify your email address to login", {
          description: "Check your email for the verification link",
        })
        return;
      }


      if (apiData.isCreated === false) {
        toast.error("User already exists", {
          description: "Please login with your credentials",
        })
        return;
      }

      if (!response.ok) throw new Error(apiData.message || "Signup failed")

      await handleLogin({ email: data.email, password: data.password })
    } catch (error) {
      console.error(error)
      toast.error("Signup failed", {
        description: "Please check your details",
      })

    } finally {
      setIsLoading(false);
    }
  }

  const toggleView = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsLogin(!isLogin)
      setIsAnimating(false)
    }, 300)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader />
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger>Membership</DialogTrigger>
      <DialogContent className="w-[95%] md:w-[90%] lg:w-[70%] max-w-6xl p-0 sm:p-2 md:p-6 flex flex-col items-center ">
        <DialogTitle></DialogTitle>
        <div className="flex w-full overflow-hidden mx-auto">
          <div
            className={`w-full md:w-1/2 flex flex-col justify-center p-8 bg-white transition-transform duration-300 ease-in-out ${isAnimating ? (isLogin ? "translate-x-full opacity-0" : "translate-x-0 opacity-100") : ""
              }`}
          >
            <div className="max-w-md mx-auto w-full">
              {isLogin ? (
                <LoginForm onLogin={handleLogin} onToggleView={toggleView} />
              ) : (
                <SignupForm onSignup={handleSignup} onToggleView={toggleView} />
              )}
            </div>
          </div>

          {/* Image Side - Hidden on mobile */}
          <div className="hidden md:block md:w-1/2 relative">
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${isLogin
                ? "bg-gradient-to-b from-blue-900/70 to-blue-900/70"
                : "bg-gradient-to-b from-red-900/70 to-blue-900/70"
                }`}
            >
              <img
                src={isLogin ? "/LoginImage.jpg" : "/RegImage.jpg"}
                alt={isLogin ? "Event audience" : "Event technology"}
                className="w-full h-full object-cover transition-opacity duration-500 opacity-60"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
              <div
                className={`transition-all duration-500 transform ${isAnimating ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
              >
                <h2 className="text-3xl font-bold mb-4">{isLogin ? "Hello Friend" : "Welcome Back"}</h2>
                <p className="text-center mb-8">
                  {isLogin
                    ? "To keep connected with us provide us with your information"
                    : "To keep connected with us please login with your personal info"}
                </p>
                <button
                  onClick={toggleView}
                  className="border-2 border-white px-8 py-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

