import { useState, useEffect } from "react";
import HeadAdminHeader from "../RoleBasedHeader/HeadAdminHeader";
import SocietyAdminHeader from "../RoleBasedHeader/SocietyAdminHeader";
import MemberHeader from "../RoleBasedHeader/MemberHeader";
import StudentHeader from "../RoleBasedHeader/StudentHeader";

function SelectHeader() {
  const [role, setRole] = useState("student");

  useEffect(() => {
    const roleItem = localStorage.getItem("role");
    const position = roleItem ? JSON.parse(roleItem) : null;
    if (position) {
      setRole(position.toLowerCase()); // Ensure case consistency
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
      default:
        return <StudentHeader />;
    }
  };
  return <div>{renderHeader()}</div>;
}

export default SelectHeader;
