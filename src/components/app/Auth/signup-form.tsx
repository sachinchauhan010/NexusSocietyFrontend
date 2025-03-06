"use client"

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
const departments = [
  "Computer Science",
  "Mechanical",
  "Electrical",
  "Civil",
  "Electronics",
  "Chemical",
  "Biotechnology",
  "ITCA",
  "Business Management",
]
const years = ["I", "II", "III", "IV"]
const courses = ["B.Tech", "M.Tech", "MCA", "MBA", "BBA", "BCA"]
const branches = [
  "CSE",
  "IT",
  "ECE",
  "EE",
  "ME",
  "CE",
  "AE",
  "PE",
  "MME",
  "CHE",
  "BT",
  "AG",
  "MT",
  "ECM",
  "MBA",
  "MCA",
  "BBA",
  "BCA",
]

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
    <>
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <span className="font-bold text-lg">Event</span>
          <span className="font-bold text-lg text-purple-600">Hive</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Sign Up to Event Hive</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              YOUR NAME
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name?.message?.toString()}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              PHONE
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone"
              className="w-full p-2 border rounded-md"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone?.message?.toString()}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="id" className="text-sm font-medium text-gray-700">
              ID
            </Label>
            <Input
              id="id"
              placeholder="Enter your ID"
              className="w-full p-2 border rounded-md"
              {...register("id", { required: "ID is required" })}
            />
            {errors.id && <p className="text-red-500 text-xs">{errors.id?.message?.toString()}</p>}
          </div>

          <div className="space-y-2">
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

          <div className="space-y-2">
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

          <div className="space-y-2">
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

          <div className="space-y-2">
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

          <div className="space-y-2">
            <Label htmlFor="userprofile" className="text-sm font-medium text-gray-700">
              PROFILE IMAGE
            </Label>
            <Input id="userprofile" type="file" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              EMAIL
            </Label>
            <Input
              id="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email?.message?.toString()}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              PASSWORD
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password?.message?.toString()}</p>}
          </div>

        </div>

        <AnimatedButton type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md">
          Sign Up
        </AnimatedButton>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="bg-white px-2 text-sm text-gray-500">Or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Sign up with Google
        </button>
      </form>

      {/* Mobile toggle button */}
      <div className="mt-6 text-center md:hidden">
        <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
        <Button variant="outline" onClick={onToggleView} className="transition-all duration-300 hover:bg-purple-50">
          Sign In
        </Button>
      </div>
    </>
  )
}

