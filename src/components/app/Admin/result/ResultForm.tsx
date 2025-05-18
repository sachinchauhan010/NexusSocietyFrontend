import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
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

type Member = {
  name: string;
  email: string;
};

type Winner = {
  groupName?: string;
  rank: number;
  members: Member[];
};

type FormData = {
  winners: Winner[];
};

export function ResultForm({ event }: Props) {
  const [isResultDeclared, setIsResultDeclared] = useState(false); // Track if the result is declared

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      winners: [{ groupName: "", rank: 1, members: [{ name: "", email: "" }] }],
    },
  });

  const { fields: winnerFields, append: appendWinner } = useFieldArray({
    control,
    name: "winners",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/declare-result/${event.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ winners: data.winners }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error declaring result:", errorData);
        toast.error("Failed to declare result");
        return;
      }

      const resultData = await response.json();
      console.log(resultData);
      toast.success("Result declared successfully");
      setIsResultDeclared(true); // Disable the button after successful declaration
    } catch (error) {
      console.error("Error declaring result:", error);
      toast.error("Failed to declare result");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isResultDeclared}>
          {isResultDeclared ? "Result Declared" : "Declare Result"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Declare Winners</DialogTitle>
          <DialogDescription>
            Provide winner details for <strong>{event.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            {winnerFields.map((winner, winnerIndex) => (
            <div key={winner.id} className="space-y-4 border-b pb-4">
              {event.participants > 1 && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor={`winners.${winnerIndex}.groupName`}>
                Group Name
                </Label>
                <Input
                id={`winners.${winnerIndex}.groupName`}
                {...register(`winners.${winnerIndex}.groupName`, { required: true })}
                className="col-span-3"
                />
                {errors.winners?.[winnerIndex]?.groupName && (
                <span className="text-red-500 col-span-4">Group name is required</span>
                )}
              </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor={`winners.${winnerIndex}.rank`}>
                Rank
              </Label>
              <Input
                id={`winners.${winnerIndex}.rank`}
                type="number"
                {...register(`winners.${winnerIndex}.rank`, { required: true, min: 1, max: 3 })}
                className="col-span-3"
              />
              {errors.winners?.[winnerIndex]?.rank && (
                <span className="text-red-500 col-span-4">Rank is required and must be between 1 and 3</span>
              )}
              </div>

              <div className="space-y-2">
              <Label>Members</Label>
              <div className="space-y-4">
                {Array.from({ length: event.participants }).map((_, memberIndex) => (
                <div key={memberIndex} className="grid grid-cols-4 items-center gap-4">
                  <Input
                  placeholder="Member Name"
                  {...register(`winners.${winnerIndex}.members.${memberIndex}.name`, {
                    required: true,
                  })}
                  className="col-span-2"
                  />
                  <Input
                  placeholder="Member Email"
                  {...register(`winners.${winnerIndex}.members.${memberIndex}.email`, {
                    required: true,
                  })}
                  className="col-span-2"
                  />
                  {errors.winners?.[winnerIndex]?.members?.[memberIndex]?.name && (
                  <span className="text-red-500 col-span-4">Name is required</span>
                  )}
                  {errors.winners?.[winnerIndex]?.members?.[memberIndex]?.email && (
                  <span className="text-red-500 col-span-4">Email is required</span>
                  )}
                </div>
                ))}
              </div>
              </div>
            </div>
            ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (winnerFields.length < 3) {
                appendWinner({ groupName: "", rank: winnerFields.length + 1, members: [{ name: "", email: "" }] });
              } else {
                toast.error("You can only add up to 3 winners.");
              }
            }}
          >
            Add Winner
          </Button>

          <DialogFooter>
            <Button type="submit" className="bg-indigo-700 hover:bg-blue-500" disabled={isResultDeclared}>
              Save Result
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}