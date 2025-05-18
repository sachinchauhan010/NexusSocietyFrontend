import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext.tsx";
import { useParams } from "react-router-dom";


type Participant = {
  name: string;
  email: string;
};

type ParticipantsForm = {
  groupName: string;
  participants: Participant[];
};

export default function ParticipantsDetail({
  open,
  setOpen,
  numberOfParticipants,
  onSubmitSuccess,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  numberOfParticipants: number;
  onSubmitSuccess: () => void;
}) {
const { id } = useParams();
  const { authState } = useAuth(); // Get logged-in user details
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipantsForm>({
    defaultValues: {
      groupName: "",
      participants: Array.from({ length: numberOfParticipants - 1 }, () => ({
        name: "",
        email: "",
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "participants",
  });

  const onSubmit = async (data: ParticipantsForm) => {
    try {
      // Include the logged-in user's details as the first participant
      const allParticipants = [
        { name: authState.name, email: authState.email }, // Logged-in user
        ...data.participants,
      ];

      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/apply-group-events/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupName: data.groupName,
            participants: allParticipants,
          }),
        }
      );
      console.log(response, "response");

      if (!response.ok) {
        throw new Error("Failed to add participants");
      }

      toast.success("Participants added successfully!");
      onSubmitSuccess(); // Callback to handle success (e.g., close dialog or refresh data)
      setOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error adding participants:", error);
      toast.error("Failed to add participants. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Participants Details</DialogTitle>
          <DialogDescription>
            Please provide the group name and details of all participants.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* Group Name Field */}
              <div>
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  {...register("groupName", { required: "Group name is required" })}
                  placeholder="Enter group name"
                />
                {errors.groupName && (
                  <p className="text-red-500 text-sm">{errors.groupName.message}</p>
                )}
              </div>

              {/* Logged-in User Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Leader Name</Label>
                  <Input value={authState.name} disabled />
                </div>
                <div>
                  <Label>Leader Email</Label>
                  <Input value={authState.email} disabled />
                </div>
              </div>

              {/* Other Participants */}
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div>
                    <Label htmlFor={`participants.${index}.name`}>
                      Member {index + 2} Name
                    </Label>
                    <Input
                      id={`participants.${index}.name`}
                      {...register(`participants.${index}.name`, {
                        required: "Name is required",
                      })}
                      placeholder="Enter name"
                    />
                    {errors.participants?.[index]?.name && (
                      <p className="text-red-500 text-sm">
                        {errors.participants[index].name?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor={`participants.${index}.email`}>
                      Member {index + 2} Email
                    </Label>
                    <Input
                      id={`participants.${index}.email`}
                      {...register(`participants.${index}.email`, {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Enter email"
                    />
                    {errors.participants?.[index]?.email && (
                      <p className="text-red-500 text-sm">
                        {errors.participants[index].email?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-purple-600 text-white">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}