import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "@/components/app/Loader";
import { EventType } from "@/types/eventType";
import { formatDate } from "@/utils/dateFormate";

export function EventData() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/get-events`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold my-6 text-indigo-700">Events</h1>
      <Table>
        <TableCaption>A list of all events.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Total Applications</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="text-sm">
              <TableCell className="font-semibold">{event.id}</TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>
                {formatDate(event.start_date || "")} - {formatDate(event.end_date || "")}
              </TableCell>
              <TableCell>
                {event.start_time} - {event.end_time}
              </TableCell>
              <TableCell className="text-right">{event.appliedCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Events</TableCell>
          <TableCell className="text-right">{events.length}</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
}