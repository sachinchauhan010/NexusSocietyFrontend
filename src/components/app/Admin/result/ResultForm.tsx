import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EventType } from "@/types/eventType";
import { toast } from "sonner";

type Props = {
  event: EventType & { participants: number }; // Ensure participants is always defined
};

type Winner = {
  winnerName: string;
  winnerEmail: string;
};

type FormData = {
  groupName?: string;
  winners: Winner[];
};

export function ResultForm({ event }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const finalPayload: FormData = {
      ...(event.participants && event.participants > 1 && { groupName: data.groupName }),
      winners: data.winners,
    };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/declare-result/${event.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error declaring result:", errorData);
        toast.error("Failed to declare result");
        return;
      }
  
      const resultData = await response.json();
      console.log(resultData);
      toast.success("Result declared successfully");
    } catch (error) {
      console.error("Error declaring result:", error);
      toast.error("Failed to declare result");
    }
  
    console.log("Final Submitted Result:", finalPayload);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Declare Result</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Declare Winners</DialogTitle>
          <DialogDescription>
            Provide winner details for <strong>{event.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {event.participants && event.participants > 1 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="groupName">
                Group Name
              </Label>
              <Input
                id="groupName"
                {...register("groupName", { required: true })}
                className="col-span-3"
              />
              {errors.groupName && (
                <span className="text-red-500 col-span-4">
                  This field is required
                </span>
              )}
            </div>
          )}

          {[...Array(event.participants)].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  className="text-right"
                  htmlFor={`winnerEmail${index}`}
                >
                  Email {event.participants && event.participants > 1 && index + 1}
                </Label>
                <Input
                  id={`winnerEmail${index}`}
                  {...register(`winners.${index}.winnerEmail`, { required: true })}
                  className="col-span-3"
                />
                {errors.winners?.[index]?.winnerEmail && (
                  <span className="text-red-500 col-span-4">
                    Email is required
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  className="text-right"
                  htmlFor={`winnerName${index}`}
                >
                  Name {event.participants && event.participants > 1 && index + 1}
                </Label>
                <Input
                  id={`winnerName${index}`}
                  {...register(`winners.${index}.winnerName`, { required: true })}
                  className="col-span-3"
                />
                {errors.winners?.[index]?.winnerName && (
                  <span className="text-red-500 col-span-4">
                    Name is required
                  </span>
                )}
              </div>
            </div>
          ))}

          <DialogFooter>
            <Button type="submit">Save Result</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
