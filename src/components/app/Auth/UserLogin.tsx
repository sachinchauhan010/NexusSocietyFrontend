import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog"
import loginImage from "/loginImage.png"
import signupImage from "/registerImage.png"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import "./style.css"
import { useAuth } from "../../../context/AuthContext";

type Role = "societyAdmin" | "student" | "";

type AuthInput = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  id?: string;
  department?: string;
  year?: string;
  role?: Role;
};

function UserLogin() {
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState<Role>("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const { dispatch: dispatchAuthState } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthInput>();

  const onSubmit = async (data: AuthInput) => {

    const endpoint = isLogin
      ? `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/login`
      : `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials:"include",
      });

      const apiData = await response.json();
      if (response.ok) {
        toast.success(`Welcome, ${apiData.userdata.username}!`, {
          description: isLogin ? "Login successful" : "Signup successful",
        });
        dispatchAuthState({
          type: "LOGIN",
          payload: {
            name: apiData.userdata.username || ""
          }
        })
        reset(); // Clear form
      } else {
        throw new Error(apiData.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error)
      toast.error(isLogin ? "Login failed" : "Signup failed", {
        description: "Please check your details",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Login</DialogTrigger>
      <DialogContent className="w-fit max-w-fit flex flex-col items-center py-10">

        <DialogTitle></DialogTitle>
        <div className={`container mx-auto shadow-md ${isActive ? "active" : ""}`} id="container">
          {/* Sign up form */}
          {isLogin ? (
            <div className="form-container sign-in">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-2">
                {/* <h1>Sign In</h1> */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email*</Label>
                  <div className="col-span-3">
                    <Input id="email" {...register("email", { required: "Email is required" })} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">Password*</Label>
                  <div className="col-span-3">
                    <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message || "Password length is between 6 and 12"}</p>}
                  </div>
                </div>
                <Link to="#" className="text-dark dark:text-white">Forget Your Password?</Link>
                <Button type="submit">Sign In</Button>
              </form>
            </div>
          ) : (
            <div className="form-container sign-up">
              <form onSubmit={handleSubmit(onSubmit)} >
                <div className="grid flex-col items-start gap-2">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name*</Label>
                    <div className="col-span-3">
                      <Input id="name" {...register("name", { required: "Name is required" })} />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Phone*</Label>
                    <div className="col-span-3">
                      <Input id="phone" {...register("phone", { required: "Phone is required" })} />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="id" className="text-right">ID*</Label>
                    <div className="col-span-3">
                      <Input id="id" {...register("id", { required: "ID is required" })} />
                      {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">Department*</Label>
                    <div className="col-span-3">
                      <Input id="department" {...register("department", { required: "Department is required" })} />
                      {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">Year</Label>
                    <div className="col-span-3">
                      <Input id="year" {...register("year")} />
                      {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">Register As*</Label>
                    <Select value={role} onValueChange={(value) => setRole(value as Role)}>
                      <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectItem value="societyAdmin">Admin (Society)</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email*</Label>
                  <div className="col-span-3">
                    <Input id="email" {...register("email", { required: "Email is required" })} className="w-20"/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">Password*</Label>
                  <div className="col-span-3">
                    <Input id="password" type="password" {...register("password", { required: "Password is required" })} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message || "Password length is between 6 and 12"}</p>}
                  </div>
                </div>
                <Button type="submit">Sign Up</Button>
              </form>
            </div>
          )}

          {/* Toggle */}
          <div className="toggle-container">
            <div
              className="toggle w-full"
              style={{
                backgroundImage: isLogin ? `url(${signupImage})` : `url(${loginImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <Button
                  type="button"
                  onClick={() => {
                    setIsActive(false);
                    setIsLogin(!isLogin)
                  }}
                >
                  Sign In
                </Button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>Register with your personal details to use all of site features</p>
                <Button
                  type="button"
                  onClick={() => {
                    setIsActive(true);
                    setIsLogin(!isLogin)
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserLogin
