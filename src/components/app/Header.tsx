import { useState, useEffect } from "react";
import HeadAdminHeader from "./RoleBasedHeader/HeadAdminHeader";
import SocietyAdminHeader from "./RoleBasedHeader/SocietyAdminHeader";
import MemberHeader from "./RoleBasedHeader/MemberHeader";
import StudentHeader from "./RoleBasedHeader/StudentHeader";

import { ThemeToggle } from "../ThemeToggle";
import { SelectRole } from "./Auth/SelectRole";

function Header() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleItem = localStorage.getItem("role");
    if (roleItem) {
      setRole(JSON.parse(roleItem));
    }
  }, []);

  const renderHeader = () => {
    switch (role) {
      case "headAdmin":
        return <HeadAdminHeader />;
      case "societyAdmin":
        return <SocietyAdminHeader />;
      case "member":
        return <MemberHeader />;
      case "student":
        return <StudentHeader />;
      default:
        return <SelectRole setRole={setRole} />;
    }
  };

  return (
    <div className="flex justify-between items-center px-10 py-2">
      <div className="font-semibold text-2xl">
        <span className="dark:text-white mr-2 text-black">Nexus</span>
        <span className="text-blue-700">Society</span>
      </div>
      <div className="flex justify-start items-center gap-x-10">
        {renderHeader()}
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Header;
