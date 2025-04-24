
import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedButton } from "@/components/AnimateButton"

// These arrays would typically come from your data source
const departments = ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics", "Chemical", "Biotechnology", "ITCA", "Business Management"];
const years = ["I", "II", "III", "IV"]
const courses = ["B.Tech", "M.Tech", "MCA", "MBA", "BBA", "BCA"]
const branches = ["CSE", "IT", "ECE", "EE", "ME", "CE", "AE", "PE", "MME", "CHE", "BT", "AG", "MT", "ECM", "Management", "ITCA"];

type SignupFormProps = {
  onSignup: (data: any, userprofile: File | null) => Promise<void>
  onToggleView: () => void
}

export function SignupForm({ onSignup, onToggleView }: SignupFormProps) {
  const [userprofile, setUserprofile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUserprofile(e.target.files[0])
    }
  }

  const onSubmit = async (data: any) => {
    if (!userprofile) {
      toast.error("Profile image is required")
      return
    }

    try {
      await onSignup(data, userprofile)
    } catch (error) {
      console.log(error)
      toast.error("Signup failed", {
        description: "Please check your details",
      })
    }
  }

  return (
    <div className="">
      <div className="flex items-center mb-4 text-xl md:text-2xl">
        <span className="font-bold ">Nexus </span>
        <span className="font-bold text-purple-600"> Society</span>
      </div>
      {/* <h1 className="text-xl font-bold mb-2">Sign Up to Event Hive</h1> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              YOUR NAME
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md"
              {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters long" }, pattern: { value: /^[A-Za-z\s]+$/, message: "Name must contain only letters" }, maxLength: { value: 30, message: "Name must be at most 30 characters long" } })}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name?.message?.toString()}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              PHONE
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone"
              className="w-full p-2 border rounded-md"
              {...register("phone", { required: "Phone is required" , pattern: { value: /^[0-9]{10}$/, message: "Phone number must be 10 digits" } })}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone?.message?.toString()}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="id" className="text-sm font-medium text-gray-700">
              ID
            </Label>
            <Input
              id="id"
              placeholder="Enter your ID"
              className="w-full p-2 border rounded-md"
              {...register("id", { required: "ID is required" , pattern: { value: /^[0-9]{4,}$/, message: "ID must be at least 4 digit" } })}
            />
            {errors.id && <p className="text-red-500 text-xs">{errors.id?.message?.toString()}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="course" className="text-sm font-medium text-gray-700">
              COURSE
            </Label>
            <Select onValueChange={(value) => setValue("course", value)}>
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.course && <p className="text-red-500 text-xs">{errors.course?.message?.toString()}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="branch" className="text-sm font-medium text-gray-700">
              BRANCH
            </Label>
            <Select onValueChange={(value) => setValue("branch", value)}>
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.branch && <p className="text-red-500 text-xs">{errors.branch?.message?.toString()}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="department" className="text-sm font-medium text-gray-700">
              DEPARTMENT
            </Label>
            <Select onValueChange={(value) => setValue("department", value)}>
              <SelectTrigger className="w-full p-2 border rounded-md">
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
            {errors.department && <p className="text-red-500 text-xs">{errors.department?.message?.toString()}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="year" className="text-sm font-medium text-gray-700">
              YEAR
            </Label>
            <Select onValueChange={(value) => setValue("year", value)}>
              <SelectTrigger className="w-full p-2 border rounded-md">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.year && <p className="text-red-500 text-xs">{errors.year?.message?.toString()}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="userprofile" className="text-sm font-medium text-gray-700">
              PROFILE IMAGE
            </Label>
            <Input id="userprofile" type="file" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              EMAIL
            </Label>
            <Input
              id="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md"
              {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address" } })}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email?.message?.toString()}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              PASSWORD
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, message: "Password must contain at least one letter, one number, and one special character" }, maxLength: { value: 15, message: "Password must be at most 15 characters long" } })}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password?.message?.toString()}</p>}
          </div>

        </div>

        <AnimatedButton type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">
          Sign Up
        </AnimatedButton>

      </form>

      {/* Mobile toggle button */}
      <div className="mt-6 text-center md:hidden">
        <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
        <Button variant="outline" onClick={onToggleView} className="transition-all duration-300 hover:bg-purple-50">
          Sign In
        </Button>
      </div>
    </div>
  )
}

