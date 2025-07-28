import { Navigate, useLocation } from "react-router";
import useRole from "../Hooks/useRole";
import LoadingSpinner2 from "../Components/Shared/LoadingSpinner/LoadingSpinner2";

const UserRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  const location = useLocation();
  console.log(location);
  if (isRoleLoading) return <LoadingSpinner2 />;
  if (role === "member") return children;
  return <Navigate to="/" replace="true" />;
};

export default UserRoute;
