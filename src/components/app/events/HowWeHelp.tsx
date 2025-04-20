import { useEffect, useState } from "react";
import {
  CalendarPlus,
  Users,
  MousePointerClick,
  RefreshCcw,
  Smartphone,
  Image as ImageIcon,
} from "lucide-react";

// Feature data with icons
const features = [
  {
    title: "Create & Publish Events Easily",
    description:
      "Set up your event with name, banner, timing, venue, and registration link — all in one place.",
    icon: CalendarPlus,
  },
  {
    title: "Reach the Right Audience",
    description:
      "Your events appear beautifully on our platform, easily discoverable by the right users.",
    icon: Users,
  },
  {
    title: "Smooth Registration Flow",
    description:
      "Users can register with one click, ensuring a smooth and hassle-free signup experience.",
    icon: MousePointerClick,
  },
  {
    title: "Real-Time Updates",
    description:
      "Make changes to your event anytime — details reflect instantly for all users.",
    icon: RefreshCcw,
  },
  {
    title: "Mobile-Friendly Interface",
    description:
      "Our clean design works flawlessly on mobile, tablet, and desktop devices.",
    icon: Smartphone,
  },
  {
    title: "Boost Engagement with Visuals",
    description:
      "Upload catchy event banners to make your event stand out visually.",
    icon: ImageIcon,
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
