import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "@/types/userType.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, Building, GraduationCap, Phone } from "lucide-react";

export const HoverEffect = ({
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
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((user, idx) => (
        <Link
          to={`/user/${user._id}`}
          key={user._id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
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
              "rounded-2xl h-full w-full pt-8 shadow-md border border-gray-200 dark:border-white/[0.2] transition-all group-hover:border-gray-500 group-hover:shadow-lg bg-white dark:bg-gray-900 relative z-20",
              className
            )}
          >
            {user.role.includes("member") && (
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[85px] border-t-green-600 border-l-[85px] border-l-transparent rounded-tr-[16px] transition-all group-hover:scale-105 duration-200">
                <span className="absolute top-[-65px] right-[0px] text-white text-[14px] font-bold italic tracking-wide rotate-45">
                  Member
                </span>
              </div>
            )}

            {/* Profile Image  */}
            <div className="flex justify-center">
              <img
                src={user.profileimage ? user.profileimage : "/avatar.png"}
                alt={user.name}
                className={`w-32 h-32 rounded-full border-4 shadow-lg ${
                  user.role.includes("member")
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              />
            </div>

            {/* Header */}
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                {user.course} {user.year} year
              </CardDescription>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </CardHeader>

            {/* Details */}
            <CardContent className="mt-0 space-y-3">
              <div className="flex items-center space-x-2">
                <BadgeCheck className="text-blue-600" size={26} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold">Roll No:</span> {user.id}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="text-green-600" size={26} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold">Phone:</span> {user.phone}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Building className="text-purple-600" size={26} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold">Department:</span>{" "}
                  {user.department}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <GraduationCap className="text-orange-600" size={26} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold">Branch:</span> {user.branch}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
