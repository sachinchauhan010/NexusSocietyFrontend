import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, FileText, MessageCircle, Check, ChevronsUpDown } from "lucide-react";
import Loader from "@/components/app/Loader";
import { toast } from "sonner";
import { User } from "@/types/userType";
import { cn } from "@/lib/utils";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Broadcast() {
  const [membershipStudents, setMembershipStudents] = useState<User[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<User[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
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
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, membershipStudents]);

  const sendBroadcast = async () => {
    if (!subject || !message) {
      toast.error("Please fill subject and message");
      return;
    }

    const toEmails = membershipStudents.map((user) => user.email);
    if (toEmails.length === 0) {
      toast.error("No recipients found.");
      return;
    }

    try {
      setSending(true);
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/admin/broadcast-mail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            to: toEmails,
            subject,
            text: message,
            html: `<p>${message}</p>`,
          }),
        }
      );
      if (!response.ok) throw new Error("Broadcast failed");

      toast.success("Broadcast Email Sent!");

      // Reset form
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send broadcast.");
    } finally {
      setSending(false);
    }
  };

  const sendUnicast = async () => {
    if (!subject || !message || !selectedEmail) {
      toast.error("Please select a user, and fill subject and message");
      return;
    }

    try {
      setSending(true);
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/admin/broadcast-mail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            to: [selectedEmail],
            subject,
            text: message,
            html: `<p>${message}</p>`,
          }),
        }
      );
      if (!response.ok) throw new Error("Unicast failed");

      toast.success("Unicast Email Sent!");

      // Reset form
      setSubject("");
      setMessage("");
      setSelectedEmail("");
      setSearchQuery("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send unicast.");
    } finally {
      setSending(false);
    }
  };

  if (loading || sending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Email Sender</h2>

      <Tabs defaultValue="broadcast" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
          <TabsTrigger value="unicast">Unicast</TabsTrigger>
        </TabsList>

        {/* Broadcast Tab */}
        <TabsContent value="broadcast">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Input Section */}
            <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
              <Input
                placeholder="Enter Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mb-4"
              />
              <textarea
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <Button
                onClick={sendBroadcast}
                className="mt-5 bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              >
                <Mail size={20} /> Send Broadcast
              </Button>
            </div>

            {/* Preview Section */}
            <EmailPreview subject={subject} message={message} />
          </div>
        </TabsContent>

        {/* Unicast Tab */}
        <TabsContent value="unicast">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Input Section */}
            <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
              <Label>Search and Select a Student</Label>
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

              <Input
                placeholder="Enter Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="my-4"
              />
              <textarea
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <Button
                onClick={sendUnicast}
                className="mt-5 bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              >
                <Mail size={20} /> Send Unicast
              </Button>
            </div>

            {/* Preview Section */}
            <EmailPreview subject={subject} message={message} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Email Preview Component
function EmailPreview({ subject, message }: { subject: string; message: string }) {
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
        <Mail size={20} className="text-purple-600" /> Email Preview
      </h3>
      <p className="flex items-center gap-2 mb-2 text-gray-700">
        <FileText size={18} className="text-gray-600" />
        <strong className="text-gray-900">Subject:</strong> {subject || "No subject yet"}
      </p>
      <p className="flex items-center gap-2 text-gray-700">
        <MessageCircle size={18} className="text-gray-600" />
        <strong className="text-gray-900">Message:</strong>
      </p>
      <div className="border border-gray-300 p-4 bg-gray-50 rounded-md text-gray-800 mt-2 min-h-[60px]">
        {message || "No message yet"}
      </div>
    </div>
  );
}
