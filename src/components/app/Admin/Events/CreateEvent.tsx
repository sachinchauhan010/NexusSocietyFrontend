import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"

type EventInput = {
  name: string
  id: string
  description: string
  venue: string
  participants: string
  registration_link?: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  banner: File | null
}

export default function CreateEvent() {
  const [banner, setBanner] = useState<File | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventInput>()

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBanner(e.target.files[0])
    }
  }

  const onSubmit = async (data: EventInput) => {
    console.log(data, "Data.....")

    try {
      if (!banner) {
        console.log("Please select a banner!")
        toast.error("Banner image is required")
        return
      }

      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof EventInput]
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item)
          })
        } else {
          formData.append(key, value as string)
        }
      })
      formData.append("banner", banner)
      console.log(formData, "FormData.....")

      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/create-event`, {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      const apiData = await response.json()
      if (response.ok) {
        toast.success("Event created successfully!")
        reset() // Clear form
        setBanner(null) // Clear banner file
      } else {
        throw new Error(apiData.message || "Something went wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("Event creation failed", {
        description: "Please check your details",
      })
    }
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" {...register("name", { required: "Name is required" })} className="col-span-3" />
        {errors.name && <p className="text-red-500 text-sm col-span-4">{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="id" className="text-right">
          ID
        </Label>
        <Input id="id" {...register("id", { required: "ID is required" })} className="col-span-3" />
        {errors.id && <p className="text-red-500 text-sm col-span-4">{errors.id.message}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input id="description" {...register("description", { required: "Description is required" })} className="col-span-3" />
        {errors.description && <p className="text-red-500 text-sm col-span-4">{errors.description.message}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="venue" className="text-right">
          Venue
        </Label>
        <Input id="venue" {...register("venue", { required: "Venue is required" })} className="col-span-3" />
        {errors.venue && <p className="text-red-500 text-sm col-span-4">{errors.venue.message}</p>}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="participants" className="text-right">
          Participants
        </Label>
        <Input id="participants" type="number" {...register("participants", { required: "Participants is required" })} className="col-span-3" />
        {errors.participants && <p className="text-red-500 text-sm col-span-4">{errors.participants.message}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="registration_link" className="text-right">
          Registration Link
        </Label>
        <Input id="registration_link" {...register("registration_link")} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          Start Date
        </Label>
        <Input id="date" type="Date" {...register("start_date", { required: "Date is required" })} className="col-span-3" />
        {errors.start_date && <p className="text-red-500 text-sm col-span-4">{errors.start_date.message}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          End Date
        </Label>
        <Input id="date" type="Date" {...register("end_date", { required: "Date is required" })} className="col-span-3" />
        {errors.end_date && <p className="text-red-500 text-sm col-span-4">{errors.end_date.message}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="start_time" className="text-right">
          Start Time
        </Label>
        <Input id="start_time" type="text" {...register("start_time", { required: "Start Time is required" })} className="col-span-3" />
        {errors.start_time && <p className="text-red-500 text-sm col-span-4">{errors.start_time.message}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="end_time" className="text-right">
          End Time
        </Label>
        <Input id="end_time" type="text" {...register("end_time", { required: "End Time is required" })} className="col-span-3" />
        {errors.end_time && <p className="text-red-500 text-sm col-span-4">{errors.end_time.message}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="banner" className="text-right">
          Banner
        </Label>
        <Input id="banner" type="file" onChange={handleBannerChange} className="col-span-3" />
        {errors.banner && <p className="text-red-500 text-sm col-span-4">{errors.banner.message}</p>}
      </div>
      <Button type="submit">Create Event</Button>
    </form>

  )
}