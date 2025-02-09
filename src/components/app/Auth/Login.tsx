import { useForm } from "react-hook-form";
import { toast } from "sonner"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type LoginInput = {
  email: string;
  password: string;
};

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  // TODO: After successful Login form should be clear  and close the dialog
  const onSubmit = async (data: LoginInput) => {
    console.log("Submitted", data,  import.meta.env.PRODUCTION_API_URI );
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const apiData = await response.json();
      toast.success(`Welcome, ${apiData.adminName} 🤝🤝`, {description: "Login successfully"})

    } catch (error) {
      console.log("Error", error)
      toast.error("Login failed" , {description: "Please check your email and password"})
    }

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-none text-base">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input id="email" {...register("email", { required: "Email is required" })} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <div className="col-span-3">
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-fit mx-auto px-6 mt-6">Login</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
