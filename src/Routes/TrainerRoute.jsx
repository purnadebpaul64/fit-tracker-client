import { Navigate, useLocation } from "react-router";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/Shared/LoadingSpinner/LoadingSpinner";

const TrainerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();
  const location = useLocation();
  console.log(location);
  if (isRoleLoading) return <LoadingSpinner />;
  if (role === "trainer") return children;
  return <Navigate to="/" replace="true" />;
};

export default TrainerRoute;
