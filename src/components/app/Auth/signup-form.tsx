import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/AnimateButton";
import { EmailAutoSuggest } from "../EmailAutoSuggestion";

type SignupFormProps = {
  onSignup: (data: any, userprofile: File | null) => Promise<void>;
  onToggleView: () => void;
};

export function SignupForm({ onSignup, onToggleView }: SignupFormProps) {
  const [userprofile, setUserprofile] = useState<File | null>(null);
  const [emailInput, setEmailInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUserprofile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: any) => {
    if (!userprofile) {
      toast.error("Profile image is required");
      return;
    }

    try {
      await onSignup(data, userprofile);
    } catch (error) {
      console.log(error);
      toast.error("Signup failed", {
        description: "Please check your details",
      });
    }
  };

  return (
    <div className="">
      <div className="flex items-center mb-4 text-xl md:text-2xl">
        <span className="font-bold">Nexus</span>
        <span className="font-bold text-purple-600"> Society</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* Email with Suggestion */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              EMAIL
            </Label>
            <EmailAutoSuggest
              value={emailInput}
              onChange={(value, student) => {
                setEmailInput(value);
                setValue("email", value);

                if (student) {
                  if (student.rollNo) setValue("rollNo", student.rollNo); // Use rollNo here instead of id
                  if (student.name) setValue("name", student.name);
                }
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">
                {errors.email?.message?.toString()}
              </p>
            )}
          </div>

          {/* Roll Number */}
          <div className="space-y-1">
            <Label htmlFor="rollNo" className="text-sm font-medium text-gray-700">
              Roll Number
            </Label>
            <input
              id="rollNo"
              placeholder="Enter your Roll Number"
              className="w-full p-2 border rounded-md"
              {...register("rollNo", {
                required: "Roll Number is required",
                pattern: {
                  value: /^[0-9]{4,}$/,
                  message: "Roll Number must be at least 4 digits",
                },
              })}
            />
            {errors.rollNo && (
              <p className="text-red-500 text-xs">
                {errors.rollNo?.message?.toString()}
              </p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              YOUR NAME
            </Label>
            <input
              id="name"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name must contain only letters",
                },
                maxLength: {
                  value: 30,
                  message: "Name must be at most 30 characters long",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">
                {errors.name?.message?.toString()}
              </p>
            )}
          </div>

          {/* Profile Image */}
          <div className="space-y-1">
            <Label htmlFor="userprofile" className="text-sm font-medium text-gray-700">
              PROFILE IMAGE
            </Label>
            <input
              id="userprofile"
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              PASSWORD
            </Label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message: "Password must contain at least one letter, one number, and one special character",
                },
                maxLength: {
                  value: 15,
                  message: "Password must be at most 15 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">
                {errors.password?.message?.toString()}
              </p>
            )}
          </div>

        </div>

        <AnimatedButton
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
        >
          Sign Up
        </AnimatedButton>
      </form>

      {/* Mobile toggle button */}
      <div className="mt-6 text-center md:hidden">
        <p className="text-sm text-gray-600 mb-2">Already have an account?</p>
        <Button
          variant="outline"
          onClick={onToggleView}
          className="transition-all duration-300 hover:bg-purple-50"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
