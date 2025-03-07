import { useState, useEffect } from "react";
import { User } from "@/types/userType.ts";

function Broadcast() {
  const [membershipStudents, setMembershipStudents] = useState<User[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // const [preview, setPreview] = useState(true);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/admin/membership`,
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
  console.log(membershipStudents, "membershipStudents");

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
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/admin/broadcast-mail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            to: toEmails, // Now sending an array instead of a comma-separated string
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
      <h2 className="text-2xl font-semibold mb-4">Broadcast Email</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-gray-100 p-4 rounded-lg flex-1">
          <input
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded h-32"
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={sendMailUser}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Send Email
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg flex-1 shadow-md">
          <h3 className="text-xl font-semibold">Email Preview</h3>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>Message:</strong></p>
          <div className="border p-2 bg-gray-50">{message}</div>
        </div>
      </div>

      {/* <div className="mt-6">
        <h3 className="text-xl font-semibold">Members</h3>
        <ul className="bg-white p-4 rounded shadow">
          {membershipStudents.length > 0 ? (
            membershipStudents.map((user, index) => (
              <li key={index} className="border-b py-2">
                {user.name} - {user.email}
              </li>
            ))
          ) : (
            <p>No members found.</p>
          )}
        </ul>
      </div> */}
    </div>
  );
}

export default Broadcast;