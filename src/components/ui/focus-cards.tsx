import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { EventType } from "@/types/eventType";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: EventType;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-80 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      {/* Always visible image */}
      <img
        src={card.banner ?? "/default-banner.jpg"}
        alt={card.name ?? "Untitled"}
        className="object-cover absolute inset-0 w-full h-full "
      />

      {/* Always visible name */}
      <div className="absolute top-10 left-4 text-xl md:text-2xl font-medium text-white px-2 py-1 rounded">
        {card.name ?? "Untitled"}
      </div>

      {/* Hover-dependent details */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex flex-col justify-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-sm text-gray-300">
          <p>Date: {card.start_date ?? "N/A"} - {card.end_date ?? "N/A"}</p>
          <p>Time: {card.start_time ?? "N/A"} - {card.end_time ?? "N/A"}</p>
          <p>Venue: {card.venue ?? "N/A"}</p>
          <p>Participants: {card.participants ?? "N/A"}</p>
          <p>
            <a
              href={card.registration_link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              Registration Link
            </a>
          </p>
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ event }: { event: EventType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-auto md:px-8 w-full">
      {event.map((event, index) => (
        <Card
          key={index}
          card={event} // Pass the entire event object
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}