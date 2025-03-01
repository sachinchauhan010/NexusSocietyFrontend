import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

type Inputs = {
  name: string;
  rollno: string;
  course: string;
  email: string;
}

export function AddMembers() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  
  const onSubmit: SubmitHandler<Inputs> =async (data) => {
    try {
      const response =await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/user/add-members`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const apiResponse=await response.json();
      if(response.ok){
        toast.success(`Member, ${apiResponse.membername}!`, {
          description: apiResponse.message,
        });
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to add member")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add The new Society Member</DialogTitle>
          <DialogDescription>
            Now you are part of society
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name*
              </Label>
              <Input id="name" {...register("name", { required: true })} className="col-span-3" />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rollno" className="text-right">
                Roll no*
              </Label>
              <Input id="rollno" {...register("rollno", { required: true })} className="col-span-3" />
              {errors.rollno && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Course*
              </Label>
              <Input id="course" {...register("course", { required: true })} className="col-span-3" />
              {errors.course && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email*
              </Label>
              <Input id="email" {...register("email", { required: true })} className="col-span-3" />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Make Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
