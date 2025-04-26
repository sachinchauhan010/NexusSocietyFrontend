import { useEffect, useState } from "react";
import {
  Landmark,
  UserPlus,
  CalendarClock,
  BadgeCheck,
  Shirt,
  MessageSquareText,
  StickyNote,
  UserCog,
  ClipboardList,
  GalleryHorizontal,
  Handshake,
  ShieldCheck,
} from "lucide-react";

// New features based on services
const features = [
  {
    title: "Society Registration",
    description:
      "Register and manage societies with admin control.",
    icon: Landmark,
  },
  {
    title: "Member Registration",
    description: "Admins can register core team members and volunteers.",
    icon: UserPlus,
  },
  {
    title: "Event Management",
    description:
      "Create, update, delete events with all necessary details.",
    icon: CalendarClock,
  },
  {
    title: "Result Announcement",
    description: "Announce event results and publish certificates.",
    icon: BadgeCheck,
  },
  {
    title: "Merchandise Handling",
    description: "Add, manage, and track society merchandise inventory.",
    icon: Shirt,
  },
  {
    title: "Feedback & Notifications",
    description: "Users can give feedback and receive notifications.",
    icon: MessageSquareText,
  },
  {
    title: "Notice Board",
    description: "Admins can post and manage notices for users.",
    icon: StickyNote,
  },
  {
    title: "Membership Handling",
    description: "Students can join or leave societies and view status.",
    icon: UserCog,
  },
  {
    title: "Event Registration",
    description: "Students can register for upcoming events directly.",
    icon: ClipboardList,
  },
  {
    title: "Photo Gallery",
    description: "Upload and showcase photos from past events.",
    icon: GalleryHorizontal,
  },
  {
    title: "Sponsorship Handling",
    description: "Manage sponsors, their benefits, and event association.",
    icon: Handshake,
  },
  {
    title: "Role Management",
    description: "Assign roles like admin, volunteer, or coordinator.",
    icon: ShieldCheck,
  },
];

export default function FeatureRotator() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % features.length);
        setFade(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = features[index].icon;

  return (
    <div className="bg-purple-100 w-full py-12 px-4 flex items-center justify-center">
      <div
        className={`max-w-3xl w-full text-center p-6 transition-opacity duration-500 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <CurrentIcon className="w-12 h-12 text-purple-700" />
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800">
            {features[index].title}
          </h2>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-xl">
            {features[index].description}
          </p>
        </div>
      </div>
    </div>
  );
}
