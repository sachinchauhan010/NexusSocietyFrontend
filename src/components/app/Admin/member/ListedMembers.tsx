import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "@/types/userType";
import { CardContent , CardHeader } from "@/components/ui/card";
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
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={"#"}
          key={item?.id}
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

          {/* Card Design Same as First Card */}
          <Card
            className={cn(
              "rounded-2xl h-full w-full pt-8 shadow-md border border-gray-200 dark:border-white/[0.2] transition-all group-hover:border-gray-500 group-hover:shadow-lg bg-white dark:bg-gray-900 relative z-20",
              className
            )}
          >
         

            {/* Profile Image  */}
            <div className="flex justify-center">
              <img
                src={item.profileimage ? item.profileimage : "/avatar.png"}
                alt={item.name}
                className={`w-32 h-32 rounded-full border-4 shadow-lg ${
                  item.role.includes("member")
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              />
            </div>

            {/* Header */}
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                {item.course} {item.year} year
              </CardDescription>
              <p className="text-gray-500 text-sm">{item.email}</p>
            </CardHeader>

            {/* Details */}
            <CardContent className="mt-0 space-y-3">
              <div className="flex items-center space-x-2">
                <BadgeCheck className="text-blue-600" size={26} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold">Roll No:</span> {item.id}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="text-green-600" size={26} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold">Phone:</span> {item.phone}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Building className="text-purple-600" size={26} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold">Department:</span>{" "}
                  {item.department}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <GraduationCap className="text-orange-600" size={26} />
                <p className="text-gray-700 font-semibold">
                  <span className="font-bold">Branch:</span> {item.branch}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/[0.2] group-hover:border-gray-500 group-hover:shadow-lg relative z-20",
        className
      )}
    >
      <div className="relative z-50 p-4">{children}</div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-gray-900 dark:text-white font-bold tracking-wide mt-4",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-gray-600 dark:text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
