import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CheckRole } from "@/utils/checkRole";

const AdminProtected = ({ children }:any) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await CheckRole();
      setUserRole(role);
      setLoading(false);
    };

    fetchRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userRole || !userRole.includes("admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtected;