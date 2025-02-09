import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FormData = {
  name: string;
  id: string;
  email: string;
  password: string;
  description?: string;
};

function RegisterSociety() {
  const { register, handleSubmit } = useForm<FormData>();

  //TODO: After successful Registration form should be clear  and close the dialog
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/society/register-society`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const apiData = await response.json();
      toast.success(apiData.societyData.name, { description: "Society Registered successfully" })

      // Login after registration
      const societyLoginData = { email: data.email, password: data.password }
      const loginResponse = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/society/login-society`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(societyLoginData),
      });
      const loginData = await loginResponse.json();
      toast.success(`${loginData.societyData.name}`, { description: "Login successfully" })

    } catch (error) {
      console.log("Error", error)
      toast.error("Registration failed", { description: "Please check your email and password" })
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Register Society</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Society Name</Label>
          <Input id="name" {...register("name", { required: true })} />
        </div>
        <div>
          <Label htmlFor="id">Society ID</Label>
          <Input id="id" {...register("id", { required: true })} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email", { required: true })} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password", { required: true })} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} />
        </div>
        <Button type="submit" className="w-full">Register</Button>
      </form>
    </div>
  );
}

export default RegisterSociety;
