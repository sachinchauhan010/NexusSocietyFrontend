import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import loginImage from "/loginImage.png"
import signupImage from "/registerImage.png"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import "./style.css"
import { useAuth } from "../../../context/AuthContext";

const departments = ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics", "Chemical", "Biotechnology", "ITCA", "Business Management"];
const years = ["I", "II", "III", "IV"];
const courses = ["B.Tech", "M.Tech", "MCA", "MBA", "BBA", "BCA"];
const branches = ["CSE", "IT", "ECE", "EE", "ME", "CE", "AE", "PE", "MME", "CHE", "BT", "AG", "MT", "ECM", "MBA", "MCA", "BBA", "BCA"];

type AuthInput = {
  email: string;
  password: string;
  name: string;
  phone: string;
  id: string;
  course?: string;
  branch?: string;
  department: string;
  year?: string;
};

function UserLogin() {
  const [isActive, setIsActive] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [userprofile, setUserprofile] = useState<File | null>(null); // State to handle the image file
  const { dispatch: dispatchAuthState } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AuthInput>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUserprofile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: AuthInput) => {
    console.log(data, "Data.....");

    if (!isLogin && !userprofile) {
      console.log("Please select a file!");
      toast.error("Profile image is required");
      return;
    }

    try {
      if (isLogin) {
        await handleLogin(data);
      } else {
        await handleSignup(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(isLogin ? "Login failed" : "Signup failed", {
        description: "Please check your details",
      });
    }
  };

  // ✅ Function for handling Login
  const handleLogin = async (data: AuthInput) => {
    const endpoint = `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/login`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const loginApiData = await response.json();

    if (!response.ok) throw new Error(loginApiData.message || "Login failed");

    toast.success(`Welcome, ${loginApiData.userdata.username}!`, {
      description: "Login successful",
    });

    dispatchAuthState({
      type: "LOGIN",
      payload: { name: loginApiData.userdata.username || "" },
    });

    reset(); // Clear form
    setUserprofile(null); // Clear image file
  };

  // ✅ Function for handling Signup (Auto-login after signup)
  const handleSignup = async (data: AuthInput) => {
    const endpoint = `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/register`;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof AuthInput] as string);
    });
    if (userprofile) {
      formData.append("userprofile", userprofile);
    }

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const apiData = await response.json();

    if (!response.ok) throw new Error(apiData.message || "Signup failed");

    await handleLogin(data);
  };

  return (
    <Dialog>
      <DialogTrigger>Membership</DialogTrigger>
      <DialogContent className="w-[95%] md:w-[90%] lg:w-[80%] max-w-6xl p-0 sm:p-2 md:p-6 flex flex-col items-center py-10">
        <DialogTitle></DialogTitle>
        <div className={`container mx-auto shadow-md ${isActive ? "active" : ""}`} id="container">
          {/* Sign up form */}
          {isLogin ? (
            <div className="form-container sign-in">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-2">
                <h1 className="text-center ml-6">Enjoy Your Membership After Login</h1>
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
                <Button type="submit">Enjoy Membership</Button>
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
                    <Label htmlFor="course" className="text-right">Course</Label>
                    <div className="col-span-3">
                      <Select onValueChange={(value) => setValue("course", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>{course}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="branch" className="text-right">Branch</Label>
                    <div className="col-span-3">
                      <Select onValueChange={(value) => setValue("branch", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                        <SelectContent>
                            {branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.branch && <p className="text-red-500 text-sm">{errors.branch.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">Department*</Label>
                    <div className="col-span-3">

                      <Select
                        onValueChange={(value) => setValue("department", value)} // Set the value manually
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">Year</Label>
                    <div className="col-span-3">
                      <Select onValueChange={(value) => setValue("year", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="userprofile" className="text-right">Profile URL*</Label>
                    <div className="col-span-3">
                      <Input id="userprofile" type="file" onChange={handleImageChange} />
                      {/* {errors.userprofile && <p className="text-red-500 text-sm">{errors.userprofile.message}</p>} */}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email*</Label>
                  <div className="col-span-3">
                    <Input id="email" {...register("email", { required: "Email is required" })} className="w-20" />
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
                <Button type="submit">Take Membership</Button>
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
                <p>Enter your personal details to enjoy your membership</p>
                <Button
                  type="button"
                  onClick={() => {
                    setIsActive(false);
                    setIsLogin(!isLogin)
                  }}
                >
                  Enjoy Membership
                </Button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>For Enjoy the Events You have to take Membership</p>
                <Button
                  type="button"
                  onClick={() => {
                    setIsActive(true);
                    setIsLogin(!isLogin)
                  }}
                >
                  Take Membership
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserLogin;