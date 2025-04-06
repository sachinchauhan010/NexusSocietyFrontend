import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EventType } from "@/types/eventType";
import { FocusCards } from "@/components/ui/focus-cards";
import { ArrowDownAZ, ArrowUpZA, Search } from 'lucide-react';

export default function EventsSection() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [hovered, setHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/get-events`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const apiData = await response.json();
        setEvents(apiData.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  console.log("Events fetched:", events);
  const convertTo24Hour = (timeStr: string) => {
    const [time, modifier] = timeStr.match(/\d+|\D+/g) as [string, string];
    let hour = parseInt(time, 10);
  
    if (modifier.toLowerCase() === "pm" && hour < 12) hour += 12;
    if (modifier.toLowerCase() === "am" && hour === 12) hour = 0;
  
    return `${hour.toString().padStart(2, '0')}:00`;
  };
  

  const handleSort = () => {
    const sortedEvents = [...events].sort((a, b) => {
      const dateA = a.start_date && a.start_time ? new Date(`${a.start_date}T${convertTo24Hour(a.start_time)}`) : new Date(0);
      const dateB = b.start_date && b.start_time ? new Date(`${b.start_date}T${convertTo24Hour(b.start_time)}`) : new Date(0);
      return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  
    setEvents(sortedEvents);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredEvents = events.filter(event =>
    Object.values(event).some(value =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Upcoming <span className="text-purple-600">Events</span>
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleSort}>
            Sort {sortOrder === "asc" ? <ArrowDownAZ /> : <ArrowUpZA />}
          </Button>

          <form
            className={`relative h-[40px] transition-all duration-500 border-4 border-white rounded-full p-1 bg-white flex items-center ${hovered ? 'w-[300px]' : 'w-[50px]'}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <input
              type="search"
              placeholder="Search here ..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`absolute top-0 left-0 h-[30px] w-full px-5 text-sm rounded-full outline-none border-none transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <div
              className={`flex items-center justify-center rounded-full transition-colors duration-500 ${hovered ? 'bg-[#07051a] text-white' : 'text-[#07051a]'}`}
            >
              <Search size={18} />
            </div>
          </form>
        </div>
      </div>

      <div>
        {filteredEvents?.length > 0 ? (
          <FocusCards event={filteredEvents} />
        ) : (
          <p className="text-center col-span-full">No matching events found.</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Button className="bg-purple-600 hover:bg-purple-700">Load more...</Button>
      </div>
    </section>
  );
}
