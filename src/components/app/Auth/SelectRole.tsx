import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Role = "headAdmin" | "societyAdmin" | "member" | "student" | "";

interface SelectRoleProps {
  setRole: (role: Role) => void;
}

export function SelectRole({ setRole }: SelectRoleProps) {
  const [role, setLocalRole] = useState<Role>("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setLocalRole(JSON.parse(storedRole) as Role);
    }
  }, []);

  const handleRoleChange = (newRole: string) => {
    const role = newRole as Role;
    setLocalRole(role);
    setRole(role);
    localStorage.setItem("role", JSON.stringify(role));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hover:bg-transparent border-none text-base">
          Login
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="ml-6">Login as</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={role} onValueChange={handleRoleChange}>
          <DropdownMenuRadioItem value="headAdmin">Head Admin</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="societyAdmin">Admin (Society)</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="member">Member</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="student">Student</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
