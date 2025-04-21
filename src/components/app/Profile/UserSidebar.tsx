import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome,
  IconCalendarEvent,
  IconShoppingCart,
  IconBell,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

export default function UserSidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "/profile/home",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Apply Events",
      href: "/profile/apply-events",
      icon: (
        <IconCalendarEvent className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Orders",
      href: "/profile/orders",
      icon: (
        <IconShoppingCart className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Notifications",
      href: "/profile/notifications",
      icon: (
        <IconBell className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className="text-lg font-semibold"
              />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
