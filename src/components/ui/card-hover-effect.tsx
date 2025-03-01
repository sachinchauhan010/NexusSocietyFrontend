import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "@/types/userType.ts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export const HoverEffect = ({
  items,
  className,
}: {
  items: User[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  console.log(items, "&&&&&")

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      
      {items.map((user, idx) => (
        <Link
          to={`/user/${user._id}`} // Assuming you have a user details page
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
          <Card className={cn(
            "rounded-2xl h-full w-full p-4 overflow-hidden border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20", className
          )}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              {user.role.includes("member") ? <p>Member</p> : ""}
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};
