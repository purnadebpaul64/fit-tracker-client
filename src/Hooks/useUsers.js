import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../Api/utils";

const useUsers = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return { users, isLoading, isError, refetch };
};

export default useUsers;
