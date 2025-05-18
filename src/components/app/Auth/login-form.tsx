import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// ✅ NEW: Import DialogClose from Radix UI
import { DialogClose } from "@radix-ui/react-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/AnimateButton";
import { Loader2 } from "lucide-react";

type LoginFormProps = {
  onLogin: (data: { email: string; password: string }) => Promise<void>;
  onToggleView: () => void;
  // ❌ Removed closeDialog prop — no longer needed
};

export function LoginForm({ onLogin, onToggleView }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      await onLogin(data);
    } catch (error) {
      console.log(error);
      toast.error("Login failed", {
        description: "Please check your details",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center mb-4 text-xl md:text-2xl">
        <span className="font-bold">Nexus </span>
        <span className="font-bold text-purple-600">Society</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            YOUR EMAIL
          </Label>
          <Input
            id="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              PASSWORD
            </Label>

            {/* ✅ WRAPPED Link with DialogClose to auto-close dialog */}
            <DialogClose asChild>
              <Link
                to="/forget-password"
                className="text-xs text-gray-500 hover:text-purple-600"
              >
                Forgot your password?
              </Link>
            </DialogClose>
          </div>

          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 border rounded-md"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <AnimatedButton
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Loading...
            </span>
          ) : (
            "Sign In"
          )}
        </AnimatedButton>
      </form>

      <div className="mt-6 text-center md:hidden">
        <p className="text-sm text-gray-600 mb-2">Don't have an account?</p>
        <Button
          variant="outline"
          onClick={onToggleView}
          className="transition-all duration-300 hover:bg-purple-50"
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}
