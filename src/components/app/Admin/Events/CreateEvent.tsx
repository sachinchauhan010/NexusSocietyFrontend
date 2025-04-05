import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type EventInput = {
  name: string;
  id: string;
  description: string;
  venue: string;
  participants: string;
  registration_link?: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  banner: File | null;
};

export default function CreateEvent() {
  const [banner, setBanner] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventInput>();

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBanner(e.target.files[0]);
    }
  };

  const onSubmit = async (data: EventInput) => {
    console.log(data, "Data.....");

    try {
      if (!banner) {
        console.log("Please select a banner!");
        toast.error("Banner image is required");
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof EventInput];
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, value as string);
        }
      });
      formData.append("banner", banner);
      console.log(formData, "FormData.....");

      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/create-event`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const apiData = await response.json();
      if (response.ok) {
        toast.success("Event created successfully!");
        reset(); // Clear form
        setBanner(null); // Clear banner file
      } else {
        throw new Error(apiData.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Event creation failed", {
        description: "Please check your details",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="grid gap-x-20 gap-y-4 md:grid-cols-2 max-w-5xl mx-auto py-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter event name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="id">ID</Label>
          <Input
            id="id"
            placeholder="Enter event ID"
            {...register("id", { required: "ID is required" })}
          />
          {errors.id && (
            <p className="text-red-500 text-sm">{errors.id.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="venue">Venue</Label>
          <Input
            id="venue"
            placeholder="Enter event venue"
            {...register("venue", { required: "Venue is required" })}
          />
          {errors.venue && (
            <p className="text-red-500 text-sm">{errors.venue.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="participants">Participants</Label>
          <Input
            id="participants"
            type="number"
            placeholder="Enter number of participants"
            {...register("participants", {
              required: "Participants is required",
            })}
          />
          {errors.participants && (
            <p className="text-red-500 text-sm">
              {errors.participants.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="registration_link">Registration Link</Label>
          <Input
            id="registration_link"
            placeholder="Enter registration link"
            {...register("registration_link")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="date"
            placeholder="Select start date"
            {...register("start_date", { required: "Date is required" })}
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm">{errors.start_date.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            type="date"
            placeholder="Select end date"
            {...register("end_date", { required: "Date is required" })}
          />
          {errors.end_date && (
            <p className="text-red-500 text-sm">{errors.end_date.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="start_time">Start Time</Label>
          <Input
            id="start_time"
            type="text"
            placeholder="Enter start time"
            {...register("start_time", { required: "Start Time is required" })}
          />
          {errors.start_time && (
            <p className="text-red-500 text-sm">{errors.start_time.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="end_time">End Time</Label>
          <Input
            id="end_time"
            type="text"
            placeholder="Enter end time"
            {...register("end_time", { required: "End Time is required" })}
          />
          {errors.end_time && (
            <p className="text-red-500 text-sm">{errors.end_time.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 max-w-5xl mx-auto py-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter event description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 max-w-5xl mx-auto py-4">
        <Label htmlFor="banner">Banner</Label>
        <Input id="banner" type="file" onChange={handleBannerChange} />
        {errors.banner && (
          <p className="text-red-500 text-sm">{errors.banner.message}</p>
        )}
      </div>
      ...
      <div className="flex justify-center py-4">
        <Button type="submit" className="bg-blue-700 sm:w-1/2 md:w-1/4 w-full">
          Create Event
        </Button>
      </div>
      ...
    </form>
  );
}
