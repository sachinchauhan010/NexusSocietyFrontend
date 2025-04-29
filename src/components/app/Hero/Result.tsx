import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

function Result() {
  const [eventWinners, setEventWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWinners = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/event/declare-result`, {
        method: "GET",
        credentials: "include",
      });
      const apiData = await response.json();
      setEventWinners(apiData.winners || []); // Ensure `winners` is an array
    } catch (error) {
      toast.error(`Error fetching winners: ${(error as Error).message}`);
      setEventWinners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  console.log(eventWinners);

  return (
    <div className="min-h-[200px] bg-gray-50 py-4">
      <h1 className=" text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">Event Winners</h1>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader className="animate-spin w-12 h-12 text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventWinners && eventWinners.length > 0 ? (
            eventWinners.map((event) => (
              <div
                key={event.eventId}
                className="bg-white rounded-2xl shadow-lg p-2 sm:p-6 hover:shadow-2xl transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">{event.eventName}</h2>
                <ul className="space-y-4">
                  {event.winners &&
                    event.winners.map((winner: any) => (
                      <li
                        key={`${winner.groupName}-${winner.rank}`}
                        className="bg-blue-50 text-blue-700 rounded-lg p-4"
                      >
                        <div className="font-bold">Rank: {winner.rank}</div>
                        <div className="font-bold">Group: {winner.groupName}</div>
                        <ul className="mt-2 space-y-2">
                          {winner.members &&
                            winner.members.map((member: any, index: number) => (
                              <li key={index} className="text-sm">
                                <div className="font-bold">Name: {member.name}</div>
                                <div>Email: {member.email}</div>
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-lg">
              No winners have been declared yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Result;