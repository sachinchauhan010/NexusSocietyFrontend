import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import { CalendarPlus } from "lucide-react"

type EventInput = {
  name: string
  id: string
  description: string
  venue: string
  dc_team: string[]
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[90%] max-w-3xl mx-auto p-8 space-y-8 "
    >
      {/* Title */}
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Create Event
      </h2>

      {/* Name & ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Name
          </Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full mt-2 p-3 border rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="id"
            className="block text-lg font-medium text-gray-700"
          >
            ID
          </Label>
          <Input
            id="id"
            {...register("id", { required: "ID is required" })}
            className="w-full mt-2 p-3 border rounded-lg"
          />
          {errors.id && (
            <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
          )}
        </div>
      </div>

      {/* Venue */}
      <div>
        <Label
          htmlFor="venue"
          className="block text-lg font-medium text-gray-700"
        >
          Venue
        </Label>
        <Input
          id="venue"
          {...register("venue", { required: "Venue is required" })}
          className="w-full mt-2 p-3 border rounded-lg"
        />
        {errors.venue && (
          <p className="text-red-500 text-sm mt-1">{errors.venue.message}</p>
        )}
      </div>

      {/* Start & End Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label
            htmlFor="start_date"
            className="block text-lg font-medium text-gray-700"
          >
            Start Date
          </Label>
          <Input
            id="start_date"
            type="date"
            {...register("start_date", { required: "Start Date is required" })}
            className="w-full mt-2 p-3 border rounded-lg"
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.start_date.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="end_date"
            className="block text-lg font-medium text-gray-700"
          >
            End Date
          </Label>
          <Input
            id="end_date"
            type="date"
            {...register("end_date", { required: "End Date is required" })}
            className="w-full mt-2 p-3 border rounded-lg"
          />
          {errors.end_date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.end_date.message}
            </p>
          )}
        </div>
      </div>

      {/* Start & End Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label
            htmlFor="start_time"
            className="block text-lg font-medium text-gray-700"
          >
            Start Time
          </Label>
          <Input
            id="start_time"
            type="time"
            {...register("start_time", { required: "Start Time is required" })}
            className="w-full mt-2 p-3 border rounded-lg"
          />
          {errors.start_time && (
            <p className="text-red-500 text-sm mt-1">
              {errors.start_time.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="end_time"
            className="block text-lg font-medium text-gray-700"
          >
            End Time
          </Label>
          <Input
            id="end_time"
            type="time"
            {...register("end_time", { required: "End Time is required" })}
            className="w-full mt-2 p-3 border rounded-lg"
          />
          {errors.end_time && (
            <p className="text-red-500 text-sm mt-1">
              {errors.end_time.message}
            </p>
          )}
        </div>
      </div>

      {/* Participants & Registration Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label
            htmlFor="participants"
            className="block text-lg font-medium text-gray-700"
          >
            Participants
          </Label>
          <Input
            id="participants"
            type="number"
            {...register("participants", { required: "Required" })}
            className="w-full mt-2 p-3 border rounded-lg"
          />
          {errors.participants && (
            <p className="text-red-500 text-sm mt-1">
              {errors.participants.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="registration_link"
            className="block text-lg font-medium text-gray-700"
          >
            Reg. Link
          </Label>
          <Input
            id="registration_link"
            {...register("registration_link")}
            className="w-full mt-2 p-3 border rounded-lg"
          />
        </div>
      </div>

      {/* DC Team */}
      <div>
        <Label
          htmlFor="dc_team"
          className="block text-lg font-medium text-gray-700"
        >
          DC Team
        </Label>
        <Input
          id="dc_team"
          {...register("dc_team", { required: "DC Team is required" })}
          className="w-full mt-2 p-3 border rounded-lg"
        />
        {errors.dc_team && (
          <p className="text-red-500 text-sm mt-1">{errors.dc_team.message}</p>
        )}
      </div>

      {/* Banner Upload */}
      <div>
        <Label
          htmlFor="banner"
          className="block text-lg font-medium text-gray-700"
        >
          Upload Banner
        </Label>
        <Input
          id="banner"
          type="file"
          onChange={handleBannerChange}
          className="w-full mt-2 p-3 border rounded-lg"
        />
      </div>

      {/* Description */}
      <div>
        <Label
          htmlFor="description"
          className="block text-lg font-medium text-gray-700"
        >
          Description
        </Label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="w-full mt-2 p-3 border rounded-lg h-28"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <Button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
        >
          <CalendarPlus size={20} /> Create Event
        </Button>
      </div>
    </form>
  );
}