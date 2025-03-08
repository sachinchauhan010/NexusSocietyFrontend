import { useState, useEffect } from "react";
import { User } from "@/types/userType.ts";
import { Button } from "@/components/ui/button";
import { FileText, Mail, MessageCircle } from "lucide-react";

function Broadcast() {
  const [membershipStudents, setMembershipStudents] = useState<User[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_PRODUCTION_API_URI
          }/api/auth/admin/membership`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const apiData = await response.json();
        setMembershipStudents(apiData.users || []);
      } catch (error) {
        console.error("Error fetching membership data:", error);
      }
    };

    fetchMembership();
  }, []);

  const sendMailUser = async () => {
    if (!subject || !message) {
      alert("Please enter both subject and message.");
      return;
    }

    try {
      const toEmails = membershipStudents.map((user) => user.email);

      if (toEmails.length === 0) {
        alert("No recipients found.");
        return;
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_PRODUCTION_API_URI
        }/api/auth/admin/broadcast-mail`,
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

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Failed to send emails.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Broadcast Email
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Input Section */}
        <div className="bg-gray-100 p-6 rounded-lg flex-1 shadow-md">
          <input
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mt-3 p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Send Email Button */}
          <div className="mt-5 flex">
            <Button
              className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
              onClick={sendMailUser}
            >
              <Mail size={20} /> Send Email
            </Button>
          </div>
        </div>

        {/* Email Preview */}
        <div className="bg-white p-6 rounded-lg flex-1 shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Mail size={20} className="text-purple-600" /> Email Preview
          </h3>

          <p className="mt-3 text-gray-700 flex items-center gap-2">
            <FileText size={18} className="text-gray-600" />
            <strong className="text-gray-900">Subject:</strong>{" "}
            {subject || "No subject yet"}
          </p>

          <p className="mt-2 text-gray-700 flex items-center gap-2">
            <MessageCircle size={18} className="text-gray-600" />
            <strong className="text-gray-900">Message:</strong>
          </p>

          <div className="border border-gray-300 p-4 bg-gray-50 rounded-md text-gray-800 mt-3 min-h-[60px]">
            {message || "No message yet"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Broadcast;
