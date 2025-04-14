import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { EventType } from "@/types/eventType";
import {useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      type: "spring",
      stiffness: 80,
    },
  }),
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
};

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
  }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/event/${card.id}`);
    };

    return (
      <AnimatePresence>
        <motion.div
          custom={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.3 }}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onClick={handleCardClick}
          className={cn(
            "relative rounded-2xl overflow-hidden h-64 md:h-80 w-full cursor-pointer group shadow-xl shadow-black/10 transition-all",
            hovered !== null && hovered !== index && "blur-sm scale-[0.96]"
          )}
        >
          {/* Banner Image */}
          <motion.img
            src={card.banner ?? "/default-banner.jpg"}
            alt={card.name ?? "Untitled"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/60 transition duration-500" />

          {/* Event Title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-8 left-4 text-white text-xl md:text-2xl font-semibold drop-shadow-lg"
          >
            {card.name ?? "Untitled"}
          </motion.div>

          {/* Hover Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered === index ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "absolute inset-0 flex flex-col justify-end px-4 pb-6 text-sm text-gray-300 space-y-1 transition-opacity",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          >
            <p>
              Date: {card.start_date ?? "N/A"} - {card.end_date ?? "N/A"}
            </p>
            <p>
              Time: {card.start_time ?? "N/A"} - {card.end_time ?? "N/A"}
            </p>
            <p>Venue: {card.venue ?? "N/A"}</p>
            <p>Participants: {card.participants ?? "N/A"}</p>
            <p>
              <a
                href={card.registration_link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                Registration Link
              </a>
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

Card.displayName = "Card";

export function FocusCards({ event }: { event: EventType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto md:px-8 w-full">
      {event.map((event, index) => (
        <Card
          key={event.id || index}
          card={event}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
