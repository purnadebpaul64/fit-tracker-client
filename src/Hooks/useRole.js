import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    const fetchRole = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/role/${user?.email}`
      );
      setRole(data?.role);
      setIsRoleLoading(false);
    };
    fetchRole();
  }, [user, axios]);
  return [role, isRoleLoading];
};

export default useRole;
