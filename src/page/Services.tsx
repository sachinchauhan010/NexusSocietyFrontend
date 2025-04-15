import React from "react";
import { motion } from "framer-motion";

interface Service {
  title: string;
  description: string;
}

const services: Service[] = [
  {
    title: "Society Registration",
    description:
      "Register and manage multiple college societies with admin control.",
  },
  {
    title: "Member Registration",
    description: "Admins can register core team members and volunteers.",
  },
  {
    title: "Event Management",
    description:
      "Create, update, and delete events with all necessary details.",
  },
  {
    title: "Result Announcement",
    description: "Announce event results and publish certificates.",
  },
  {
    title: "Merchandise Handling",
    description: "Add, manage, and track society merchandise inventory.",
  },
  {
    title: "Feedback & Notifications",
    description: "Users can give feedback and receive real-time notifications.",
  },
  {
    title: "Notice Board",
    description: "Admins can post and manage notices for users.",
  },
  {
    title: "Membership Handling",
    description: "Students can join or leave societies and view their status.",
  },
  {
    title: "Event Registration",
    description: "Students can register for upcoming events directly.",
  },
  {
    title: "Photo Gallery",
    description: "Upload and showcase photos from past events.",
  },
  {
    title: "Sponsorship Handling",
    description: "Manage sponsors, their benefits, and event association.",
  },
  {
    title: "Role Management",
    description: "Assign roles like admin, volunteer, or coordinator.",
  },
];

interface TimelineCardProps {
  title: string;
  description: string;
  index: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  description,
  index,
}) => {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`w-full md:w-1/2 p-4 my-10 relative ${
        isLeft ? "md:pr-10 md:self-start" : "md:pl-10 md:self-end"
      }`}
    >
      {/* Numbered Circle */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute top-1/2 transform -translate-y-1/2 bg-purple-600 text-white w-10 h-10 flex items-center justify-center rounded-full z-10 font-bold shadow-lg ${
          isLeft ? "right-[-1.25rem]" : "left-[-1.25rem]"
        }`}
      >
        {index + 1}
      </motion.div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 * index }}
        className="bg-white border-l-4 border-purple-500 shadow-xl rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-purple-700">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </motion.div>
    </div>
  );
};

const ServicesTimeline: React.FC = () => {
  return (
    <div className="relative px-4 md:px-20 py-20 bg-gradient-to-br from-purple-100 to-purple-50 min-h-screen">
      {/* <h2 className="text-4xl font-bold text-center text-purple-800 mb-16">
        Our Services
      </h2> */}
      <p className="text-lg my-10">We offer a comprehensive set of features designed to streamline every aspect of college society operations</p>

      <div className="relative flex flex-col items-center">
        {/* Center vertical line */}
        <div className="absolute w-1 h-full bg-purple-500 left-1/2 transform -translate-x-1/2 z-0" />

        {/* Timeline Cards */}
        {services.map((service, index) => (
          <TimelineCard
            key={index}
            title={service.title}
            description={service.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesTimeline;
