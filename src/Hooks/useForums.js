import { useQuery } from "@tanstack/react-query";
import { getAllForums } from "../Api/utils";

const useForums = () => {
  const {
    data: forums = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["forums"],
    queryFn: getAllForums,
  });

  return { forums, isLoading, isError, refetch };
};

export default useForums;
