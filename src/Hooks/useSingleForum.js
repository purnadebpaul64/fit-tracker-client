import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getSingleForum = async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/forums/${id}`);
  return res.data;
};

const useSingleForum = (id) => {
  const {
    data: forum = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["forum", id],
    queryFn: () => getSingleForum(id),
    enabled: !!id,
  });

  return { forum, isLoading, isError, refetch };
};

export default useSingleForum;
