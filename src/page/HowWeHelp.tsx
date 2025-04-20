import { useEffect, useState } from "react";

const features = [
  {
    title: "Create & Publish Events Easily",
    description:
      "Quickly set up your event with name, banner, timing, venue, and registration link — all in one place.",
  },
  {
    title: "Reach the Right Audience",
    description:
      "Your events appear beautifully on our platform, making them easy to discover by the right users.",
  },
  {
    title: "Smooth Registration Flow",
    description:
      "Users can register with one click through your link, ensuring a hassle-free signup experience.",
  },
  {
    title: "Real-Time Updates",
    description:
      "Make changes to your event anytime — updated details reflect instantly for all users.",
  },
  {
    title: "Modern, Mobile-Friendly Interface",
    description:
      "Our clean design works flawlessly on mobile, tablet, and desktop devices without any lag.",
  },
  {
    title: "Boost Engagement with Visuals",
    description:
      "Upload catchy event banners to make your event stand out and leave a lasting impression.",
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
      }, 300); // transition time
    }, 2000); // change every 2 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-purple-100 w-full py-10 px-4 flex items-center justify-center">
      <div
        className={`max-w-3xl w-full text-center p-6 rounded-lg transition-opacity duration-500 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-3">
          {features[index].title}
        </h2>
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
          {features[index].description}
        </p>
      </div>
    </div>
  );
}
