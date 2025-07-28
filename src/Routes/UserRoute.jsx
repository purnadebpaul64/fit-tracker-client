import { Navigate, useLocation } from "react-router";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/Shared/LoadingSpinner/LoadingSpinner";

const UserRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  const location = useLocation();
  console.log(location);
  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "user") return children;
  return <Navigate to="/" replace="true" />;
};

export default UserRoute;
