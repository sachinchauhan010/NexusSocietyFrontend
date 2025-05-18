import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import Loader from "@/components/app/Loader";
import { User } from "@/types/userType";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function OfficialBearer() {
  const [membershipStudents, setMembershipStudents] = useState<User[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<User[]>([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/admin/membership`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const apiData = await response.json();
        setMembershipStudents(apiData.users || []);
        setFilteredStudents(apiData.users || []);
      } catch (error) {
        console.error("Error fetching membership data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, []);

  useEffect(() => {
    const filtered = membershipStudents.filter((student) =>
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, membershipStudents]);

  const handleAssignBearer = async () => {
    if (!selectedEmail) {
      toast.error("Please select a user to assign as an official bearer.");
      return;
    }

    try {
      setAssigning(true);
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/admin/assign-bearer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: selectedEmail }),
        }
      );


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to assign official bearer.");
      }
      const data = await response.json();

      if(data.isAssigned === false){
        toast.error("This user is already an official bearer.");
        return;
      }

      toast.success("Official bearer assigned successfully!");
      setSelectedEmail("");
      setSearchQuery("");
    } catch (error) {
      console.error("Error assigning official bearer:", error);
      toast.error("Failed to assign official bearer.");
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Assign Official Bearer</h2>

      <div className="flex flex-col gap-6">
        {/* Search and Select User */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md  w-full">
          <Label>Search and Select a User</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                {selectedEmail
                  ? filteredStudents.find((student) => student.email === selectedEmail)?.name ||
                  "Select a user"
                  : "Select a user"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search user..."
                  className="h-9"
                  onValueChange={(value) => setSearchQuery(value)}
                />
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup>
                    {filteredStudents.map((student) => (
                      <CommandItem
                        key={student.email}
                        value={student.email}
                        onSelect={(currentValue) => {
                          setSelectedEmail(currentValue);
                          setOpen(false);
                        }}
                      >
                        {student.name} ({student.email})
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedEmail === student.email
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Assign Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleAssignBearer}
            disabled={assigning}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {assigning ? "Assigning..." : "Assign Official Bearer"}
          </Button>
        </div>
      </div>
    </div>
  );
}