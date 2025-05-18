import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "@/types/userType";
import { CardContent, CardHeader, CardTitle, Card, CardDescription } from "@/components/ui/card";
import { BadgeCheck, Building, GraduationCap, Phone } from "lucide-react";

export const ListedMembers = ({
  items,
  className,
}: {
  items: User[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={"#"}
          key={item?.id || idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-md"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <Card
            className={cn(
              "rounded-md h-full w-full shadow-md border border-gray-200 dark:border-white/[0.2] transition-all group-hover:border-gray-500 group-hover:shadow-lg bg-white dark:bg-gray-900 relative z-20",
              className
            )}
          >
            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src={item.profileimage ? item.profileimage : "/avatar.png"}
                alt={item.name}
                className={`w-32 h-32 rounded-full border-4 shadow-lg ${
                  Array.isArray(item.role) && item.role.includes("member")
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              />
            </div>

            {/* Header */}
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-bold p-0">{item.name}</CardTitle>
              <CardDescription className="text-gray-600 p-0 text-base">
                {item.course} {item.year} year
              </CardDescription>
              <p className="text-gray-500 text-base">{item.email}</p>
            </CardHeader>

            {/* Details */}
            <CardContent className="flex flex-col gap-y-2 mt-2 mx-auto">
              <div className="flex items-center space-x-2">
                <BadgeCheck className="text-blue-600" size={20} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold text-sm text-[13px]">Roll No:</span>{" "}
                  <span className="text-[13px]">{item.rollNo}</span>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="text-green-600" size={20} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold text-[13px]">Phone:</span>{" "}
                  <span className="text-[13px]">{item.phone}</span>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Building className="text-purple-600" size={20} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold text-[13px]">Department:</span>{" "}
                  <span className="text-[13px]">{item.department}</span>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <GraduationCap className="text-orange-600" size={20} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold text-[13px]">Branch:</span>{" "}
                  <span className="text-[13px]">{item.branch}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};