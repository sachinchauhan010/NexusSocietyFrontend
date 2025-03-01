import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "@/types/userType.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
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
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <Card
            className={cn(
              "rounded-2xl h-full w-full p-6 shadow-md border border-gray-200 dark:border-white/[0.2] transition-all group-hover:border-gray-500 group-hover:shadow-lg bg-white dark:bg-gray-900 relative z-20",
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

            <div className="flex justify-center">
              <img
                src={user.profileimage ? user.profileimage : "/avatar.png"}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg"
              />
            </div>

            {/* Header */}
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold">
                {user.name}
              </CardTitle>
              <CardDescription className="text-gray-500">
                {user.email}
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-2 space-y-2">
              <p>
                <strong>📞 Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>🎓 Course:</strong> {user.course}
              </p>
              <p>
                <strong>🏢 Department:</strong> {user.department}
              </p>
              <p>
                <strong>📍 Branch:</strong> {user.branch}
              </p>
              <p>
                <strong>📅 Year:</strong> {user.year}
              </p>
            </CardContent>

            <CardFooter className="flex justify-center mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View Profile
              </button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};
