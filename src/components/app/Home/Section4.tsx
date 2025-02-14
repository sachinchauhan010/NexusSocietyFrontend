import { FunctionCard } from "./FunctionCard";

function Section4() {
  const features = [
    {
      image: "/Seamless-Society-Management.jpg",
      text: "Seamless Society Management",
      subText:
        "Effortlessly manage members, events, and finances with a smart, all-in-one platform",
    },
    {
      image: "/Automated-Event-Planning.jpg",
      text: "Automated Event Planning",
      subText:
        "Plan, schedule, and execute events flawlessly with automated reminders and real-time updates.",
    },
    {
      image: "/Secure-Payment-&-Dues-Management.jpg",
      text: "Secure Payment & Dues Management",
      subText:
        "Track, collect, and manage society fees with transparency and ease using integrated payment systems.",
    },
    {
      image: "Member-Engagement-&-Communication.jpg",
      text: "Member Engagement & Communication",
      subText:
        "Enhance collaboration with real-time chat, notifications, and discussion forums.",
    },
    {
      image: "/Visitor-&-Security-Management.jpg",
      text: "Visitor & Security Management",
      subText:
        "Advanced visitor logs, digital approvals, and security alerts ensure a safe community.",
    },
    {
      image: "/Digital-Notice-Board.jpg",
      text: "Digital Notice Board",
      subText:
        "Keep everyone informed with instant notices, circulars, and announcements in one place",
    },
    {
      image: "/Customizable-&-Scalable.jpg",
      text: "Customizable & Scalable",
      subText:
        "Tailor Nexus Society to meet your unique needs, whether for small communities or large residential complexes.",
    },
    {
      image: "/Complaint-&-Request-Management.jpg",
      text: "Complaint & Request Management",
      subText:
        "A dedicated portal for residents to raise concerns, track progress, and get swift resolutions.",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl mx-auto font-semibold text-center py-4">
        Feature of Society
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {features.map((feature, index) => (
          <FunctionCard key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
}

export default Section4;
